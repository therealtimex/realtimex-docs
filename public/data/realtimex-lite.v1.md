<!-- Generated from public/data/realtimex-lite.v1.json. Do not edit by hand. -->

# RealTimeX Lite

- Generated: 2026-07-09T07:39:39.011Z
- Updated: 2026-07-09
- Schema Version: 1

## How To Use This Guide

Read this guide before answering foundational RealTimeX questions or deciding whether to explain first versus act.

## What RealTimeX Is

RealTimeX is a workspace-based AI product for chat, agents, plugin-backed capabilities, runtime control, governed terminal-agent flows, public exposure, personality files, working directories, channels, goals, and background automation. Ambient Agent is RealTimeX's built-in companion for explaining the product and operating supported RealTimeX setup and control flows on the user's behalf.

## What Ambient Agent Should Do

- Help the user understand and use RealTimeX.
- Explain the relevant RealTimeX concept before acting when the user asks what something is, how it works, or which surface to use.
- When the user clearly requests a RealTimeX change and the required inputs are present, use the RealTimeX control path instead of only describing menus.
- Keep the user in the right surface: settings for configuration, workspace home for goal tracking, and chat for interactive work.

## Core Concepts

- **Workspace**: The main collaboration container in RealTimeX. A workspace holds chats, documents, agent behavior, integrations, and member access for one team or use case.
- **Thread**: A conversation inside one workspace. Users and agents can continue work in the same thread instead of mixing everything into one long workspace chat.
- **Ambient Agent**: The scheduled background agent runner in RealTimeX. It wakes on a schedule, reads HEARTBEAT.md, and decides whether anything needs action.
- **Goals & Ambient Dashboard**: The central board for durable work that should survive beyond one chat turn, one thread, or one terminal session.
- **Default agent**: The preferred agent runtime or terminal agent for a workspace or ambient flow. It decides which agent RealTimeX should launch unless another one is chosen explicitly.
- **Terminal agent**: A CLI-backed runtime such as Claude Code, Codex CLI, Gemini CLI, Qwen CLI, OpenCode, Cursor Agent, or Antigravity CLI that RealTimeX can launch for interactive or background work.
- **HEARTBEAT.md**: The main instruction file for Ambient Agent. It defines what the background agent should monitor, when it should act, and when it should do nothing.
- **Personality**: The file-based instruction layer for agent identity, behavior, memory, and long-lived guidance at shared or workspace scope.
- **Working directory**: A trusted absolute local folder that agents may read or write outside workspace storage without broad filesystem access.
- **Agentic CLI**: An external command-line tool that agents may rely on, such as gh or glab. RealTimeX tracks whether the CLI is installed, authenticated, and ready.
- **Agent Authentication**: The RealTimeX control surface for provider API keys that should be injected into launched agent runtimes automatically.
- **Plugin**: A RealTimeX extension that can add providers, agent skills, runtime behavior, governance, workflow integrations, or admin-facing configuration.
- **Built-in plugin**: A plugin that ships with RealTimeX itself. It can usually be enabled, disabled, configured, or reloaded from Settings > Plugins, but it cannot be uninstalled from the UI.
- **Terminal governance**: The governed terminal-agent layer that reports dashboard status, governance capability, analytics, and sometimes launch context or local proxy behavior through the Terminal Agents surfaces.
- **Public exposure**: The generated public workspace-share, embed, and artifact URL layer controlled by the RealtimeX Public Exposure plugin.

## Main Surfaces

- **Workspace chat**: Interactive work inside one workspace and thread, including chat-linked terminal sessions and @agent flows.
- **Settings > Admin > Workspaces**: Create instance workspaces, open them quickly, and manage who belongs to each one.
- **Workspace Settings > Personality**: Edit file-based instructions, identity, and memory for a specific workspace.
- **Settings > Agentic CLIs**: Register external CLIs, probe readiness, and expose them to RealTimeX agents safely.
- **Settings > Agents > Working Directories**: Register trusted absolute paths that agents may use outside workspace storage.
- **Settings > Agents > Agent Authentication**: Store provider API keys that RealTimeX injects into launched agent runtimes automatically.
- **Settings > Plugins**: Enable, disable, configure, reload, and inspect built-in or installed plugins that extend RealTimeX behavior.
- **Settings > Terminal Agents**: Inspect governed terminal-agent catalog status, analytics, and local proxy behavior while using plugin-backed governance data when available.
- **Settings > Agents > Ambient Agent**: Configure scheduler behavior, execution agent, interval, timezone, active hours, HEARTBEAT.md, and calendar-aware routines for background runs.
- **Ambient Agent workspace home**: The cross-workspace goal board for durable work, follow-up, and ambient monitoring.
- **Agent feed**: Operational view of in-progress, failed, and completed agent work across the system.

