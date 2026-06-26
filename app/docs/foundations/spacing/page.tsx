import { Card } from "@/primitives/card"

export default function SpacingPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Spacing</h1>
        <p className="text-lg text-muted-foreground">
          4px base unit scale for consistent layouts.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Scale</h2>
        <div className="space-y-3">
          {[
            { class: 'p-1', value: '4px' },
            { class: 'p-2', value: '8px' },
            { class: 'p-3', value: '12px' },
            { class: 'p-4', value: '16px' },
            { class: 'p-6', value: '24px' },
            { class: 'p-8', value: '32px' },
          ].map((item) => (
            <Card key={item.class} className="p-4 flex justify-between items-center">
              <code className="text-sm">{item.class}</code>
              <span className="text-sm text-muted-foreground">{item.value}</span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
