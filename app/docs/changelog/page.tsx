"use client"

import Link from "next/link"
import { Badge } from "@/primitives/badge"
import { Separator } from "@/primitives/separator"

const releases = [
  {
    version: "v1.1.0",
    date: "Coming Soon",
    status: "upcoming" as const,
    summary: "Component registry, version routing, and pre-built UI blocks.",
    changes: [
      "Component Library — pre-built UI blocks for auth, dashboards, settings",
      "Version Routing — pin docs to any release, compare across versions",
      "Registry — search, filter, and install components via CLI",
    ],
  },
  {
    version: "v1.0.0",
    date: "June 26, 2025",
    status: "latest" as const,
    summary: "55 primitives, 300+ examples, full design foundation with OKLCH tokens.",
    changes: [
      "55 Radix UI Primitives — accessible, composable, fully customizable",
      "300+ component examples — copy-paste ready, real-world patterns",
      "Live documentation — interactive preview, source toggle, search",
      "Design foundations — OKLCH colors, type scale, spacing, shadows",
    ],
    stats: [
      { value: "55", label: "Primitives" },
      { value: "300+", label: "Examples" },
      { value: "50+", label: "Tokens" },
    ],
  },
]

export default function ChangelogPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="mt-1 text-muted-foreground">
          New updates and releases.
        </p>
      </div>

      <div className="space-y-10">
        {releases.map((release) => (
          <article key={release.version}>
            <div className="flex items-center gap-2.5">
              <Link
                href={`/docs/changelog/${release.version}`}
                className="text-lg font-semibold hover:underline underline-offset-4"
              >
                {release.version}
              </Link>
              {release.status === "upcoming" ? (
                <Badge variant="outline" className="text-[11px]">Upcoming</Badge>
              ) : (
                <Badge variant="secondary" className="text-[11px]">Latest</Badge>
              )}
              <span className="text-sm text-muted-foreground">{release.date}</span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {release.summary}
            </p>

            {release.stats && (
              <div className="mt-4 flex gap-6">
                {release.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <ul className="mt-4 space-y-1.5">
              {release.changes.map((change) => (
                <li key={change} className="flex items-start gap-2 text-sm">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/30" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>

            <Separator className="mt-10" />
          </article>
        ))}
      </div>
    </div>
  )
}
