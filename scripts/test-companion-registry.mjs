import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "public", "data");
const COMPANION_DIR = path.join(ROOT, "public", "companion");
const DOCS_BASE = process.env.COMPANION_DOCS_BASE ?? "https://docs.realtimex.ai";

function loadJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function main() {
  const curated = loadJson("companion-curated.v1.json");
  const collectionsDoc = loadJson("companion-collections.v1.json");
  const petsDoc = loadJson("companion-pets.v1.json");

  assert(curated.schemaVersion === 2, "curated schemaVersion must be 2");
  assert(collectionsDoc.schemaVersion === 2, "collections schemaVersion must be 2");
  assert(petsDoc.schemaVersion === 2, "pets schemaVersion must be 2");

  const hostedPetIds = new Set(curated.hostedPetIds);
  assert(hostedPetIds.size === curated.hostedPetIds.length, "duplicate hostedPetIds in curated");
  assert(hostedPetIds.size === petsDoc.total, "pets index total must match hostedPetIds");
  assert(
    collectionsDoc.hostedCollections === curated.hosting.hostedCollectionCount,
    "hosted collection count mismatch",
  );

  for (const pet of petsDoc.pets) {
    assert(pet.hosted === true, `pet ${pet.id} must be hosted`);
    assert(hostedPetIds.has(pet.id), `pet ${pet.id} missing from curated.hostedPetIds`);
    assert(pet.assets.petJson.startsWith(DOCS_BASE), `pet ${pet.id} petJson must use docs base`);
    assert(
      fs.existsSync(path.join(COMPANION_DIR, pet.id, "pet.json")),
      `missing local pet.json for ${pet.id}`,
    );
    assert(
      fs.existsSync(path.join(COMPANION_DIR, pet.id, "spritesheet.webp")),
      `missing local spritesheet for ${pet.id}`,
    );
  }

  for (const collection of collectionsDoc.collections) {
    assert(Array.isArray(collection.petIds), `collection ${collection.id} missing petIds`);
    assert(Array.isArray(collection.hostedPetIds), `collection ${collection.id} missing hostedPetIds`);

    for (const petId of collection.hostedPetIds) {
      assert(
        hostedPetIds.has(petId),
        `collection ${collection.id} hostedPetIds contains unknown hosted pet ${petId}`,
      );
      assert(
        collection.petIds.includes(petId),
        `collection ${collection.id} hostedPetIds must be subset of petIds`,
      );
    }

    if (collection.hosted) {
      assert(collection.hostedPetCount > 0, `hosted collection ${collection.id} has no hosted pets`);
    } else {
      assert(collection.remoteAssets?.petdexBase, `non-hosted collection ${collection.id} missing remoteAssets`);
    }
  }

  const companionDirs = fs
    .readdirSync(COMPANION_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  assert(
    companionDirs.length === hostedPetIds.size,
    `companion dir count (${companionDirs.length}) must equal hosted pets (${hostedPetIds.size})`,
  );

  console.log("Companion registry checks passed.");
  console.log(`  collections: ${collectionsDoc.total} (${collectionsDoc.hostedCollections} hosted)`);
  console.log(`  hosted pets: ${petsDoc.total}`);
  console.log(`  asset packs on disk: ${companionDirs.length}`);
}

main();
