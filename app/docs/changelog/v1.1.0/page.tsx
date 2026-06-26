"use client"

import Link from "next/link"
import { Badge } from "@/primitives/badge"
import { Separator } from "@/primitives/separator"

const planned = [
  {
    title: "Component Library",
    description: "Pre-built UI blocks — auth forms, dashboards, settings pages.",
    status: "In progress",
  },
  {
    title: "Version Routing",
    description: "Pin docs to any release. Compare across versions.",
    status: "Planned",
  },
  {
    title: "Component Registry",
    description: "Search, filter, and install components via CLI.",
    status: "Planned",
  },
]

export default function V110Page() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <Link
          href="/docs/changelog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Changelog
        </Link>

        <div className="mt-3 flex items-center gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight">v1.1.0</h1>
          <Badge variant="outline" className="text-[11px]">Upcoming</Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Coming Soon</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Next-gen tooling — component registry, version routing, and pre-built UI blocks.
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        {planned.map((item) => (
          <div key={item.title}>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <Badge
                variant={item.status === "In progress" ? "secondary" : "outline"}
                className="text-[11px]"
              >
                {item.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
