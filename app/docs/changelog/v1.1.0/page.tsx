"use client"

import { Card } from "@/primitives/card"

export default function V11Page() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">v1.1.0</h1>
        <p className="text-lg text-muted-foreground">Coming Soon</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Planned Features</h2>
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Component Library</h3>
            <p className="text-muted-foreground text-sm">
              Pre-built component combinations and patterns.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Version-based Routing</h3>
            <p className="text-muted-foreground text-sm">
              Select versions in docs, all routes redirect accordingly.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Component Registry</h3>
            <p className="text-muted-foreground text-sm">
              Searchable registry of all components and their dependencies.
            </p>
          </div>
        </Card>
      </section>
    </div>
  )
}
