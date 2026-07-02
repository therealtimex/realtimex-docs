import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "public", "data");
const COMPANION_DIR = path.join(ROOT, "public", "companion");
const DOCS_BASE = "https://docs.realtimex.ai";

const PETDEX_MANIFEST_URL =
  process.env.PETDEX_MANIFEST_URL ??
  "https://assets.petdex.dev/manifests/petdex-v2.json";
const PETDEX_ASSET_BASE =
  process.env.PETDEX_ASSET_BASE ?? "https://assets.petdex.dev";
const FETCH_HEADERS = {
  Referer: "https://petdex.dev/",
  "User-Agent": "RealTimeX-Docs-Companion-Sync/1.0",
};
const CONCURRENCY = Number(process.env.PETDEX_SYNC_CONCURRENCY ?? "6");

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: FETCH_HEADERS,
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: FETCH_HEADERS,
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

function readCuratedConfig() {
  const configPath = path.join(DATA_DIR, "companion-curated.v1.json");
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function getHostedPetIds(curated) {
  if (Array.isArray(curated.hostedPetIds) && curated.hostedPetIds.length > 0) {
    return curated.hostedPetIds;
  }
  return [...new Set(curated.collections.flatMap((collection) => collection.petIds))];
}

function indexManifestPets(manifest) {
  const fields = manifest.fields;
  const map = new Map();
  for (const row of manifest.pets) {
    const pet = Object.fromEntries(fields.map((field, index) => [field, row[index]]));
    map.set(pet.slug, pet);
  }
  return map;
}

function companionAssetUrl(petId, filename) {
  return `${DOCS_BASE}/companion/${petId}/${filename}`;
}

function petdexAssetUrl(manifestPet, key) {
  return `${PETDEX_ASSET_BASE}/${manifestPet[key]}`;
}

function buildAttribution(manifestPet, existingAttribution) {
  const attribution = {
    provider: "petdex",
    url: `https://petdex.dev/pets/${manifestPet.slug}`,
    ...(existingAttribution ?? {}),
  };
  if (manifestPet.submittedBy) {
    attribution.name = manifestPet.submittedBy;
  }
  attribution.provider = "petdex";
  attribution.url = `https://petdex.dev/pets/${manifestPet.slug}`;
  return attribution;
}

function petToCollectionIds(curated) {
  const map = new Map();
  for (const collection of curated.collections) {
    for (const petId of collection.petIds) {
      const ids = map.get(petId) ?? [];
      ids.push(collection.id);
      map.set(petId, ids);
    }
  }
  return map;
}

function normalizePetJson(raw, petId) {
  const petJson = { ...raw };
  petJson.id = petJson.id ?? petId;
  petJson.spritesheetPath = petJson.spritesheetPath ?? "spritesheet.webp";
  return petJson;
}

function petAssetsExist(petId) {
  const petDir = path.join(COMPANION_DIR, petId);
  return (
    fs.existsSync(path.join(petDir, "pet.json")) &&
    fs.existsSync(path.join(petDir, "spritesheet.webp"))
  );
}

async function syncPetAssets(petId, manifestPet) {
  const petDir = path.join(COMPANION_DIR, petId);
  fs.mkdirSync(petDir, { recursive: true });

  const remotePetJsonUrl = `${PETDEX_ASSET_BASE}/${manifestPet.petJson}`;
  const remoteSpritesheetUrl = `${PETDEX_ASSET_BASE}/${manifestPet.spritesheet}`;

  const [petJsonRaw, spritesheet] = await Promise.all([
    fetchJson(remotePetJsonUrl),
    fetchBuffer(remoteSpritesheetUrl),
  ]);

  const petJson = normalizePetJson(petJsonRaw, petId);
  fs.writeFileSync(
    path.join(petDir, "pet.json"),
    `${JSON.stringify(petJson, null, 2)}\n`,
  );
  fs.writeFileSync(path.join(petDir, "spritesheet.webp"), spritesheet);
}

function loadExistingPetsIndex() {
  const indexPath = path.join(DATA_DIR, "companion-pets.v1.json");
  if (!fs.existsSync(indexPath)) return new Map();
  const doc = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  return new Map((doc.pets ?? []).map((pet) => [pet.id, pet]));
}

function buildRegistry(curated, manifestPetsBySlug, hostedPetIds, existingPetsById = new Map()) {
  const hostedPetIdSet = new Set(hostedPetIds);
  const petToCollections = petToCollectionIds(curated);

  const pets = [];
  const missingPets = [];

  for (const petId of hostedPetIds) {
    const manifestPet = manifestPetsBySlug.get(petId);
    if (!manifestPet) {
      missingPets.push(petId);
      continue;
    }

    const localPetJsonPath = path.join(COMPANION_DIR, petId, "pet.json");
    const description = fs.existsSync(localPetJsonPath)
      ? JSON.parse(fs.readFileSync(localPetJsonPath, "utf8")).description
      : undefined;
    const existing = existingPetsById.get(petId);

    pets.push({
      id: petId,
      displayName: manifestPet.displayName,
      ...(description ? { description } : {}),
      kind: manifestPet.kind ?? existing?.kind ?? "character",
      hosted: true,
      collectionIds: (petToCollections.get(petId) ?? []).filter((collectionId) => {
        const collection = curated.collections.find((entry) => entry.id === collectionId);
        return collection?.hosted === true;
      }),
      assets: {
        petJson: companionAssetUrl(petId, "pet.json"),
        spritesheet: companionAssetUrl(petId, "spritesheet.webp"),
      },
      attribution: buildAttribution(manifestPet, existing?.attribution),
    });
  }

  if (missingPets.length > 0) {
    console.warn(
      `Warning: ${missingPets.length} hosted pet(s) missing from Petdex manifest.`,
    );
  }

  const collections = curated.collections.map((collection) => {
    const collectionHostedPetIds =
      collection.hostedPetIds ??
      collection.petIds.filter((petId) => hostedPetIdSet.has(petId));

    return {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      kind: collection.kind,
      featured: collection.featured ?? false,
      hosted: collection.hosted ?? false,
      ...(collection.loveScore != null ? { loveScore: collection.loveScore } : {}),
      coverPetId: collectionHostedPetIds[0] ?? collection.coverPetId,
      petIds: collection.petIds,
      hostedPetIds: collectionHostedPetIds,
      petCount: collection.petIds.length,
      hostedPetCount: collectionHostedPetIds.length,
      ...(collection.source ? { source: collection.source } : {}),
      ...(collection.hosted
        ? {}
        : {
            remoteAssets: {
              note: "Install pets from Petdex; only top-loved collections are self-hosted on docs.realtimex.ai.",
              petdexBase: "https://petdex.dev/pets",
            },
          }),
    };
  });

  const updatedAt = new Date().toISOString().slice(0, 10);

  return {
    petsDocument: {
      schemaVersion: 2,
      updatedAt,
      assetBase: `${DOCS_BASE}/companion`,
      hosting: curated.hosting ?? null,
      total: pets.length,
      pets,
    },
    collectionsDocument: {
      schemaVersion: 2,
      updatedAt,
      hosting: curated.hosting ?? null,
      total: collections.length,
      hostedCollections: collections.filter((collection) => collection.hosted).length,
      collections,
    },
  };
}

async function mapWithConcurrency(items, concurrency, mapper) {
  let nextIndex = 0;
  let completed = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      const item = items[index];
      await mapper(item, index);
      completed += 1;
      if (completed % 25 === 0 || completed === items.length) {
        process.stdout.write(`\r  downloaded ${completed}/${items.length}`.padEnd(40));
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  process.stdout.write("\n");
}

function pruneUnhostedAssets(hostedPetIds) {
  const hostedSet = new Set(hostedPetIds);
  if (!fs.existsSync(COMPANION_DIR)) return 0;

  let removed = 0;
  for (const entry of fs.readdirSync(COMPANION_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    if (hostedSet.has(entry.name)) continue;
    fs.rmSync(path.join(COMPANION_DIR, entry.name), { recursive: true, force: true });
    removed += 1;
  }
  return removed;
}

async function main() {
  const offline = process.argv.includes("--offline");
  const registryOnly = process.argv.includes("--registry-only");
  const skipExisting = !process.argv.includes("--force");
  const shouldPrune = process.argv.includes("--prune");
  const curated = readCuratedConfig();
  const hostedPetIds = getHostedPetIds(curated);

  let manifestPetsBySlug;
  if (offline) {
    const existingPetsById = loadExistingPetsIndex();
    manifestPetsBySlug = new Map(
      hostedPetIds.map((petId) => {
        const petJsonPath = path.join(COMPANION_DIR, petId, "pet.json");
        if (!fs.existsSync(petJsonPath)) {
          throw new Error(`Missing local pet pack for "${petId}" (${petJsonPath})`);
        }
        const petJson = JSON.parse(fs.readFileSync(petJsonPath, "utf8"));
        return [
          petId,
          {
            slug: petId,
            displayName: petJson.displayName ?? petId,
            kind: existingPetsById.get(petId)?.kind,
            submittedBy: existingPetsById.get(petId)?.attribution?.name ?? null,
          },
        ];
      }),
    );
    console.log(`Regenerating registry from ${hostedPetIds.length} hosted pet pack(s)...`);
  } else {
    const manifest = await fetchJson(PETDEX_MANIFEST_URL);
    manifestPetsBySlug = indexManifestPets(manifest);

    const petsToDownload = hostedPetIds.filter(
      (petId) => !skipExisting || !petAssetsExist(petId),
    );

    if (registryOnly) {
      console.log(
        `Skipping asset download (--registry-only). ${hostedPetIds.length} hosted pets referenced.`,
      );
    } else {
      console.log(
        `Syncing ${petsToDownload.length}/${hostedPetIds.length} hosted companion pet(s)...`,
      );

      const failures = [];
      await mapWithConcurrency(petsToDownload, CONCURRENCY, async (petId) => {
        const manifestPet = manifestPetsBySlug.get(petId);
        if (!manifestPet) {
          failures.push({ petId, error: "missing from Petdex manifest" });
          return;
        }
        try {
          await syncPetAssets(petId, manifestPet);
        } catch (error) {
          failures.push({
            petId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      });

      if (failures.length > 0) {
        console.warn(`Warning: ${failures.length} pet download(s) failed.`);
        for (const failure of failures.slice(0, 10)) {
          console.warn(`  ${failure.petId}: ${failure.error}`);
        }
      }
    }
  }

  if (shouldPrune) {
    const removed = pruneUnhostedAssets(hostedPetIds);
    console.log(`Pruned ${removed} unhosted pet pack(s).`);
  }

  const existingPetsById = loadExistingPetsIndex();
  const { petsDocument, collectionsDocument } = buildRegistry(
    curated,
    manifestPetsBySlug,
    hostedPetIds,
    existingPetsById,
  );

  fs.writeFileSync(
    path.join(DATA_DIR, "companion-pets.v1.json"),
    `${JSON.stringify(petsDocument, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(DATA_DIR, "companion-collections.v1.json"),
    `${JSON.stringify(collectionsDocument, null, 2)}\n`,
  );

  console.log(`Wrote companion-pets.v1.json (${petsDocument.total} hosted pets)`);
  console.log(
    `Wrote companion-collections.v1.json (${collectionsDocument.total} collections, ${collectionsDocument.hostedCollections} hosted)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
