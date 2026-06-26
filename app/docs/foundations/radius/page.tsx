import { Card } from "@/components/primitives/card"

export default function RadiusPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Border Radius</h1>
        <p className="text-lg text-muted-foreground">
          7-level scale with 4.5px base.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Scale</h2>
        <div className="space-y-3">
          {[
            { class: 'rounded-sm', desc: 'Small' },
            { class: 'rounded-md', desc: 'Medium' },
            { class: 'rounded-lg', desc: 'Large' },
            { class: 'rounded-xl', desc: 'Extra Large' },
            { class: 'rounded-full', desc: 'Full' },
          ].map((item) => (
            <Card key={item.class} className="p-4 flex justify-between items-center">
              <code className="text-sm">{item.class}</code>
              <span className="text-sm text-muted-foreground">{item.desc}</span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
