"use client"

import { Card } from "@/primitives/card"

export default function V1Page() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">v1.0.0</h1>
        <p className="text-lg text-muted-foreground">June 26, 2025</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Features</h2>
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">55 Radix UI Primitives</h3>
            <p className="text-muted-foreground text-sm">
              Complete set of accessible, composable UI primitives built on Radix UI.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">300+ Component Examples</h3>
            <p className="text-muted-foreground text-sm">
              Real-world usage examples for every primitive from shadcn/ui.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Live Documentation</h3>
            <p className="text-muted-foreground text-sm">
              Interactive docs with preview/code tabs, copy buttons, and API references.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Design Foundations</h3>
            <p className="text-muted-foreground text-sm">
              OKLCH color system, typography, spacing, radius, and shadows.
            </p>
          </div>
        </Card>
      </section>
    </div>
  )
}
