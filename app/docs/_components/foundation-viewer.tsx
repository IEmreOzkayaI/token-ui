"use client"

import {
  colorTokens,
  semanticColors,
  intentColors,
  fontSizes,
  fontWeights,
  spacing,
  shadows,
  borderRadius,
  iconCategories,
  iconSizes,
} from "@/ui/foundations"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import * as LucideIcons from "lucide-react"

type ViewerType = "colors" | "typography" | "spacing" | "shadows" | "radius" | "icons"

interface FoundationViewerProps {
  type: ViewerType
  title?: string
  description?: string
}

const PremiumColorSwatch = ({ name, light, dark, description }: any) => {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (value: string, id: string) => {
    navigator.clipboard.writeText(value)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="group">
      <div className="mb-4 rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
        <div
          className="h-28 flex items-end justify-end p-3 relative group/light"
          style={{ backgroundColor: light }}
        >
          <div className="absolute inset-0 opacity-0 group-hover/light:opacity-100 transition-opacity bg-black/5 flex items-center justify-center">
            <button
              onClick={() => copy(light, `${name}-light`)}
              className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-all"
              title="Copy"
            >
              {copied === `${name}-light` ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-foreground" />
              )}
            </button>
          </div>
        </div>

        <div
          className="h-28 flex items-end justify-end p-3 relative group/dark"
          style={{ backgroundColor: dark }}
        >
          <div className="absolute inset-0 opacity-0 group-hover/dark:opacity-100 transition-opacity bg-white/10 flex items-center justify-center">
            <button
              onClick={() => copy(dark, `${name}-dark`)}
              className="p-2 bg-gray-900/90 hover:bg-gray-900 rounded-lg shadow-md transition-all"
            >
              {copied === `${name}-dark` ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-sm leading-tight">{name}</h4>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground block">Light</span>
            <code className="text-xs bg-muted px-2 py-1 rounded font-mono block truncate">{light}</code>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground block">Dark</span>
            <code className="text-xs bg-muted px-2 py-1 rounded font-mono block truncate">{dark}</code>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FoundationViewer({ type, title, description }: FoundationViewerProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id?: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id || text)
    setTimeout(() => setCopied(null), 2000)
  }

  if (type === "colors") {
    return (
      <div className="space-y-12">
        {/* Semantic Roles */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-foreground">Semantic Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PremiumColorSwatch
              name="Primary"
              light={colorTokens.primary.light}
              dark={colorTokens.primary.dark}
              description="Brand color"
            />
            <PremiumColorSwatch
              name="Secondary"
              light={colorTokens.secondary.light}
              dark={colorTokens.secondary.dark}
              description="Supporting"
            />
            <PremiumColorSwatch
              name="Accent"
              light={colorTokens.accent.light}
              dark={colorTokens.accent.dark}
              description="Highlights"
            />
            <PremiumColorSwatch
              name="Destructive"
              light={colorTokens.destructive.light}
              dark={colorTokens.destructive.dark}
              description="Errors"
            />
            <PremiumColorSwatch
              name="Muted"
              light={colorTokens.muted.light}
              dark={colorTokens.muted.dark}
              description="Secondary"
            />
            <PremiumColorSwatch
              name="Border"
              light={colorTokens.border.light}
              dark={colorTokens.border.dark}
              description="Dividers"
            />
          </div>
        </div>

        {/* Backgrounds */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-foreground">Backgrounds</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PremiumColorSwatch
              name="Background"
              light={colorTokens.background.light}
              dark={colorTokens.background.dark}
              description="Page bg"
            />
            <PremiumColorSwatch
              name="Card"
              light={colorTokens.card.light}
              dark={colorTokens.card.dark}
              description="Containers"
            />
            <PremiumColorSwatch
              name="Popover"
              light={colorTokens.popover.light}
              dark={colorTokens.popover.dark}
              description="Floats"
            />
          </div>
        </div>

        {/* Charts */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-foreground">Data Viz</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="group">
                <div className="mb-3 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div
                    className="h-24"
                    style={{ backgroundColor: colorTokens.chart[num as keyof typeof colorTokens.chart] }}
                  />
                </div>
                <h4 className="font-semibold text-sm">Chart {num}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border rounded-lg">
          <p className="text-xs text-muted-foreground">📍 <code>ui/foundations/colors.ts</code></p>
        </div>
      </div>
    )
  }

  if (type === "typography") {
    return (
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-bold mb-8">Type Scale</h3>
          <div className="space-y-6">
            {Object.entries(fontSizes).map(([key, size]) => (
              <div key={key} className="border-b pb-4 last:border-0">
                <div className="flex items-baseline gap-4 mb-2">
                  <span style={{ fontSize: size }} className="font-bold">
                    {key}
                  </span>
                  <code className="text-xs text-muted-foreground">{size}</code>
                </div>
                <div style={{ fontSize: size }} className="text-muted-foreground">
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-8">Font Weights</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(fontWeights).map(([name, weight]) => (
              <div key={name} className="space-y-2">
                <div style={{ fontWeight: weight }} className="text-lg">
                  Sample Text
                </div>
                <div className="text-xs text-muted-foreground">
                  <div className="capitalize">{name}</div>
                  <code>{weight}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border rounded-lg">
          <p className="text-xs text-muted-foreground">📍 <code>ui/foundations/typography.ts</code></p>
        </div>
      </div>
    )
  }

  if (type === "spacing") {
    return (
      <div className="space-y-8">
        <h3 className="text-xl font-bold">Spacing Scale (4px base)</h3>
        <div className="space-y-4">
          {Object.entries(spacing).slice(0, 20).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 group">
              <div className="w-20 text-sm font-mono">{key}</div>
              <div className="bg-gradient-to-r from-primary to-accent h-8 rounded flex-1" style={{ width: value }} />
              <div className="text-xs text-muted-foreground min-w-16 text-right">{value}</div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border rounded-lg">
          <p className="text-xs text-muted-foreground">📍 <code>ui/foundations/spacing.ts</code></p>
        </div>
      </div>
    )
  }

  if (type === "shadows") {
    return (
      <div className="space-y-8">
        <h3 className="text-xl font-bold">Shadow Elevations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(shadows).map(([name, shadow]) => (
            <div key={name} className="space-y-3">
              <p className="text-sm font-semibold capitalize">{name}</p>
              <div
                className="h-32 bg-card rounded-lg border transition-all hover:scale-105"
                style={{ boxShadow: shadow }}
              />
              <code className="text-xs text-muted-foreground block">{shadow}</code>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border rounded-lg">
          <p className="text-xs text-muted-foreground">📍 <code>ui/foundations/shadows.ts</code></p>
        </div>
      </div>
    )
  }

  if (type === "radius") {
    return (
      <div className="space-y-8">
        <h3 className="text-xl font-bold">Border Radius Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(borderRadius).map(([name, radius]) => (
            <div key={name} className="space-y-3">
              <div
                className="w-full h-24 bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 hover:border-primary/60 transition-all"
                style={{ borderRadius: radius }}
              />
              <div className="text-xs">
                <div className="font-semibold">{name}</div>
                <code className="text-muted-foreground">{radius}</code>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border rounded-lg">
          <p className="text-xs text-muted-foreground">📍 <code>ui/foundations/radius.ts</code></p>
        </div>
      </div>
    )
  }

  if (type === "icons") {
    return (
      <div className="space-y-8">
        <h3 className="text-xl font-bold">Icon Categories</h3>
        <div className="space-y-8">
          {Object.entries(iconCategories).map(([category, icons]) => (
            <div key={category}>
              <h4 className="font-bold capitalize mb-4 text-lg">{category}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(icons).map(([key, iconName]) => {
                  const Icon = (LucideIcons as any)[iconName]
                  return (
                    <div key={key} className="p-4 rounded-lg border hover:bg-muted hover:shadow-md transition-all group">
                      {Icon && <Icon size={24} className="text-primary mb-2" />}
                      <div className="text-xs space-y-1">
                        <div className="font-mono font-semibold">{key}</div>
                        <div className="text-muted-foreground">{iconName}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border rounded-lg">
          <p className="text-xs text-muted-foreground">📍 <code>ui/foundations/icons.ts</code> (Lucide React)</p>
        </div>
      </div>
    )
  }

  return null
}