## Explain First Vs Act

Explain first when:
- The user asks what a RealTimeX feature is.
- The user asks how to do something in RealTimeX.
- The user is unsure which RealTimeX surface they should use.
- A mutating action is missing required inputs.

Act when:
- The user clearly requests a RealTimeX change such as create, rename, set, connect, enable, disable, or delete.
- The required inputs for that operation are present or have been confirmed.

## Common Operations

### Create workspace

A workspace is the main collaboration area for one team or use case.

Required inputs:
- workspace name

Optional inputs:
- member assignment timing

Rule: If the user asks what a workspace is, explain first. If they ask to create one and provide a name, act.

### Set up personality

Personality is the file-based instruction layer for durable behavior, identity, and memory.

Required inputs:
- target scope
- desired behavior or instruction goal

Optional inputs:
- draft files
- shared vs workspace preference

Rule: Use Personality for durable behavior and identity, not reference knowledge. If the user is unsure, explain Personality versus knowledge files before editing.

### Set up working directory

A working directory is a trusted absolute local path for agent work outside workspace chat storage.

Required inputs:
- absolute directory path

Optional inputs:
- description
- workspace scope
- agent scope

Rule: If the user asks how to set one up, explain it first and ask for the absolute path. Do not set it up until that path is provided.

### Set default or execution agent

The default or execution agent determines which runtime RealTimeX should prefer for a workspace flow or an Ambient Agent run.

Required inputs:
- target scope
- agent or runtime choice

Optional inputs:
- model choice

Rule: Confirm the scope and runtime when they are ambiguous before changing them.

### Register an agentic CLI

Agentic CLIs let RealTimeX know which external command-line tools are installed, authenticated, and allowed for agent use.

Required inputs:
- CLI binary or absolute executable path

Optional inputs:
- auth command
- version probe
- install docs URL
- skill hint

Rule: RealTimeX does not install or log in the CLI for the user. If the CLI is missing or unauthenticated, explain that distinction before claiming it is ready.

### Add runtime auth

Agent Authentication stores provider API keys that RealTimeX injects into launched runtimes automatically.

Required inputs:
- target runtime profile
- matching API key or provider slot

Optional inputs:

Rule: Use Agent Authentication when the runtime itself needs a provider key. Do not treat Credentials storage or CLI login state as equivalent.

### Set up Ambient Agent

Ambient Agent is the scheduled background runner for recurring work and follow-up.

Required inputs:
- execution agent choice
- schedule intent
- HEARTBEAT.md behavior

Optional inputs:
- timezone
- active hours
- task blocks
- calendar routine

Rule: If the user is unsure whether they need Ambient Agent settings or the Goals & Ambient Dashboard, explain the difference before editing.

### Enable or disable a built-in plugin

Built-in plugins ship with RealTimeX and are managed from Settings > Plugins.

Required inputs:
- plugin name
- desired enabled or disabled state

Optional inputs:
- whether configuration should happen now

Rule: If the user asks what the plugin does, explain the plugin first. If they clearly ask to enable or disable a named plugin, act.

### Configure plugin settings

Plugin configuration stores provider keys, policy rules, workflow files, local paths, or runtime settings for one plugin.

Required inputs:
- plugin name

Optional inputs:
- setting values
- whether to reload after saving

Rule: If the plugin changes security posture, external connectivity, or generated public URLs, explain the effect before saving new values.

### Set up terminal governance

Terminal Governance and RealtimeX AI Gateway back the governed terminal-agent dashboard, launch context, and local proxy behavior.

Required inputs:
- target plugin or terminal-agent scope

Optional inputs:
- proxy host
- proxy port
- default execution provider

Rule: Use Settings > Terminal Agents for inspection and Settings > Plugins for the backing plugin configuration. Explain the relationship between Terminal Governance and RealtimeX AI Gateway before changing governed runtime settings when the user seems unsure.

### Configure public exposure

RealtimeX Public Exposure controls generated workspace-share, embed, and artifact URLs.

Required inputs:
- which public route should be enabled or disabled

Optional inputs:
- whether to request a fresh URL
- prefer familiar app id

Rule: If the user asks why a workspace share or artifact URL is unavailable, explain the Public Exposure plugin first. If they clearly request a route change, act.

### Track durable work as a goal

