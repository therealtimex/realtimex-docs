import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT = path.join(__dirname, "..", "..");
export const DATA_DIR = path.join(ROOT, "public", "data");
export const DOCS_BASE = "https://docs.realtimex.ai";
export const JSON_OUTPUT_PATH = path.join(DATA_DIR, "realtimex-lite.v1.json");
export const MARKDOWN_OUTPUT_PATH = path.join(DATA_DIR, "realtimex-lite.v1.md");
export const REALTIMEX_LITE_SCHEMA_VERSION = 1;

const SOURCE_DOCS = Object.freeze([
  {
    id: "introduction",
    sitePath: "/introduction",
    sourcePath: "pages/introduction.mdx",
  },
  {
    id: "workspaces",
    sitePath: "/workspaces",
    sourcePath: "pages/workspaces.mdx",
  },
  {
    id: "personality",
    sitePath: "/personality",
    sourcePath: "pages/personality.mdx",
  },
  {
    id: "agent-runtime",
    sitePath: "/agent-runtime",
    sourcePath: "pages/agent-runtime.mdx",
  },
  {
    id: "ambient-agent",
    sitePath: "/ambient-agent",
    sourcePath: "pages/ambient-agent.mdx",
  },
  {
    id: "goals",
    sitePath: "/goals",
    sourcePath: "pages/goals.mdx",
  },
  {
    id: "agentic-clis",
    sitePath: "/agentic-clis",
    sourcePath: "pages/agentic-clis.mdx",
  },
  {
    id: "agent-authentication",
    sitePath: "/agent-authentication",
    sourcePath: "pages/agent-authentication.mdx",
  },
  {
    id: "plugins-overview",
    sitePath: "/plugins",
    sourcePath: "pages/plugins/index.mdx",
  },
  {
    id: "built-in-plugins",
    sitePath: "/plugins/built-in-plugins",
    sourcePath: "pages/plugins/built-in-plugins.mdx",
  },
  {
    id: "manage-plugins",
    sitePath: "/plugins/manage-plugins",
    sourcePath: "pages/plugins/manage-plugins.mdx",
  },
  {
    id: "configure-plugin-settings",
    sitePath: "/plugins/configure-plugin-settings",
    sourcePath: "pages/plugins/configure-plugin-settings.mdx",
  },
  {
    id: "realtimex-bizops",
    sitePath: "/plugins/realtimex-bizops",
    sourcePath: "pages/plugins/realtimex-bizops.mdx",
  },
  {
    id: "runtime-auto-approve",
    sitePath: "/plugins/runtime-auto-approve",
    sourcePath: "pages/plugins/runtime-auto-approve.mdx",
  },
  {
    id: "terminal-governance",
    sitePath: "/plugins/terminal-governance",
    sourcePath: "pages/plugins/terminal-governance.mdx",
  },
  {
    id: "realtimex-aigateway",
    sitePath: "/plugins/realtimex-aigateway",
    sourcePath: "pages/plugins/realtimex-aigateway.mdx",
  },
  {
    id: "realtimex-public-exposure",
    sitePath: "/plugins/realtimex-public-exposure",
    sourcePath: "pages/plugins/realtimex-public-exposure.mdx",
  },
  {
    id: "realtimex-loops",
    sitePath: "/plugins/realtimex-loops",
    sourcePath: "pages/plugins/realtimex-loops.mdx",
  },
  {
    id: "local-apps-user-guide",
    title: "Local Apps User Guide",
    sitePath: "/local-apps/user-guide",
    sourcePath: "pages/local-apps/user-guide.mdx",
  },
  {
    id: "desktop-installation-overview",
    sitePath: "/installation-desktop/overview",
    sourcePath: "pages/installation-desktop/overview.mdx",
  },
]);

function normalizeText(value = "") {
  const normalized = String(value || "").trim();
  return normalized || null;
}

