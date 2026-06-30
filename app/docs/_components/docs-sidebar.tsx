"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, X, ChevronDown, ChevronRight } from "lucide-react"

import { docsNav } from "@/app/docs/_lib/nav"
import { ScrollArea } from "@/primitives/scroll-area"
import { cn } from "@/lib/utils"

type DocsSidebarProps = {
  onNavigate?: () => void
  className?: string
}

export function DocsSidebar({ onNavigate, className }: DocsSidebarProps) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "Getting Started": false,
    Foundations: false,
    Prompts: false,
    Changelog: false,
    Components: true,
  })

  const hasQuery = query.trim().length > 0
  const q = query.toLowerCase()

  const componentSection = docsNav.find((s) => s.title === "Components")
  const otherSections = docsNav.filter((s) => s.title !== "Components")

  const filteredComponents = useMemo(() => {
    if (!componentSection) return []
    if (!hasQuery) return componentSection.items
    return componentSection.items.filter((item) =>
      item.label.toLowerCase().includes(q)
    )
  }, [componentSection, query, hasQuery])

  const toggleSection = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="space-y-3 py-8 px-4">
        {/* Sections */}
        {otherSections.map((section) => {
          const sectionButton = (
            <div className="flex w-full items-center gap-2">
              {expanded[section.title] ? (
                <ChevronDown className="size-4 shrink-0 opacity-60" />
              ) : (
                <ChevronRight className="size-4 shrink-0 opacity-60" />
              )}
              <span className="text-sm font-semibold">{section.title}</span>
            </div>
          )

          return (
            <div key={section.title}>
              {section.href ? (
                <Link
                  href={section.href}
                  onClick={(e) => {
                    e.preventDefault()
                    toggleSection(section.title)
                    onNavigate?.()
                  }}
                  className={cn(
                    "group flex w-full items-center rounded px-2 py-2 text-xs font-medium transition-all hover:bg-foreground/5",
                    expanded[section.title]
                      ? "text-foreground bg-foreground/5"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {sectionButton}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className={cn(
                    "group flex w-full items-center rounded px-2 py-2 text-xs font-medium transition-all hover:bg-foreground/5",
                    expanded[section.title]
                      ? "text-foreground bg-foreground/5"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {sectionButton}
                </button>
              )}

              {expanded[section.title] && (
                <ul className="mt-2 mb-2 ml-2 border-l border-border/30 pl-3">
                  {section.items.map((item, idx) => {
                    const isActive = pathname === item.href
                    const isGroupHeader = item.label === item.label.toUpperCase() && item.label.length > 0
                    const isLast = idx === section.items.length - 1

                    if (isGroupHeader) {
                      return (
                        <li key={item.href}>
                          <div className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mt-3">
                            {item.label}
                          </div>
                        </li>
                      )
                    }

                    return (
                      <li key={item.href} className={cn(
                        "relative",
                        !isLast && "pb-1"
                      )}>
                        <div className="absolute left-0 top-3 -ml-4 w-3 h-px bg-border/30" />
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className={cn(
                            "block rounded px-2 py-1.5 text-xs transition-all",
                            isActive
                              ? "font-medium text-foreground bg-foreground/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}

        {/* Components */}
        {componentSection && (
          <div className="border-t border-border/30 pt-6">
            <Link
              href={componentSection.href || "/docs/ui/components/accordion"}
              onClick={(e) => {
                e.preventDefault()
                toggleSection("Components")
                onNavigate?.()
              }}
              className={cn(
                "group flex w-full items-center justify-between rounded px-2 py-2 text-xs font-medium font-semibold uppercase tracking-wide transition-all",
                expanded["Components"]
                  ? "text-foreground bg-foreground/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              )}
            >
              <span>Components</span>
              <span className="text-sm leading-none opacity-60 group-hover:opacity-100 transition-opacity">
                {expanded["Components"] ? "−" : "+"}
              </span>
            </Link>

            {expanded["Components"] && (
              <div className="mt-3 space-y-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-2.5 size-3.5 text-muted-foreground/50" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="h-8 w-full rounded-md border border-border/50 bg-foreground/5 pl-9 pr-8 text-xs outline-none placeholder:text-muted-foreground/40 focus:border-foreground/30 focus:bg-foreground/10 transition-colors"
                  />
                  {hasQuery && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-2.5 top-2 text-muted-foreground/50 hover:text-foreground/70 transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>

                {filteredComponents.length === 0 && hasQuery ? (
                  <div className="px-2 py-3 text-xs text-muted-foreground/50 text-center">
                    No results
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {filteredComponents.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onNavigate}
                            className={cn(
                              "block rounded px-2 py-1.5 text-xs transition-all",
                              isActive
                                ? "font-medium text-foreground bg-foreground/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
