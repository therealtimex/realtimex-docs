import { writeRealtimeXLiteArtifacts } from "./lib/realtimex-lite.mjs";

const result = writeRealtimeXLiteArtifacts();

console.log("RealTimeX lite docs generated.");
console.log(`  json: ${result.jsonPath}`);
console.log(`  markdown: ${result.markdownPath}`);
