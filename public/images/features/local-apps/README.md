# Guide to Adding Images for Local Apps Documentation

## Directory Structure

```
public/images/features/local-apps/
├── README.md                       (this file)
├── local-apps-overview.png         (Local Apps overview screenshot)
├── settings-page.png               (Settings > Local Apps page screenshot)
├── create-local-app.png            (Create Local App form screenshot)
├── compatible-mode-setup.png       (Supabase setup screenshot)
├── custom-mode-api.png             (API endpoints screenshot)
├── task-calendar.png               (Calendar view with tasks screenshot)
├── realtime-enabled.png            (Enable Realtime screenshot)
└── stale-lock-recovery.png         (pg_cron setup screenshot)
```

## Recommended Image Locations in local-apps.mdx

### 1. After the Introduction Section (Overview Screenshot)

**Location**: After the Local Apps introduction paragraph
**File**: `local-apps-overview.png`
**Recommended size**: 1920x1080px

```jsx
## What is a Local App?

... content ...

<Image
  src="/images/features/local-apps/local-apps-overview.png"
  height={1080}
  width={1920}
  quality={100}
  alt="Local Apps Overview"
/>
```

### 2. System Architecture Section (Workflow Diagram)

**Location**: After the mermaid diagram
**File**: `workflow-diagram.png`
**Note**: You can screenshot the mermaid diagram or create a separate diagram

### 3. Configure in RealTimeX Desktop Section

**Location**: After the "Configure in RealTimeX Desktop" section
**Required files**:
- `settings-page.png` - Settings > Local Apps screenshot
- `create-local-app.png` - Create Local App form screenshot

```jsx
### Configure in RealTimeX Desktop

1. Open **Settings** → **Local Apps**

<Image
  src="/images/features/local-apps/settings-page.png"
  height={1080}
  width={1920}
  quality={100}
  alt="Local Apps Settings Page"
/>

2. Click **Create New Local App**

<Image
  src="/images/features/local-apps/create-local-app.png"
  height={1080}
  width={1920}
  quality={100}
  alt="Create New Local App Form"
/>
```

### 4. Compatible Mode Setup Section

**Location**: After the SQL scripts
**Required files**:
- `supabase-sql-editor.png` - Supabase SQL Editor screenshot
- `realtime-enabled.png` - Enable Realtime screenshot
- `pgcron-setup.png` - pg_cron extension screenshot

### 5. Custom Mode Section

**Location**: Illustrating API endpoints
**File**: `custom-mode-api.png`

### 6. Calendar/Monitoring Section

**Location**: At the end of the document or in the Best Practices section
**File**: `task-calendar.png`

```jsx
### Monitor Your Tasks

- Check the **Calendar** view in RealTimeX to see task events

<Image
  src="/images/features/local-apps/task-calendar.png"
  height={1080}
  width={1920}
  quality={100}
  alt="Task Calendar View"
/>
```

## File Naming Conventions

- Use **kebab-case**: `local-apps-overview.png`
- File names must **clearly describe** the content
- Preferred formats: **PNG** for screenshots, **SVG** for icons/diagrams
- Standard size: **1920x1080px** for full-screen screenshots

## Image Formats

- **PNG**: Screenshots, UI elements (with transparency)
- **JPG**: Photos, no transparency needed
- **SVG**: Icons, logos, simple graphics
- **WebP**: Alternative to PNG/JPG (smaller file size)

## Image Optimization

Before adding images, optimize them:

```bash
# Use ImageOptim (macOS)
# Or online: https://tinypng.com/

# Or use CLI
npm install -g imagemin-cli
imagemin local-apps-overview.png > local-apps-overview-optimized.png
```

## Complete Code Example

```jsx
---
title: "Local Apps"
description: "Connect and automate local applications with AI Agents"
---

import { Callout } from 'nextra/components'
import Image from 'next/image'

# Local Apps

**Local Apps** is a powerful feature...

<Image
  src="/images/features/local-apps/local-apps-overview.png"
  height={1080}
  width={1920}
  quality={100}
  alt="Local Apps Overview"
/>

## Configure in RealTimeX Desktop

1. Open **Settings** → **Local Apps**

<Image
  src="/images/features/local-apps/settings-page.png"
  height={1080}
  width={1920}
  quality={100}
  alt="Settings Page"
/>
```

## Screenshots to Capture

### Priority 1 (Most Important):
- [ ] Settings > Local Apps page
- [ ] Create/Edit Local App form
- [ ] Supabase SQL Editor with SQL scripts
- [ ] Calendar view with tasks

### Priority 2 (Supplementary):
- [ ] Realtime settings in Supabase
- [ ] pg_cron extension setup
- [ ] App status (running/stopped)
- [ ] Task processing workflow

### Priority 3 (Optional):
- [ ] API endpoint examples
- [ ] Error messages/troubleshooting
- [ ] Multi-machine setup example

## Tips for Taking Screenshots

1. **Resolution**: 1920x1080 or 2560x1440 (Retina)
2. **Zoom**: 100% (no scaling)
3. **Theme**: Use light or dark theme (be consistent)
4. **Sample data**: Use meaningful data, not lorem ipsum
5. **Highlights**: Use borders/arrows to point out important parts
6. **Privacy**: Hide API keys, real emails, and sensitive data

## Useful Tools

- **CleanShot X** (macOS): Capture + annotate screenshots
- **ShareX** (Windows): Free screenshot tool
- **Figma**: Create diagrams, mockups
- **Excalidraw**: Hand-drawn diagrams
- **Mermaid Live Editor**: Export mermaid diagrams
