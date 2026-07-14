import { createHash } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REGISTRY_PATH = path.join(ROOT, "public", "data", "agent-models.v2.json");
const DEFAULT_BASELINE_URL =
  "https://docs.realtimex.ai/data/agent-models.v2.json";
const REVISION_PATTERN = /^sha256:[a-f0-9]{64}$/;
const VERSION_PATTERN = /^v?\d+(?:\.\d+){0,3}(?:[-+][0-9A-Za-z.-]+)?$/;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isPlainObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isPlainObject(value)) return value;

  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])])
  );
}

function revisionContent(registry) {
  const content = { ...registry };
  delete content.revision;
  return JSON.stringify(canonicalize(content));
}

function computeRevision(registry) {
  const hash = createHash("sha256")
    .update(revisionContent(registry))
    .digest("hex");
  return `sha256:${hash}`;
}

function assertUniqueStrings(values, label) {
  assert(Array.isArray(values), `${label} must be an array`);
  const seen = new Set();
  for (const rawValue of values) {
    const value = String(rawValue || "").trim();
    assert(value, `${label} contains an empty value`);
    const key = value.toLowerCase();
    assert(!seen.has(key), `${label} contains duplicate value '${value}'`);
    seen.add(key);
  }
}

function validateCompatibility(compatibility, label) {
  if (compatibility === undefined) return;
  assert(
    isPlainObject(compatibility),
    `${label}.compatibility must be an object`
  );

  for (const field of ["minVersion", "maxVersion"]) {
    const value = compatibility[field];
    if (value === undefined || value === null) continue;
    assert(
      typeof value === "string" && VERSION_PATTERN.test(value.trim()),
      `${label}.compatibility.${field} must be a version string`
    );
  }

  for (const field of ["channel", "requiresCapability"]) {
    if (compatibility[field] === undefined) continue;
    assertUniqueStrings(
      compatibility[field],
      `${label}.compatibility.${field}`
    );
  }
}

function normalizeOptionValue(rawValue, label) {
  if (typeof rawValue === "string") {
    const value = rawValue.trim();
    assert(value, `${label} contains an empty value`);
    return value;
  }

  assert(isPlainObject(rawValue), `${label} values must be strings or objects`);
  const value = String(rawValue.value ?? rawValue.id ?? "").trim();
  assert(value, `${label} contains a value object without an id`);
  validateCompatibility(rawValue.compatibility, `${label}.${value}`);
  return value;
}

function validateRuntimeOption(option, label) {
  assert(isPlainObject(option), `${label} must be an object`);
  const id = String(option.id || "").trim();
  assert(id, `${label}.id is required`);
  assert(String(option.label || "").trim(), `${label}.label is required`);
  assert(String(option.category || "").trim(), `${label}.category is required`);
  assert(String(option.type || "").trim(), `${label}.type is required`);
  validateCompatibility(option.compatibility, label);

  const values = Array.isArray(option.values)
    ? option.values.map((value) =>
        normalizeOptionValue(value, `${label}.values`)
      )
    : [];
  if (option.type === "select") {
    assert(
      values.length > 0,
      `${label}.values must be populated for select options`
    );
  }
  if (values.length > 0) assertUniqueStrings(values, `${label}.values`);

  if (option.default !== undefined) {
    const defaultValue = String(option.default ?? "").trim();
    assert(defaultValue, `${label}.default must not be empty`);
    if (values.length > 0) {
      assert(
        values.some(
          (value) => value.toLowerCase() === defaultValue.toLowerCase()
        ),
        `${label}.default '${defaultValue}' is not present in values`
      );
    }
  }

  assert(isPlainObject(option.launch), `${label}.launch must be an object`);
  assert(
    String(option.launch.kind || "").trim(),
    `${label}.launch.kind is required`
  );
  assert(
    String(option.launch.flag || "").trim(),
    `${label}.launch.flag is required`
  );
  return id;
}

function validateReferenceList(refs, optionKeys, label) {
  if (refs === undefined) return;
  assertUniqueStrings(refs, label);
  for (const ref of refs) {
    assert(
      optionKeys.has(ref),
      `${label} references unknown runtime option '${ref}'`
    );
  }
}

