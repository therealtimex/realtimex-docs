import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../public/data");
const BASE_PATH = path.join(DATA_DIR, "workspace-team-templates.v1.json");
const LOCALE_TAG_PATTERN = /^[a-z]{2,3}(?:[_-][a-zA-Z0-9]{2,8})*$/;
const TEMPLATE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ROLE_KEY_PATTERN = /^[a-z][a-z0-9-]*$/;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function validateTeam(template) {
  const team = template.team;
  assert(isObject(team), `template ${template.id} is missing team`);
  assert(team.version === 1, `template ${template.id} team.version must be 1`);
  assert(isObject(team.roles), `template ${template.id} roles must be an object`);
  assert(
    Object.keys(team.roles).length > 0,
    `template ${template.id} must contain at least one role`
  );
  for (const [roleKey, role] of Object.entries(team.roles)) {
    assert(
      ROLE_KEY_PATTERN.test(roleKey),
      `template ${template.id} has an invalid role key: ${roleKey}`
    );
    assert(isObject(role), `template ${template.id} role ${roleKey} must be an object`);
    assert(
      typeof role.displayName === "string" && role.displayName.trim(),
      `template ${template.id} role ${roleKey} needs a displayName`
    );
  }
  assert(
    isObject(team.pipelines),
    `template ${template.id} pipelines must be an object`
  );
  for (const [pipelineKey, pipeline] of Object.entries(team.pipelines)) {
    assert(
      isObject(pipeline),
      `template ${template.id} pipeline ${pipelineKey} must be an object`
    );
    assert(
      team.roles[pipeline.owner],
      `template ${template.id} pipeline ${pipelineKey} has an unknown owner`
    );
    assert(
      team.roles[pipeline.reviewer],
      `template ${template.id} pipeline ${pipelineKey} has an unknown reviewer`
    );
    assert(
      pipeline.owner !== pipeline.reviewer,
      `template ${template.id} pipeline ${pipelineKey} must use distinct roles`
    );
    assert(
      Array.isArray(pipeline.verdicts) && pipeline.verdicts.length >= 2,
      `template ${template.id} pipeline ${pipelineKey} needs at least two verdicts`
    );
    assert(
      pipeline.verdicts.every(
        (verdict) => typeof verdict === "string" && verdict.trim()
      ),
      `template ${template.id} pipeline ${pipelineKey} has an invalid verdict`
    );
    assert(
      new Set(pipeline.verdicts).size === pipeline.verdicts.length,
      `template ${template.id} pipeline ${pipelineKey} has duplicate verdicts`
    );
  }
}

function validateSourceTopology(template) {
  if (template.sourceTopology === undefined) return;
  const source = template.sourceTopology;
  assert(
    isObject(source),
    `template ${template.id} sourceTopology must be an object`
  );
  assert(
    source.id === template.id,
    `template ${template.id} sourceTopology.id must preserve the source id`
  );
  assert(
    Number.isInteger(source.registrySchemaVersion) &&
      source.registrySchemaVersion >= 1,
    `template ${template.id} sourceTopology.registrySchemaVersion is invalid`
  );
  assert(
    Number.isInteger(source.contentVersion) && source.contentVersion >= 1,
    `template ${template.id} sourceTopology.contentVersion is invalid`
  );
}

function main() {
  assert(fs.existsSync(BASE_PATH), "missing workspace-team-templates.v1.json");
  const base = readJson(BASE_PATH);

  assert(base.schemaVersion === 1, "schemaVersion must be 1");
  assert(
    typeof base.updatedAt === "string" && base.updatedAt,
    "updatedAt must be set"
  );
  assert(
    Array.isArray(base.templates) && base.templates.length > 0,
    "templates must be populated"
  );
  assert(Array.isArray(base.locales), "locales must be an array");

  const templateIds = new Set();
  for (const template of base.templates) {
    assert(
      TEMPLATE_ID_PATTERN.test(template.id),
      `invalid template id: ${template.id}`
    );
    assert(!templateIds.has(template.id), `duplicate template id: ${template.id}`);
    templateIds.add(template.id);
    assert(
      typeof template.name === "string" && template.name.trim(),
      `template ${template.id} needs a name`
    );
    assert(
      typeof template.description === "string" && template.description.trim(),
      `template ${template.id} needs a description`
    );
    validateSourceTopology(template);
    validateTeam(template);
  }

  for (const locale of base.locales) {
    assert(
      typeof locale === "string" && LOCALE_TAG_PATTERN.test(locale),
      `invalid locale: ${locale}`
    );
    const siblingPath = path.join(
      DATA_DIR,
      `workspace-team-templates.v1.${locale}.json`
    );
    assert(fs.existsSync(siblingPath), `missing locale file: ${locale}`);
    const sibling = readJson(siblingPath);
    assert(sibling.schemaVersion === 1, `${locale} schemaVersion must be 1`);
    assert(sibling.locale === locale, `${locale} locale field does not match`);
    assert(isObject(sibling.templates), `${locale} templates must be an object`);
    for (const templateId of Object.keys(sibling.templates)) {
      assert(
        templateIds.has(templateId),
        `${locale} has an unknown template: ${templateId}`
      );
    }
    for (const templateId of templateIds) {
      const translation = sibling.templates[templateId];
      assert(translation, `${locale} is missing ${templateId}`);
      assert(
        typeof translation.name === "string" && translation.name.trim(),
        `${locale} ${templateId} needs a name`
      );
      assert(
        typeof translation.description === "string" &&
          translation.description.trim(),
        `${locale} ${templateId} needs a description`
      );
    }
  }

  console.log("Hosted Workspace Team template checks passed.");
  console.log(`  templates: ${base.templates.length}`);
  console.log(`  locales: ${base.locales.join(", ") || "(none declared)"}`);
}

main();
