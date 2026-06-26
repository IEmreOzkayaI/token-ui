"use client"

import { Card } from "@/primitives/card"
import { Button } from "@/primitives/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const versions = [
  {
    version: "v1.0.0",
    date: "June 26, 2025",
    features: ["55 Radix primitives", "300+ examples", "Live docs", "Design foundations"],
  },
  {
    version: "v1.1.0",
    date: "Coming Soon",
    features: ["Component examples", "Changelog versioning", "Registry"],
  },
]

export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Changelog</h1>
        <p className="text-lg text-muted-foreground">
          Release notes and updates for each version.
        </p>
      </section>

      <section className="space-y-3">
        {versions.map((v) => (
          <Card key={v.version} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{v.version}</h3>
                  <span className="text-sm text-muted-foreground">{v.date}</span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {v.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </div>
              <Button variant="ghost" asChild>
                <Link href={`/docs/changelog/${v.version}`}>
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  )
}
