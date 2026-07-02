import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "public", "data");
const OUTPUT_PATH = path.join(DATA_DIR, "companion-curated.v1.json");

const PETDEX_COLLECTION_PREVIEWS_URL =
  process.env.PETDEX_COLLECTION_PREVIEWS_URL ??
  "https://assets.petdex.dev/manifests/collection-previews-v1.json";
const PETDEX_COLLECTION_BASE =
  process.env.PETDEX_COLLECTION_BASE ?? "https://petdex.dev/collections";
const PETDEX_SEARCH_URL =
  process.env.PETDEX_SEARCH_URL ?? "https://petdex.dev/api/pets/search";
const HOSTED_COLLECTION_COUNT = Number(
  process.env.PETDEX_HOSTED_COLLECTIONS ?? "10",
);
const MAX_HOSTED_PETS = Number(process.env.PETDEX_MAX_HOSTED_PETS ?? "150");
const INSTALL_WEIGHT = Number(process.env.PETDEX_INSTALL_WEIGHT ?? "0.5");
const FETCH_HEADERS = {
  Referer: "https://petdex.dev/",
  "User-Agent": "RealTimeX-Docs-Companion-Import/1.0",
};
const CONCURRENCY = Number(process.env.PETDEX_IMPORT_CONCURRENCY ?? "8");

function collectionKind(slug) {
  if (slug.startsWith("franchise-")) return "franchise";
  if (slug.startsWith("category-")) {
    const rest = slug.slice("category-".length);
    return rest.includes("-") ? "category-sub" : "category";
  }
  return "curated";
}

