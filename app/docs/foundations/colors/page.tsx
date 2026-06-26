import { Card } from "@/components/primitives/card"

export default function ColorsPage() {
  const colors = [
    { name: "primary", light: "oklch(0.488 0.243 264.376)", dark: "oklch(0.424 0.199 265.638)", usage: "Primary actions, CTAs, links" },
    { name: "secondary", light: "oklch(0.967 0.001 286.375)", dark: "oklch(0.274 0.006 286.033)", usage: "Secondary actions" },
    { name: "destructive", light: "oklch(0.577 0.245 27.325)", dark: "oklch(0.704 0.191 22.216)", usage: "Errors, danger actions" },
    { name: "muted", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)", usage: "Disabled, inactive states" },
    { name: "accent", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)", usage: "Emphasis, highlights" },
  ]

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Colors</h1>
        <p className="text-lg text-muted-foreground">
          Semantic color tokens using OKLCH color space. Automatically adapt to light and dark modes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Semantic Tokens</h2>
        <div className="space-y-3">
          {colors.map((color) => (
            <Card key={color.name} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg border border-border" style={{ backgroundColor: `hsl(from ${color.light} h s l)` }} />
                  <div>
                    <div className="font-mono font-semibold">--{color.name}</div>
                    <p className="text-sm text-muted-foreground">{color.usage}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>Light: {color.light}</div>
                  <div>Dark: {color.dark}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto">
{`// CSS Variables
<div style={{ backgroundColor: 'var(--primary)' }}>
  Content
</div>

// Tailwind Classes
<div className="bg-primary text-primary-foreground">
  Content
</div>`}
          </pre>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Dark Mode</h2>
        <p className="text-muted-foreground">
          Colors automatically switch when <code className="bg-muted px-2 py-1 rounded text-sm">.dark</code> class is applied.
        </p>
        <Card className="p-4">
          <pre className="text-sm overflow-x-auto">
{`<html className="dark">
  {/* All colors switch automatically */}
</html>`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