function normalizeRoute(route = "/") {
  const trimmed = String(route || "").trim();
  if (!trimmed || trimmed === "/") return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function routeToDocsUrl(route = "/") {
  const normalizedRoute = normalizeRoute(route);
  if (normalizedRoute === "/") return `${DOCS_BASE}/`;
  return `${DOCS_BASE}${normalizedRoute}/`;
}

function parseFrontmatter(sourcePath) {
  const absolutePath = path.join(ROOT, sourcePath);
  const fileContent = fs.readFileSync(absolutePath, "utf8");
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    return {};
  }

  const fields = {};
  for (const rawLine of match[1].split("\n")) {
    const separatorIndex = rawLine.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = rawLine.slice(0, separatorIndex).trim();
    const rawValue = rawLine.slice(separatorIndex + 1).trim();
    if (!key) continue;

    const strippedValue = rawValue.replace(/^['"]|['"]$/g, "").trim();
    fields[key] = strippedValue;
  }

  return fields;
}

function buildSourceDoc(entry) {
  const frontmatter = parseFrontmatter(entry.sourcePath);
  const title =
    normalizeText(entry.title) ||
    normalizeText(frontmatter.title) ||
    entry.id;
  const description =
    normalizeText(entry.description) ||
    normalizeText(frontmatter.description) ||
    "";
  const sitePath = normalizeRoute(entry.sitePath);

  return {
    id: entry.id,
    title,
    description,
    sitePath,
    docsUrl: routeToDocsUrl(sitePath),
  };
}

export function listRealtimeXLiteSourceDocs() {
  return SOURCE_DOCS.map(buildSourceDoc);
}

export function buildRealtimeXLite({
  generatedAt = new Date().toISOString(),
} = {}) {
  return {
    schemaVersion: REALTIMEX_LITE_SCHEMA_VERSION,
    generatedAt,
    updatedAt: generatedAt.slice(0, 10),
    title: "RealTimeX Lite",
    audience: "Ambient Agent and other RealTimeX control agents",
    generatedBy: {
      repository: "realtimex-docs",
      script: "scripts/generate-realtimex-lite.mjs",
      markdownPath: "public/data/realtimex-lite.v1.md",
    },
    readFirst:
      "Read this guide before answering foundational RealTimeX questions or deciding whether to explain first versus act.",
    summary:
      "RealTimeX is a workspace-based AI product for chat, agents, plugin-backed capabilities, runtime control, governed terminal-agent flows, public exposure, personality files, working directories, channels, goals, and background automation. Ambient Agent is RealTimeX's built-in companion for explaining the product and operating supported RealTimeX setup and control flows on the user's behalf.",
    ambientAgentMission: [
      "Help the user understand and use RealTimeX.",
      "Explain the relevant RealTimeX concept before acting when the user asks what something is, how it works, or which surface to use.",
      "When the user clearly requests a RealTimeX change and the required inputs are present, use the RealTimeX control path instead of only describing menus.",
      "Keep the user in the right surface: settings for configuration, workspace home for goal tracking, and chat for interactive work.",
    ],
    coreConcepts: [
      {
        term: "Workspace",
        meaning:
          "The main collaboration container in RealTimeX. A workspace holds chats, documents, agent behavior, integrations, and member access for one team or use case.",
      },
      {
        term: "Thread",
        meaning:
          "A conversation inside one workspace. Users and agents can continue work in the same thread instead of mixing everything into one long workspace chat.",
      },
      {
        term: "Ambient Agent",
        meaning:
          "The scheduled background agent runner in RealTimeX. It wakes on a schedule, reads HEARTBEAT.md, and decides whether anything needs action.",
      },
      {
        term: "Goals & Ambient Dashboard",
        meaning:
          "The central board for durable work that should survive beyond one chat turn, one thread, or one terminal session.",
      },
      {
        term: "Default agent",
        meaning:
          "The preferred agent runtime or terminal agent for a workspace or ambient flow. It decides which agent RealTimeX should launch unless another one is chosen explicitly.",
      },
      {
        term: "Terminal agent",
        meaning:
          "A CLI-backed runtime such as Claude Code, Codex CLI, Gemini CLI, Qwen CLI, OpenCode, Cursor Agent, or Antigravity CLI that RealTimeX can launch for interactive or background work.",
      },
      {
        term: "HEARTBEAT.md",
        meaning:
          "The main instruction file for Ambient Agent. It defines what the background agent should monitor, when it should act, and when it should do nothing.",
      },
      {
        term: "Personality",
        meaning:
          "The file-based instruction layer for agent identity, behavior, memory, and long-lived guidance at shared or workspace scope.",
      },
      {
        term: "Working directory",
        meaning:
          "A trusted absolute local folder that agents may read or write outside workspace storage without broad filesystem access.",
      },
      {
        term: "Agentic CLI",
        meaning:
          "An external command-line tool that agents may rely on, such as gh or glab. RealTimeX tracks whether the CLI is installed, authenticated, and ready.",
      },
      {
        term: "Agent Authentication",
        meaning:
          "The RealTimeX control surface for provider API keys that should be injected into launched agent runtimes automatically.",
      },
      {
        term: "Plugin",
        meaning:
          "A RealTimeX extension that can add providers, agent skills, runtime behavior, governance, workflow integrations, or admin-facing configuration.",
      },
      {
        term: "Built-in plugin",
        meaning:
          "A plugin that ships with RealTimeX itself. It can usually be enabled, disabled, configured, or reloaded from Settings > Plugins, but it cannot be uninstalled from the UI.",
      },
      {
        term: "Terminal governance",
        meaning:
          "The governed terminal-agent layer that reports dashboard status, governance capability, analytics, and sometimes launch context or local proxy behavior through the Terminal Agents surfaces.",
      },
      {
        term: "Public exposure",
        meaning:
          "The generated public workspace-share, embed, and artifact URL layer controlled by the RealtimeX Public Exposure plugin.",
      },
    ],
    mainSurfaces: [
      {
        surface: "Workspace chat",
        purpose:
          "Interactive work inside one workspace and thread, including chat-linked terminal sessions and @agent flows.",
      },
      {
        surface: "Settings > Admin > Workspaces",
        purpose:
          "Create instance workspaces, open them quickly, and manage who belongs to each one.",
      },
      {
        surface: "Workspace Settings > Personality",
        purpose:
          "Edit file-based instructions, identity, and memory for a specific workspace.",
      },
      {
        surface: "Settings > Agentic CLIs",
        purpose:
          "Register external CLIs, probe readiness, and expose them to RealTimeX agents safely.",
      },
      {
        surface: "Settings > Agents > Working Directories",
        purpose:
          "Register trusted absolute paths that agents may use outside workspace storage.",
      },
      {
        surface: "Settings > Agents > Agent Authentication",
        purpose:
          "Store provider API keys that RealTimeX injects into launched agent runtimes automatically.",
      },
      {
        surface: "Settings > Plugins",
        purpose:
          "Enable, disable, configure, reload, and inspect built-in or installed plugins that extend RealTimeX behavior.",
      },
      {
        surface: "Settings > Terminal Agents",
        purpose:
          "Inspect governed terminal-agent catalog status, analytics, and local proxy behavior while using plugin-backed governance data when available.",
      },
      {
        surface: "Settings > Agents > Ambient Agent",
        purpose:
          "Configure scheduler behavior, execution agent, interval, timezone, active hours, HEARTBEAT.md, and calendar-aware routines for background runs.",
      },
      {
        surface: "Ambient Agent workspace home",
        purpose:
          "The cross-workspace goal board for durable work, follow-up, and ambient monitoring.",
      },
      {
        surface: "Agent feed",
        purpose:
          "Operational view of in-progress, failed, and completed agent work across the system.",
      },
    ],
    explainVsAct: {
      explainFirst: [
        "The user asks what a RealTimeX feature is.",
        "The user asks how to do something in RealTimeX.",
        "The user is unsure which RealTimeX surface they should use.",
        "A mutating action is missing required inputs.",
      ],
      actWhen: [
        "The user clearly requests a RealTimeX change such as create, rename, set, connect, enable, disable, or delete.",
        "The required inputs for that operation are present or have been confirmed.",
      ],
    },
    commonOperations: [
      {
        operation: "Create workspace",
        explain:
          "A workspace is the main collaboration area for one team or use case.",
        requiredInputs: ["workspace name"],
        optionalInputs: ["member assignment timing"],
        rule:
          "If the user asks what a workspace is, explain first. If they ask to create one and provide a name, act.",
      },
      {
        operation: "Set up personality",
        explain:
          "Personality is the file-based instruction layer for durable behavior, identity, and memory.",
        requiredInputs: ["target scope", "desired behavior or instruction goal"],
        optionalInputs: ["draft files", "shared vs workspace preference"],
        rule:
          "Use Personality for durable behavior and identity, not reference knowledge. If the user is unsure, explain Personality versus knowledge files before editing.",
      },
      {
        operation: "Set up working directory",
        explain:
          "A working directory is a trusted absolute local path for agent work outside workspace chat storage.",
        requiredInputs: ["absolute directory path"],
        optionalInputs: ["description", "workspace scope", "agent scope"],
        rule:
          "If the user asks how to set one up, explain it first and ask for the absolute path. Do not set it up until that path is provided.",
      },
      {
        operation: "Set default or execution agent",
        explain:
          "The default or execution agent determines which runtime RealTimeX should prefer for a workspace flow or an Ambient Agent run.",
        requiredInputs: ["target scope", "agent or runtime choice"],
        optionalInputs: ["model choice"],
        rule:
          "Confirm the scope and runtime when they are ambiguous before changing them.",
      },
      {
        operation: "Register an agentic CLI",
        explain:
          "Agentic CLIs let RealTimeX know which external command-line tools are installed, authenticated, and allowed for agent use.",
        requiredInputs: ["CLI binary or absolute executable path"],
        optionalInputs: ["auth command", "version probe", "install docs URL", "skill hint"],
        rule:
          "RealTimeX does not install or log in the CLI for the user. If the CLI is missing or unauthenticated, explain that distinction before claiming it is ready.",
      },
      {
        operation: "Add runtime auth",
        explain:
          "Agent Authentication stores provider API keys that RealTimeX injects into launched runtimes automatically.",
        requiredInputs: ["target runtime profile", "matching API key or provider slot"],
        optionalInputs: [],
        rule:
          "Use Agent Authentication when the runtime itself needs a provider key. Do not treat Credentials storage or CLI login state as equivalent.",
      },
      {
        operation: "Set up Ambient Agent",
        explain:
          "Ambient Agent is the scheduled background runner for recurring work and follow-up.",
        requiredInputs: ["execution agent choice", "schedule intent", "HEARTBEAT.md behavior"],
        optionalInputs: ["timezone", "active hours", "task blocks", "calendar routine"],
        rule:
          "If the user is unsure whether they need Ambient Agent settings or the Goals & Ambient Dashboard, explain the difference before editing.",
      },
      {
        operation: "Enable or disable a built-in plugin",
        explain:
          "Built-in plugins ship with RealTimeX and are managed from Settings > Plugins.",
        requiredInputs: ["plugin name", "desired enabled or disabled state"],
        optionalInputs: ["whether configuration should happen now"],
        rule:
          "If the user asks what the plugin does, explain the plugin first. If they clearly ask to enable or disable a named plugin, act.",
      },
      {
        operation: "Configure plugin settings",
        explain:
          "Plugin configuration stores provider keys, policy rules, workflow files, local paths, or runtime settings for one plugin.",
        requiredInputs: ["plugin name"],
        optionalInputs: ["setting values", "whether to reload after saving"],
        rule:
          "If the plugin changes security posture, external connectivity, or generated public URLs, explain the effect before saving new values.",
      },
      {
        operation: "Set up terminal governance",
        explain:
          "Terminal Governance and RealtimeX AI Gateway back the governed terminal-agent dashboard, launch context, and local proxy behavior.",
        requiredInputs: ["target plugin or terminal-agent scope"],
        optionalInputs: ["proxy host", "proxy port", "default execution provider"],
        rule:
          "Use Settings > Terminal Agents for inspection and Settings > Plugins for the backing plugin configuration. Explain the relationship between Terminal Governance and RealtimeX AI Gateway before changing governed runtime settings when the user seems unsure.",
      },
      {
        operation: "Configure public exposure",
        explain:
          "RealtimeX Public Exposure controls generated workspace-share, embed, and artifact URLs.",
        requiredInputs: ["which public route should be enabled or disabled"],
        optionalInputs: ["whether to request a fresh URL", "prefer familiar app id"],
        rule:
          "If the user asks why a workspace share or artifact URL is unavailable, explain the Public Exposure plugin first. If they clearly request a route change, act.",
      },
      {
        operation: "Track durable work as a goal",
        explain:
          "The Goals & Ambient Dashboard tracks work that should survive beyond one chat turn, thread, or terminal session.",
        requiredInputs: ["goal summary or source thread/session"],
        optionalInputs: ["target workspace", "monitoring mode", "cadence"],
        rule:
          "If the request is about long-lived follow-up rather than scheduler configuration, route the user to the Ambient Agent workspace home instead of the settings page.",
      },
    ],
    controlPath: {
      preferredSkill: "realtimex-moderator-sdk",
      cli: "realtimex-pp-cli",
      guidance:
        "Use the RealTimeX control path for RealTimeX operations. When the environment exposes the realtimex-moderator-sdk skill or realtimex-pp-cli, prefer that path to inspect and change workspaces, threads, default agents, heartbeats, personalities, working directories, channels, goals, and artifacts.",
    },
    sourceDocs: listRealtimeXLiteSourceDocs(),
  };
}

export function renderRealtimeXLiteMarkdown(docs = {}) {
  const lines = [
    "<!-- Generated from public/data/realtimex-lite.v1.json. Do not edit by hand. -->",
    "",
    "# RealTimeX Lite",
    "",
    `- Generated: ${normalizeText(docs.generatedAt) || "unknown"}`,
    `- Updated: ${normalizeText(docs.updatedAt) || "unknown"}`,
    `- Schema Version: ${docs.schemaVersion || REALTIMEX_LITE_SCHEMA_VERSION}`,
    "",
    "## How To Use This Guide",
    "",
    normalizeText(docs.readFirst) || "",
    "",
    "## What RealTimeX Is",
    "",
    normalizeText(docs.summary) || "",
    "",
    "## What Ambient Agent Should Do",
    "",
  ];

  for (const item of docs.ambientAgentMission || []) {
    if (item) lines.push(`- ${item}`);
  }

  lines.push("", "## Core Concepts", "");
  for (const concept of docs.coreConcepts || []) {
    if (!concept?.term || !concept?.meaning) continue;
    lines.push(`- **${concept.term}**: ${concept.meaning}`);
  }

  lines.push("", "## Main Surfaces", "");
  for (const surface of docs.mainSurfaces || []) {
    if (!surface?.surface || !surface?.purpose) continue;
    lines.push(`- **${surface.surface}**: ${surface.purpose}`);
  }

  lines.push("", "## Explain First Vs Act", "", "Explain first when:");
  for (const item of docs?.explainVsAct?.explainFirst || []) {
    if (item) lines.push(`- ${item}`);
  }

  lines.push("", "Act when:");
  for (const item of docs?.explainVsAct?.actWhen || []) {
    if (item) lines.push(`- ${item}`);
  }

  lines.push("", "## Common Operations", "");
  for (const operation of docs.commonOperations || []) {
    if (!operation?.operation) continue;
    lines.push(`### ${operation.operation}`, "");
    if (operation.explain) lines.push(operation.explain, "");

    if (Array.isArray(operation.requiredInputs)) {
      lines.push("Required inputs:");
      for (const value of operation.requiredInputs) {
        if (value) lines.push(`- ${value}`);
      }
      lines.push("");
    }

    if (Array.isArray(operation.optionalInputs)) {
      lines.push("Optional inputs:");
      for (const value of operation.optionalInputs) {
        if (value) lines.push(`- ${value}`);
      }
      lines.push("");
    }

    if (operation.rule) lines.push(`Rule: ${operation.rule}`, "");
  }

  lines.push(
    "## RealTimeX Control Path",
    "",
    `- Preferred skill: ${normalizeText(docs?.controlPath?.preferredSkill) || "realtimex-moderator-sdk"}`,
    `- CLI: ${normalizeText(docs?.controlPath?.cli) || "realtimex-pp-cli"}`,
    `- Guidance: ${normalizeText(docs?.controlPath?.guidance) || ""}`,
    "",
    "## Source Pages",
    ""
  );

  for (const sourceDoc of docs.sourceDocs || []) {
    if (!sourceDoc?.title || !sourceDoc?.docsUrl) continue;
    const summary = normalizeText(sourceDoc.description);
    const line = summary
      ? `- [${sourceDoc.title}](${sourceDoc.docsUrl}): ${summary}`
      : `- [${sourceDoc.title}](${sourceDoc.docsUrl})`;
    lines.push(line);
  }

  lines.push("");
  return lines.join("\n");
}

export function writeRealtimeXLiteArtifacts({
  generatedAt = new Date().toISOString(),
} = {}) {
  const docs = buildRealtimeXLite({ generatedAt });
  const markdown = renderRealtimeXLiteMarkdown(docs);

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(JSON_OUTPUT_PATH, `${JSON.stringify(docs, null, 2)}\n`, "utf8");
  fs.writeFileSync(MARKDOWN_OUTPUT_PATH, `${markdown}\n`, "utf8");

  return {
    docs,
    markdown,
    jsonPath: JSON_OUTPUT_PATH,
    markdownPath: MARKDOWN_OUTPUT_PATH,
  };
}
