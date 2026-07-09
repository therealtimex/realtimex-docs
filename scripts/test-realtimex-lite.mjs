import fs from "fs";
import {
  JSON_OUTPUT_PATH,
  MARKDOWN_OUTPUT_PATH,
  REALTIMEX_LITE_SCHEMA_VERSION,
  renderRealtimeXLiteMarkdown,
} from "./lib/realtimex-lite.mjs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  assert(fs.existsSync(JSON_OUTPUT_PATH), "missing public/data/realtimex-lite.v1.json");
  assert(fs.existsSync(MARKDOWN_OUTPUT_PATH), "missing public/data/realtimex-lite.v1.md");

  const docs = JSON.parse(fs.readFileSync(JSON_OUTPUT_PATH, "utf8"));
  const markdown = fs.readFileSync(MARKDOWN_OUTPUT_PATH, "utf8");

  assert(
    docs.schemaVersion === REALTIMEX_LITE_SCHEMA_VERSION,
    `schemaVersion must be ${REALTIMEX_LITE_SCHEMA_VERSION}`,
  );
  assert(docs.title === "RealTimeX Lite", "title must be RealTimeX Lite");
  assert(Array.isArray(docs.coreConcepts) && docs.coreConcepts.length >= 8, "coreConcepts must be populated");
  assert(Array.isArray(docs.mainSurfaces) && docs.mainSurfaces.length >= 6, "mainSurfaces must be populated");
  assert(
    Array.isArray(docs.sourceDocs) && docs.sourceDocs.length >= 8,
    "sourceDocs must be populated",
  );
  assert(
    docs.summary.includes("AI work operating system"),
    "summary must include the buyer-facing positioning",
  );

  for (const sourceDoc of docs.sourceDocs) {
    assert(sourceDoc.id, "each sourceDoc must have an id");
    assert(sourceDoc.title, `sourceDoc ${sourceDoc.id} missing title`);
    assert(sourceDoc.sitePath?.startsWith("/"), `sourceDoc ${sourceDoc.id} missing sitePath`);
    assert(
      sourceDoc.docsUrl?.startsWith("https://docs.realtimex.ai/"),
      `sourceDoc ${sourceDoc.id} missing docsUrl`,
    );
  }

  const sourceDocIds = new Set(docs.sourceDocs.map((sourceDoc) => sourceDoc.id));
  assert(sourceDocIds.has("why-realtimex"), "sourceDocs missing why-realtimex");
  assert(sourceDocIds.has("for-businesses"), "sourceDocs missing for-businesses");
  assert(sourceDocIds.has("cloud-overview"), "sourceDocs missing cloud-overview");

  const expectedMarkdown = `${renderRealtimeXLiteMarkdown(docs)}\n`;
  assert(markdown === expectedMarkdown, "markdown output is not derived from JSON output");
  assert(markdown.includes("## Common Operations"), "markdown missing Common Operations section");
  assert(markdown.includes("## Source Pages"), "markdown missing Source Pages section");

  console.log("RealTimeX lite docs checks passed.");
  console.log(`  source docs: ${docs.sourceDocs.length}`);
  console.log(`  core concepts: ${docs.coreConcepts.length}`);
  console.log(`  main surfaces: ${docs.mainSurfaces.length}`);
}

main();
