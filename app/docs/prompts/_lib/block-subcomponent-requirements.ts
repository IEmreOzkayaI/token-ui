/** Shared block sub-component requirements for Token UI screen/block prompts. */

export const BLOCK_SUBCOMPONENT_REGISTRY_EXAMPLE = `{
  slug: "station-sales-dashboard",
  label: "Station Sales Dashboard",
  baseHref: "/docs/ui/blocks/station-sales-dashboard",
  blockFolder: "ui/blocks/station-sales-dashboard",
  subcomponents: [
    {
      slug: "KpiStrip",
      label: "KpiStrip",
      description: "Four StatCards: total revenue, liters, station count, top product.",
      sourcePath: "ui/blocks/station-sales-dashboard/_components/kpi-strip.tsx",
      importPath: "@/ui/blocks/station-sales-dashboard/_components/kpi-strip",
      usageCode: \`import { KpiStrip } from "@/ui/blocks/station-sales-dashboard/_components/kpi-strip"

<KpiStrip totalRevenue={totalRevenue} totalLiters={totalLiters} stationCount={stationCount} topProduct={topProduct} currency="TRY" />\`,
      propsDoc: \`totalRevenue, totalLiters, stationCount, topProduct, currency?\`,
    },
  ],
}`

/** Core file structure and registry requirements — always required when building blocks. */
export const BLOCK_SUBCOMPONENT_STRUCTURE_SECTION = `
---

BLOCK SUB-COMPONENTS (REQUIRED):

Every screen block MUST be decomposed into _components/ and documented at the sub-component level.

File structure (ui/blocks/{block-slug}/):
- _components/*.tsx — one file per layout section; PascalCase named export per file
- demo-props.ts — mock props keyed by camelCase id for EACH _components/ export (derive from mock-data.ts)
- subcomponent-demos/{ComponentName}.tsx — isolated demo per export (import from ../_components/ + ../demo-props)
- Root orchestrator, types.ts, utils.ts, mock-data.ts, default.tsx, demo.tsx, loading.tsx, empty.tsx

For EACH exported component in _components/:
1. Add mock props entry in demo-props.ts
2. Create subcomponent-demos/{ExportName}.tsx with default export wrapping the component
3. Register in app/docs/_lib/block-subcomponents.ts — slug MUST be PascalCase export name (e.g. KpiStrip, DashboardToolbar)
4. Register demo import in app/docs/_components/block-subcomponent-demo-map.tsx (blockSlug → { ExportName: DemoComponent })
5. Sub-component docs routes are automatic via app/docs/ui/blocks/[blockSlug]/[part]/page.tsx once registry is complete

Registry (app/docs/_lib/block-subcomponents.ts):
- Append BlockDocsEntry to blockDocsRegistry with slug, label, baseHref, blockFolder, subcomponents[]
- Each subcomponent entry: slug, label, description, sourcePath, importPath, usageCode, propsDoc
- Nested sidebar nav is automatic — blockDocsToNavItems() in app/docs/_lib/nav.ts reads the registry

Example registry entry:
${BLOCK_SUBCOMPONENT_REGISTRY_EXAMPLE}

Self-verify before returning:
- Every _components/ export has demo-props key, subcomponent-demos file, registry entry, and demo-map entry
- PascalCase slugs match export names exactly
- No orphan _components/ files without docs registration`

/** Docs-page requirements appended when "Include docs" is enabled on block prompts. */
export function getBlockSubcomponentDocsSection(blockSlug: string) {
  return `
---

ALSO GENERATE DOCUMENTATION:

Root block docs: app/docs/ui/blocks/${blockSlug}/page.tsx

1. BlockExample demos for default.tsx, demo.tsx, loading.tsx, empty.tsx
2. Sub-components section (id="sub-components"): getBlockDocs("${blockSlug}") → link grid to each /docs/ui/blocks/${blockSlug}/{ComponentName}
3. TOC includes Overview, Sub-components, Usage, Examples, Props, Data Shape, Best Practices
4. Each sub-component page is served by BlockSubcomponentDocsPage via the dynamic route — no per-part page.tsx files needed; registry drives content (Overview, Usage, Example, Props, full Source)

Return: all block files + demo-props + subcomponent-demos/ + block-subcomponents.ts registry entry + block-subcomponent-demo-map.tsx entries + root docs page.`
}

/** Block-specific documentation guidelines for the documentation prompt. */
export const BLOCK_DOCUMENTATION_GUIDELINES_SECTION = `
---

BLOCK DOCUMENTATION (when component_path is ui/blocks/{block-slug}/):

Location: app/docs/ui/blocks/{block-slug}/page.tsx (NOT app/docs/ui/components/)

Follow the established block docs pattern:
1. BlockExample for default/demo/loading/empty variants
2. Sub-components section linking to each child via getBlockDocs() registry entries
3. Register ALL _components/ exports in app/docs/_lib/block-subcomponents.ts (PascalCase slugs)
4. Register subcomponent-demos in app/docs/_components/block-subcomponent-demo-map.tsx
5. demo-props.ts + subcomponent-demos/{ComponentName}.tsx for each _components/ export
6. Child pages: app/docs/ui/blocks/[blockSlug]/[part]/page.tsx reads registry — ensure every subcomponent is registered

For sub-component-only doc updates, ensure registry entry has accurate description, usageCode, and propsDoc.`

/** Demo-generation path hint when creating block sub-component demos. */
export const BLOCK_SUBCOMPONENT_DEMO_LOCATION_NOTE = `
Block sub-component demo location (when demo targets a block _components/ export):
- Path: ui/blocks/{block-slug}/subcomponent-demos/{ComponentName}.tsx
- Import component from ../_components/{kebab-file} and props from ../demo-props
- Register import in app/docs/_components/block-subcomponent-demo-map.tsx
- Ensure matching registry entry exists in app/docs/_lib/block-subcomponents.ts`
