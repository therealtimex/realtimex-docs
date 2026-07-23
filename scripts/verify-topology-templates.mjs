import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../public/data");
const BASE_PATH = path.join(DATA_DIR, "topology-templates.v1.json");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function localeSiblingPath(locale) {
  return path.join(DATA_DIR, `topology-templates.v1.${locale}.json`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function main() {
  assert(fs.existsSync(BASE_PATH), "missing public/data/topology-templates.v1.json");
  const base = readJson(BASE_PATH);

  assert(base.schemaVersion === 1, "schemaVersion must be 1");
  assert(typeof base.updatedAt === "string" && base.updatedAt, "updatedAt must be set");
  assert(Array.isArray(base.templates) && base.templates.length > 0, "templates must be populated");
  assert(Array.isArray(base.locales), "locales must be an array (may be empty)");

  const templateIds = new Set();
  for (const template of base.templates) {
    assert(template.id, "each template must have an id");
    assert(!templateIds.has(template.id), `duplicate template id: ${template.id}`);
    templateIds.add(template.id);
    assert(template.name, `template ${template.id} missing name`);
    assert(template.content && typeof template.content === "object", `template ${template.id} missing content`);
    assert(template.content.roles && typeof template.content.roles === "object", `template ${template.id} content missing roles`);
    assert(template.content.workflow && typeof template.content.workflow === "object", `template ${template.id} content missing workflow`);
  }

  // Every declared locale sibling must exist and cover every base template
  // with both a name and description. This is the publish-time gate that
  // keeps hosted templates fully localized at the source (issue #1265) —
  // unlike a translation backlog, a missing locale entry here fails the
  // build rather than silently falling back to English at render time.
  for (const locale of base.locales) {
    const siblingPath = localeSiblingPath(locale);
    assert(fs.existsSync(siblingPath), `missing locale file for "${locale}": ${path.basename(siblingPath)}`);
    const localeFile = readJson(siblingPath);
    assert(localeFile.locale === locale, `${path.basename(siblingPath)} locale field must be "${locale}"`);
    assert(
      localeFile.templates && typeof localeFile.templates === "object",
      `${path.basename(siblingPath)} missing templates map`
    );

    for (const templateId of templateIds) {
      const entry = localeFile.templates[templateId];
      assert(entry, `locale "${locale}" is missing a translation for template "${templateId}"`);
      assert(
        typeof entry.name === "string" && entry.name.trim(),
        `locale "${locale}" translation for "${templateId}" is missing a non-empty name`
      );
      assert(
        typeof entry.description === "string" && entry.description.trim(),
        `locale "${locale}" translation for "${templateId}" is missing a non-empty description`
      );
    }
  }

  console.log("Hosted topology template checks passed.");
  console.log(`  templates: ${base.templates.length}`);
  console.log(`  locales: ${base.locales.length ? base.locales.join(", ") : "(none declared)"}`);
}

main();
