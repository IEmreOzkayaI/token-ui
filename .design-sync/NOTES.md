# Design Sync Status

## Current State
- Project created: `b059ca30-4261-4b0b-a457-e5215c47f117` ("token-ui-demo Design System")
- Config pinned to `.design-sync/config.json`
- **Sync paused** — waiting on library structure

## What Happened
Converter attempted to extract components from source but found 0 exports. Root cause: this is a Next.js showcase app (`app/` + internal docs site), not a published library. The converter's TypeScript parser couldn't resolve the re-export chain in `ui/index.ts → ui/primitives → individual files`.

## Path Forward

### Option 1: Create a Library Build (Recommended)
Add a build step to output components as a standalone library:

```json
// package.json addition
{
  "scripts": {
    "build:lib": "tsup --entry.index=ui/index.ts --format esm,cjs --dts --outDir dist"
  }
}
```

Then sync from `dist/` on re-run. This becomes your source of truth for external consumption.

### Option 2: Manual Component Mapping (Workaround)
I configure `componentSrcMap` in `.design-sync/config.json` explicitly pointing to each component file (e.g., `"Button": "ui/primitives/button.tsx"`). Converter will then find them individually. Slower but avoids build step.

### Option 3: Storybook / Docs
If you add Storybook or structured docs with live previews, switch shape to `'storybook'` and sync from there.

## When Ready
1. Choose an option above
2. Message `/design-sync` again
3. Sync will pick up the pinned project (no new project created) and upload to the existing one

## Files Created
- `.design-sync/config.json` (committed) — project ID pinned
- `.ds-sync/` (gitignored) — converter scripts + deps
- `ds-bundle/` (gitignored) — build attempt output

To re-run: just change the structure (add a build, add storybook, or implement component mapping) and call `/design-sync` again.
