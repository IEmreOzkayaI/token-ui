import { Card } from "@/primitives/card"

export default function TypographyPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Typography</h1>
        <p className="text-lg text-muted-foreground">
          Font system with semantic scales and weights.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Font Families</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">--font-sans (Body text)</p>
            <div className="font-sans text-lg mt-2">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">--font-mono (Monospace)</p>
            <div className="font-mono text-lg mt-2">console.log('hello world')</div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Text Sizes</h2>
        <div className="space-y-4">
          <div>
            <code className="bg-muted px-2 py-1 rounded text-sm">text-xs</code>
            <p className="text-xs mt-2">Extra small text 12px</p>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded text-sm">text-sm</code>
            <p className="text-sm mt-2">Small text 14px</p>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded text-sm">text-base</code>
            <p className="text-base mt-2">Base text 16px</p>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded text-sm">text-lg</code>
            <p className="text-lg mt-2">Large text 18px</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Font Weights</h2>
        <div className="space-y-3">
          <div>
            <code className="bg-muted px-2 py-1 rounded text-sm">font-normal</code>
            <p className="font-normal mt-2">Normal weight (400)</p>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded text-sm">font-medium</code>
            <p className="font-medium mt-2">Medium weight (500)</p>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded text-sm">font-semibold</code>
            <p className="font-semibold mt-2">Semibold weight (600)</p>
          </div>
          <div>
            <code className="bg-muted px-2 py-1 rounded text-sm">font-bold</code>
            <p className="font-bold mt-2">Bold weight (700)</p>
          </div>
        </div>
      </section>
    </div>
  )
}