function petScore(metrics) {
  return (metrics.likeCount ?? 0) + INSTALL_WEIGHT * (metrics.installCount ?? 0);
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: FETCH_HEADERS,
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

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

function parseCollectionJsonLd(html) {
  const match = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  if (!match) {
    throw new Error("Collection JSON-LD not found");
  }

  const data = JSON.parse(match[1]);
  const petIds = (data.mainEntity?.itemListElement ?? []).map((item) => {
    const url = item.url ?? "";
    return url.replace(/\/$/, "").split("/").pop();
  });

  return {
    title: data.name,
    description: data.description,
    petIds,
  };
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

async function importCollection(slug, previewPets) {
  const html = await fetchText(`${PETDEX_COLLECTION_BASE}/${slug}`);
  const parsed = parseCollectionJsonLd(html);
  const previewCoverPetId = previewPets[0]?.slug;

  return {
    id: slug,
    title: parsed.title,
    description: parsed.description,
    kind: collectionKind(slug),
    featured: true,
    coverPetId: previewCoverPetId ?? parsed.petIds[0] ?? null,
    petIds: parsed.petIds,
    source: {
      provider: "petdex",
      url: `${PETDEX_COLLECTION_BASE}/${slug}`,
    },
  };
}

async function fetchAllPetMetrics() {
  const metricsBySlug = new Map();
  let cursor = 0;
  const limit = 60;

  console.log("Fetching Petdex pet metrics via search API...");

  while (true) {
    const url = `${PETDEX_SEARCH_URL}?sort=alpha&limit=${limit}&cursor=${cursor}&includeMeta=0`;
    const page = await fetchJson(url);

    for (const pet of page.pets ?? []) {
      metricsBySlug.set(pet.slug, {
        installCount: pet.metrics?.installCount ?? 0,
        likeCount: pet.metrics?.likeCount ?? 0,
      });
    }

    process.stdout.write(`\r  metrics loaded: ${metricsBySlug.size}`.padEnd(40));

    if (!page.nextCursor) break;
    cursor = page.nextCursor;
  }

  process.stdout.write("\n");
  return metricsBySlug;
}

function scoreCollection(collection, metricsBySlug) {
  let likeCount = 0;
  let installCount = 0;

  for (const petId of collection.petIds) {
    const metrics = metricsBySlug.get(petId) ?? {
      installCount: 0,
      likeCount: 0,
    };
    likeCount += metrics.likeCount;
    installCount += metrics.installCount;
  }

  return {
    likeCount,
    installCount,
    loveScore: likeCount + INSTALL_WEIGHT * installCount,
  };
}

function selectHostedPetIds(collections, metricsBySlug) {
  const candidatePetIds = [...new Set(collections.flatMap((collection) => collection.petIds))];
  const rankedPetIds = candidatePetIds
    .map((petId) => ({
      petId,
      score: petScore(metricsBySlug.get(petId) ?? { installCount: 0, likeCount: 0 }),
    }))
    .sort((a, b) => b.score - a.score || a.petId.localeCompare(b.petId))
    .map((entry) => entry.petId);

  return rankedPetIds.slice(0, MAX_HOSTED_PETS);
}

async function main() {
  const previews = await fetchJson(PETDEX_COLLECTION_PREVIEWS_URL);
  const previewBySlug = new Map(
    previews.collections.map((collection) => [collection.slug, collection.pets]),
  );

  console.log(`Importing ${previews.collections.length} Petdex collections...`);

  const collections = await mapWithConcurrency(
    previews.collections,
    CONCURRENCY,
    (preview, index) => {
      const slug = preview.slug;
      process.stdout.write(
        `\r  [${index + 1}/${previews.collections.length}] ${slug}`.padEnd(80),
      );
      return importCollection(slug, previewBySlug.get(slug) ?? []);
    },
  );
  process.stdout.write("\n");

  const metricsBySlug = await fetchAllPetMetrics();

  const scoredCollections = collections
    .map((collection) => {
      const score = scoreCollection(collection, metricsBySlug);
      return {
        ...collection,
        loveScore: score.loveScore,
        metrics: {
          likeCount: score.likeCount,
          installCount: score.installCount,
        },
      };
    })
    .sort(
      (a, b) =>
        b.loveScore - a.loveScore ||
        b.petIds.length - a.petIds.length ||
        a.title.localeCompare(b.title),
    );

  const hostedCollectionIds = new Set(
    scoredCollections.slice(0, HOSTED_COLLECTION_COUNT).map((collection) => collection.id),
  );
  const hostedCollections = scoredCollections.filter((collection) =>
    hostedCollectionIds.has(collection.id),
  );
  const hostedPetIds = selectHostedPetIds(hostedCollections, metricsBySlug);
  const hostedPetIdSet = new Set(hostedPetIds);

  const outputCollections = scoredCollections
    .map((collection) => {
      const hosted = hostedCollectionIds.has(collection.id);
      const collectionHostedPetIds = collection.petIds.filter((petId) =>
        hostedPetIdSet.has(petId),
      );

      return {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        kind: collection.kind,
        featured: collection.featured,
        hosted,
        loveScore: collection.loveScore,
        coverPetId: collectionHostedPetIds[0] ?? collection.coverPetId,
        petIds: collection.petIds,
        hostedPetIds: collectionHostedPetIds,
        petCount: collection.petIds.length,
        hostedPetCount: collectionHostedPetIds.length,
        metrics: collection.metrics,
        source: collection.source,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const document = {
    schemaVersion: 2,
    importedAt: new Date().toISOString(),
    source: {
      provider: "petdex",
      collectionsUrl: "https://petdex.dev/collections",
      previewsUrl: PETDEX_COLLECTION_PREVIEWS_URL,
    },
    hosting: {
      strategy: "top-loved-collections",
      hostedCollectionCount: HOSTED_COLLECTION_COUNT,
      maxHostedPets: MAX_HOSTED_PETS,
      scoreFormula: `sum(likeCount) + ${INSTALL_WEIGHT} * sum(installCount)`,
    },
    hostedCollectionIds: [...hostedCollectionIds],
    hostedPetIds,
    stats: {
      collections: outputCollections.length,
      hostedCollections: hostedCollections.length,
      uniquePets: new Set(outputCollections.flatMap((collection) => collection.petIds)).size,
      hostedPets: hostedPetIds.length,
      petSlots: outputCollections.reduce(
        (total, collection) => total + collection.petIds.length,
        0,
      ),
    },
    collections: outputCollections,
  };

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(document, null, 2)}\n`);
  console.log(`Wrote ${OUTPUT_PATH}`);
  console.log(
    `  ${document.stats.collections} collections cataloged, ${document.stats.hostedCollections} hosted`,
  );
  console.log(`  ${document.stats.hostedPets} hosted pets (deduped, capped)`);
  console.log("Top hosted collections:");
  for (const collection of hostedCollections) {
    console.log(
      `  - ${collection.title} (${collection.id}): score=${Math.round(collection.loveScore)}, pets=${collection.petIds.length}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