function validateRegistry(registry) {
  assert(isPlainObject(registry), "registry must be an object");
  assert(registry.schemaVersion === 2, "schemaVersion must be 2");
  assert(
    typeof registry.updatedAt === "string" &&
      registry.updatedAt.trim() &&
      Number.isFinite(Date.parse(registry.updatedAt)),
    "updatedAt must be an ISO-8601 date or timestamp"
  );
  assert(
    typeof registry.revision === "string" &&
      REVISION_PATTERN.test(registry.revision),
    "revision must use the sha256:<64 lowercase hex characters> format"
  );
  assert(
    registry.revision === computeRevision(registry),
    "revision does not match the canonical registry content; run " +
      "`node scripts/test-agent-models.mjs --write-revision`"
  );

  assert(
    isPlainObject(registry.runtimeOptions),
    "runtimeOptions must be an object"
  );
  const optionKeys = new Set();
  for (const [key, option] of Object.entries(registry.runtimeOptions)) {
    const normalizedKey = String(key || "").trim();
    assert(normalizedKey, "runtimeOptions contains an empty key");
    const caseInsensitiveKey = normalizedKey.toLowerCase();
    assert(
      !optionKeys.has(caseInsensitiveKey),
      `runtimeOptions contains duplicate key '${normalizedKey}'`
    );
    optionKeys.add(caseInsensitiveKey);
    validateRuntimeOption(option, `runtimeOptions.${normalizedKey}`);
  }

  const exactOptionKeys = new Set(Object.keys(registry.runtimeOptions));
  assert(isPlainObject(registry.agents), "agents must be an object");
  assert(Object.keys(registry.agents).length > 0, "agents must be populated");
  const agentKeys = new Set();

  for (const [agentId, agent] of Object.entries(registry.agents)) {
    const normalizedAgentId = String(agentId || "").trim();
    assert(normalizedAgentId, "agents contains an empty key");
    const agentKey = normalizedAgentId.toLowerCase();
    assert(
      !agentKeys.has(agentKey),
      `duplicate agent id '${normalizedAgentId}'`
    );
    agentKeys.add(agentKey);
    assert(
      isPlainObject(agent),
      `agents.${normalizedAgentId} must be an object`
    );
    validateCompatibility(agent.compatibility, `agents.${normalizedAgentId}`);
    validateReferenceList(
      agent.runtimeOptionRefs,
      exactOptionKeys,
      `agents.${normalizedAgentId}.runtimeOptionRefs`
    );
    assert(
      Array.isArray(agent.models) && agent.models.length > 0,
      `agents.${normalizedAgentId}.models must be populated`
    );

    const modelIds = new Set();
    let defaultCount = 0;
    for (const model of agent.models) {
      assert(
        isPlainObject(model),
        `agents.${normalizedAgentId}.models entries must be objects`
      );
      const modelId = String(model.id || "").trim();
      assert(
        modelId,
        `agents.${normalizedAgentId} contains a model without an id`
      );
      assert(
        String(model.label || model.name || "").trim(),
        `agents.${normalizedAgentId}.${modelId}.label is required`
      );
      const modelKey = modelId.toLowerCase();
      assert(
        !modelIds.has(modelKey),
        `agents.${normalizedAgentId} contains duplicate model id '${modelId}'`
      );
      modelIds.add(modelKey);
      if (model.default === true) defaultCount += 1;
      validateCompatibility(
        model.compatibility,
        `agents.${normalizedAgentId}.${modelId}`
      );
      validateReferenceList(
        model.runtimeOptionRefs,
        exactOptionKeys,
        `agents.${normalizedAgentId}.${modelId}.runtimeOptionRefs`
      );
      if (model.runtimeOptions !== undefined) {
        assert(
          Array.isArray(model.runtimeOptions),
          `agents.${normalizedAgentId}.${modelId}.runtimeOptions must be an array`
        );
        const inlineIds = new Set();
        for (const option of model.runtimeOptions) {
          const optionId = validateRuntimeOption(
            option,
            `agents.${normalizedAgentId}.${modelId}.runtimeOptions`
          ).toLowerCase();
          assert(
            !inlineIds.has(optionId),
            `agents.${normalizedAgentId}.${modelId} contains duplicate inline runtime option '${optionId}'`
          );
          inlineIds.add(optionId);
        }
      }
    }
    assert(
      defaultCount <= 1,
      `agents.${normalizedAgentId} contains more than one default model`
    );
  }
}

async function validatePublishedBaseline(registry) {
  const baselineUrl =
    process.env.AGENT_MODELS_BASELINE_URL ||
    (process.env.CI ? DEFAULT_BASELINE_URL : "");
  if (!baselineUrl) return { checked: false, reason: "not requested" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    let baseline;
    if (/^https?:\/\//i.test(baselineUrl)) {
      const response = await fetch(baselineUrl, { signal: controller.signal });
      assert(
        response.ok,
        `baseline request failed with HTTP ${response.status}`
      );
      baseline = await response.json();
    } else {
      const baselinePath = baselineUrl.startsWith("file:")
        ? fileURLToPath(baselineUrl)
        : path.resolve(ROOT, baselineUrl);
      baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
    }
    const baselineRevision = String(baseline?.revision || "").trim();

    // The first revision-aware deploy may compare against a legacy v2 document
    // without a revision. The local content hash is still authoritative.
    if (!baselineRevision) {
      return { checked: true, migratedLegacyBaseline: true };
    }

    assert(
      REVISION_PATTERN.test(baselineRevision),
      "published baseline revision has an invalid format"
    );
    const contentChanged =
      revisionContent(registry) !== revisionContent(baseline);
    if (contentChanged) {
      assert(
        registry.revision !== baselineRevision,
        "changed registry content must publish a new revision"
      );
    } else {
      assert(
        registry.revision === baselineRevision,
        "unchanged registry content must keep the published revision"
      );
    }
    return { checked: true, contentChanged };
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  assert(
    fs.existsSync(REGISTRY_PATH),
    "missing public/data/agent-models.v2.json"
  );
  let source = fs.readFileSync(REGISTRY_PATH, "utf8");
  let registry = JSON.parse(source);

  if (process.argv.includes("--write-revision")) {
    const revision = computeRevision(registry);
    if (/^\s*"revision"\s*:/m.test(source)) {
      source = source.replace(
        /^(\s*)"revision"\s*:\s*"[^"]*"/m,
        `$1"revision": "${revision}"`
      );
    } else {
      source = source.replace(
        /^(\s*"schemaVersion"\s*:\s*\d+\s*,\s*\n)/m,
        `$1  "revision": "${revision}",\n`
      );
    }
    fs.writeFileSync(REGISTRY_PATH, source);
    registry = JSON.parse(source);
  }

  validateRegistry(registry);
  const baseline = await validatePublishedBaseline(registry);
  console.log("Agent model registry checks passed.");
  console.log(`  revision: ${registry.revision}`);
  console.log(`  agents: ${Object.keys(registry.agents).length}`);
  console.log(
    `  runtime options: ${Object.keys(registry.runtimeOptions).length}`
  );
  console.log(
    `  published baseline: ${baseline.checked ? "checked" : baseline.reason}`
  );
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
