import { Card } from "@/components/primitives/card"

export default function ShadowsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Shadows</h1>
        <p className="text-lg text-muted-foreground">
          Elevation scale for depth and layering.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Scale</h2>
        <div className="space-y-3">
          {[
            { class: 'shadow-sm', desc: 'Small' },
            { class: 'shadow-md', desc: 'Medium' },
            { class: 'shadow-lg', desc: 'Large' },
            { class: 'shadow-xl', desc: 'Extra Large' },
            { class: 'shadow-2xl', desc: 'Double Extra Large' },
          ].map((item) => (
            <Card key={item.class} className={`p-4 flex justify-between items-center ${item.class}`}>
              <code className="text-sm">{item.class}</code>
              <span className="text-sm text-muted-foreground">{item.desc}</span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
