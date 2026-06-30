import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { FoundationViewer } from "@/app/docs/_components/foundation-viewer"
import { iconCategories, iconSizes, iconColors } from "@/ui/foundations"
import * as LucideIcons from "lucide-react"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "categories", title: "Categories" },
  { id: "sizes", title: "Sizes" },
  { id: "colors", title: "Colors" },
  { id: "usage", title: "Usage" },
]

export default function IconsPage() {
  const renderIcon = (iconName: string, size: string = "24") => {
    const Icon = (LucideIcons as any)[iconName]
    if (!Icon) return null
    return <Icon size={parseInt(size)} className="inline" />
  }

  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Icons - Lucide React"
        description="Complete Lucide React icon library integrated with Token UI foundations."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI uses Lucide React for all icons. Icons are categorized for easy discovery and use semantic color mappings from the design system.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            📍 <strong>Library:</strong> <code className="bg-muted px-2 py-1 rounded">lucide-react</code>
          </p>
          <p>
            📚 <strong>Foundation:</strong> <code className="bg-muted px-2 py-1 rounded">ui/foundations/icons.ts</code>
          </p>
          <p>
            🎯 <strong>Categories:</strong> 8 semantic groups (navigation, finance, actions, utility, communication, content, technology, ai)
          </p>
          <p>
            🎨 <strong>Sizing:</strong> 7 presets (xs: 12px → 3xl: 48px)
          </p>
        </div>
      </DocsSection>

      <DocsSection id="categories" title="Icon Categories">
        <p className="text-muted-foreground mb-6">
          Icons organized by purpose for intuitive selection.
        </p>

        <div className="space-y-8">
          {Object.entries(iconCategories).map(([category, icons]) => (
            <div key={category} className="border rounded-lg p-6">
              <h4 className="font-semibold capitalize mb-4 text-lg">{category}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(icons).map(([key, iconName]) => {
                  const Icon = (LucideIcons as any)[iconName]
                  return (
                    <div key={key} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-muted transition-colors">
                      {Icon && <Icon size={24} className="text-primary" />}
                      <div className="text-xs text-center text-muted-foreground space-y-1">
                        <div className="font-mono">{key}</div>
                        <div className="text-xs opacity-70">{iconName}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="sizes" title="Size Presets">
        <p className="text-muted-foreground mb-6">
          7 responsive size options for consistent icon usage.
        </p>

        <div className="space-y-4">
          {Object.entries(iconSizes).map(([name, sizeClass]) => {
            const sizeMap: Record<string, number> = {
              xs: 12,
              sm: 16,
              md: 20,
              lg: 24,
              xl: 32,
              "2xl": 40,
              "3xl": 48,
            }
            const Icon = LucideIcons.Star
            return (
              <div key={name} className="flex items-center gap-4 border rounded-lg p-4">
                <div className="flex items-center justify-center w-16 h-16 bg-muted rounded">
                  <Icon size={sizeMap[name]} className="text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-sm font-semibold">{name}</div>
                  <div className="text-xs text-muted-foreground">
                    <code>{sizeClass}</code> → {sizeMap[name]}px
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </DocsSection>

      <DocsSection id="colors" title="Color Mappings">
        <p className="text-muted-foreground mb-6">
          Icons inherit semantic color tokens for consistent theming.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(iconColors).map(([name, colorClass]) => {
            const Icon = LucideIcons.Star
            return (
              <div key={name} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`${colorClass}`} size={24} />
                  <div className="font-mono text-sm">{name}</div>
                </div>
                <code className="text-xs text-muted-foreground block">{colorClass}</code>
              </div>
            )
          })}
        </div>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Import icons directly from lucide-react and apply size/color classes.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Import Icons</h4>
            <CodeBlock
              code={`import { ChevronDown, Star, AlertCircle } from "lucide-react"
import { iconSizes, iconColors } from "@/ui/foundations"`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">Basic Usage</h4>
            <CodeBlock
              code={`// Default icon
<Star />

// With size preset
<Star className={iconSizes.lg} />

// With semantic color
<Star className={iconColors.primary} />

// Combined
<Star className={\`\${iconSizes.md} \${iconColors.success}\`} />`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">In Components</h4>
            <CodeBlock
              code={`export function Button({ variant = "default" }) {
  const iconColor = variant === "primary"
    ? iconColors.primary
    : iconColors.muted

  return (
    <button className="flex items-center gap-2">
      <ChevronDown className={\`\${iconSizes.sm} \${iconColor}\`} />
      Click me
    </button>
  )
}`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">With Tailwind</h4>
            <CodeBlock
              code={`<!-- Direct Tailwind classes -->
<Star className="w-5 h-5 text-primary" />

<!-- Or use foundation size -->
<Search className={iconSizes.md} style={{ color: 'var(--primary)' }} />`}
            />
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-2">Icon Pairs (State Changes)</h4>
            <CodeBlock
              code={`import { iconPairs } from "@/ui/foundations"

export function EyeToggle({ revealed }: { revealed: boolean }) {
  const IconComponent = revealed
    ? LucideIcons[iconPairs.eyeToggle.visible]
    : LucideIcons[iconPairs.eyeToggle.hidden]

  return <IconComponent className={iconSizes.md} />
}`}
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-lg p-4">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <strong>⚡ Pro Tip:</strong> Always use size and color presets from foundations for consistency. Never hardcode sizes like "24px" or colors like "#1a1a1a".
            </p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Reference">
        <p className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
          📍 Source: <code>ui/foundations/icons.ts</code>
          <br />
          📚 Lucide Docs: <a href="https://lucide.dev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">lucide.dev</a>
        </p>
      </DocsSection>
    </DocsPage>
  )
}