The Goals & Ambient Dashboard tracks work that should survive beyond one chat turn, thread, or terminal session.

Required inputs:
- goal summary or source thread/session

Optional inputs:
- target workspace
- monitoring mode
- cadence

Rule: If the request is about long-lived follow-up rather than scheduler configuration, route the user to the Ambient Agent workspace home instead of the settings page.

## RealTimeX Control Path

- Preferred skill: realtimex-moderator-sdk
- CLI: realtimex-pp-cli
- Guidance: Use the RealTimeX control path for RealTimeX operations. When the environment exposes the realtimex-moderator-sdk skill or realtimex-pp-cli, prefer that path to inspect and change workspaces, threads, default agents, heartbeats, personalities, working directories, channels, goals, and artifacts.

## Source Pages

- [What is RealTimeX](https://docs.realtimex.ai/introduction/): RealTimeX makes advanced AI easy. Instantly use RAG, AI agents, and more—no coding or tech headaches required.
- [Workspaces](https://docs.realtimex.ai/workspaces/): Create instance workspaces, open them quickly, and manage who belongs to each one.
- [Personality](https://docs.realtimex.ai/personality/): Manage file-based agent identity, instructions, and memory at the shared or workspace level in RealTimeX.
- [Agent Runtime](https://docs.realtimex.ai/agent-runtime/): Manage the CLIs, folders, schedules, and runtime visibility that power RealTimeX agents.
- [Ambient Agent](https://docs.realtimex.ai/ambient-agent/): Schedule background agent runs, manage HEARTBEAT.md, and track ambient goals in RealTimeX.
- [Goals & Ambient Dashboard](https://docs.realtimex.ai/goals/): Track durable cross-workspace goals, promote chats and terminal sessions, and manage ambient monitoring in RealTimeX.
- [Agentic CLIs](https://docs.realtimex.ai/agentic-clis/): Register external CLI tools, probe their readiness, and expose them to RealTimeX agents safely.
- [Agent Authentication](https://docs.realtimex.ai/agent-authentication/): Store provider API keys that RealTimeX injects into launched agent runtimes such as Claude Code, Codex CLI, Gemini CLI, Qwen, OpenCode, and Ambient Agent.
- [Plugins](https://docs.realtimex.ai/plugins/): Learn how RealTimeX plugins work, which ones ship built in, and how to install and manage them as an end user.
- [Built-In Plugins](https://docs.realtimex.ai/plugins/built-in-plugins/): Review the plugins that ship with RealTimeX and understand which ones are enabled by default.
- [Install & Manage Plugins](https://docs.realtimex.ai/plugins/manage-plugins/): Install new plugins, enable built-in plugins, and manage the lifecycle of plugins in RealTimeX.
- [Configure Plugin Settings](https://docs.realtimex.ai/plugins/configure-plugin-settings/): Understand how plugin settings work in RealTimeX, including secrets, structured fields, and LLM slot configuration.
- [RealtimeX BizOps](https://docs.realtimex.ai/plugins/realtimex-bizops/): Configure the built-in RealtimeX BizOps plugin for email, iMessage, WhatsApp CLI, CRM storage, and workflow-runtime operations.
- [Runtime Auto-Approve](https://docs.realtimex.ai/plugins/runtime-auto-approve/): Learn what the Runtime Auto-Approve plugin does and how to configure its approval policy safely.
- [Terminal Governance](https://docs.realtimex.ai/plugins/terminal-governance/): Understand the built-in Terminal Governance plugin that backs the Terminal Agents dashboard contract in RealTimeX.
- [RealtimeX AI Gateway](https://docs.realtimex.ai/plugins/realtimex-aigateway/): Configure the built-in RealtimeX AI Gateway plugin for governed terminal-agent routing, launch context, and local proxy behavior.
- [RealtimeX Public Exposure](https://docs.realtimex.ai/plugins/realtimex-public-exposure/): Configure the built-in RealtimeX Public Exposure plugin for workspace-share, embed, and artifact hostnames.
- [RealtimeX Loops](https://docs.realtimex.ai/plugins/realtimex-loops/): Configure the built-in RealtimeX Loops plugin for role-based multi-agent workflows with a shared topology and canonical LOOP_COMMS.md contract.
- [Local Apps User Guide](https://docs.realtimex.ai/local-apps/user-guide/): Step-by-step guide to setting up and using Local Apps in RealTimeX
- [Desktop Installation Overview](https://docs.realtimex.ai/installation-desktop/overview/): RealTimeX Desktop is the easiest way to use RealTimeX for most people.

