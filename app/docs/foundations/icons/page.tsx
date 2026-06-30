"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { FoundationViewer } from "@/app/docs/_components/foundation-viewer"
import { iconCategories } from "@/ui/foundations"
import * as LucideIcons from "lucide-react"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "categories", title: "Categories" },
  { id: "gallery", title: "Gallery" },
  { id: "usage", title: "Usage" },
]

export default function IconsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Icons"
        description="Lucide React icon library. 8 categories, size presets, semantic color mappings."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI uses Lucide React for all icons. Icons are categorized for easy discovery and support size/color presets.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📍 <strong>Source:</strong> <code className="bg-muted px-2 py-1 rounded">ui/foundations/icons.ts</code></p>
          <p>🎨 <strong>Library:</strong> Lucide React (24x24 stroke-based)</p>
          <p>🏷️ <strong>Categories:</strong> 8 semantic groups (navigation, finance, actions, utility, communication, content, technology, ai)</p>
          <p>📏 <strong>Sizes:</strong> 7 presets (xs: 12px → 3xl: 48px)</p>
          <p>🎯 <strong>Colors:</strong> Semantic token mappings (default, primary, success, warning, error, info)</p>
        </div>
      </DocsSection>

      <DocsSection id="categories" title="Categories">
        <p className="text-muted-foreground mb-6">
          Icons organized by purpose for intuitive selection.
        </p>
        <FoundationViewer type="icons" />
      </DocsSection>

      <DocsSection id="gallery" title="Gallery">
        <p className="text-muted-foreground mb-6">
          Browse all icon categories with visual preview.
        </p>
        <div className="space-y-8">
          {Object.entries(iconCategories).map(([category, icons]) => (
            <div key={category}>
              <h4 className="font-semibold capitalize mb-4 text-sm">{category}</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {Object.entries(icons).map(([key, iconName]) => {
                  const Icon = (LucideIcons as any)[iconName]
                  return (
                    <div key={key} className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                      {Icon && <Icon size={24} className="text-primary" />}
                      <span className="text-xs text-center text-muted-foreground truncate w-full">{key}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Import and use Lucide icons with size/color presets.
        </p>
        <CodeBlock code={`import { ChevronDown, Star, AlertCircle } from "lucide-react"
import { iconSizes, iconColors } from "@/ui/foundations"

// Basic icon
<Star />

// With size preset
<Star className={iconSizes.lg} />

// With semantic color
<Star className={iconColors.primary} />

// Combined
<ChevronDown className={\`\${iconSizes.md} \${iconColors.success}\`} />

// In components
<button className="flex items-center gap-2">
  <ChevronDown className={iconSizes.sm} />
  Menu
</button>`} />
      </DocsSection>
    </DocsPage>
  )
}
