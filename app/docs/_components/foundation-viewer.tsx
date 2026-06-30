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

type ViewerType = "colors" | "typography" | "spacing" | "shadows" | "radius" | "icons"

interface FoundationViewerProps {
  type: ViewerType
  title?: string
  description?: string
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
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Primary Color</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Light Mode</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-lg border"
                  style={{ backgroundColor: colorTokens.primary.light }}
                />
                <div className="space-y-1">
                  <code className="text-xs">{colorTokens.primary.light}</code>
                  <button
                    onClick={() => copyToClipboard(colorTokens.primary.light, "primary-light")}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    {copied === "primary-light" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Dark Mode</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-lg border"
                  style={{ backgroundColor: colorTokens.primary.dark }}
                />
                <div className="space-y-1">
                  <code className="text-xs">{colorTokens.primary.dark}</code>
                  <button
                    onClick={() => copyToClipboard(colorTokens.primary.dark, "primary-dark")}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    {copied === "primary-dark" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Semantic Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(semanticColors).map(([name, color]) => (
              <div key={name}>
                <p className="text-xs font-medium text-muted-foreground mb-2 capitalize">{name}</p>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-lg border" style={{ backgroundColor: color }} />
                  <div className="space-y-1">
                    <code className="text-xs block">{color}</code>
                    <button
                      onClick={() => copyToClipboard(color, `color-${name}`)}
                      className="text-xs text-primary hover:underline"
                    >
                      {copied === `color-${name}` ? <Check className="w-3 h-3 inline" /> : <Copy className="w-3 h-3 inline" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
          📍 Source: <code>ui/foundations/colors.ts</code>
        </div>
      </div>
    )
  }

  if (type === "typography") {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Type Scale</h3>
          <div className="space-y-4">
            {Object.entries(fontSizes).map(([key, size]) => (
              <div key={key} className="border-b pb-3 last:border-0">
                <div style={{ fontSize: size }} className="font-semibold mb-1">
                  {key}
                </div>
                <div className="text-xs text-muted-foreground">
                  <code>{size}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Font Weights</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(fontWeights).map(([name, weight]) => (
              <div key={name}>
                <div style={{ fontWeight: weight }}>Example Text</div>
                <div className="text-xs text-muted-foreground">
                  {name}: {weight}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
          📍 Source: <code>ui/foundations/typography.ts</code>
        </div>
      </div>
    )
  }

  if (type === "spacing") {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Spacing Scale</h3>
          <div className="space-y-3">
            {Object.entries(spacing).slice(0, 20).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium">{key}</div>
                <div className="bg-primary h-8 rounded" style={{ width: value }} />
                <div className="text-xs text-muted-foreground">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
          📍 Source: <code>ui/foundations/spacing.ts</code>
        </div>
      </div>
    )
  }

  if (type === "shadows") {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Shadow Elevations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(shadows).map(([name, shadow]) => (
              <div key={name}>
                <p className="text-sm font-medium mb-2 capitalize">{name}</p>
                <div
                  className="h-24 bg-card rounded-lg border"
                  style={{ boxShadow: shadow }}
                />
                <code className="text-xs text-muted-foreground block mt-2">{shadow}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
          📍 Source: <code>ui/foundations/shadows.ts</code>
        </div>
      </div>
    )
  }

  if (type === "radius") {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Border Radius Scale</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(borderRadius).map(([name, radius]) => (
              <div key={name}>
                <div
                  className="w-full h-20 bg-primary/20 border border-primary/50 mb-2"
                  style={{ borderRadius: radius }}
                />
                <div className="text-xs">
                  <div className="font-medium">{name}</div>
                  <code className="text-muted-foreground">{radius}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
          📍 Source: <code>ui/foundations/radius.ts</code>
        </div>
      </div>
    )
  }

  if (type === "icons") {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Icon Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(iconCategories).map(([category, icons]) => (
              <div key={category}>
                <h4 className="font-medium capitalize mb-2">{category}</h4>
                <div className="space-y-1">
                  {Object.entries(icons).map(([key, iconName]) => (
                    <div key={key} className="text-sm text-muted-foreground">
                      <code>{key}</code>: <span className="text-foreground">{iconName}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
          📍 Source: <code>ui/foundations/icons.ts</code> (Lucide React)
        </div>
      </div>
    )
  }

  return null
}
