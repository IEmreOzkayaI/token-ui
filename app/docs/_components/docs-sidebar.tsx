"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, X } from "lucide-react"

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
      <div className="space-y-1 py-6 px-4">
        {/* Sections */}
        {otherSections.map((section) => {
          const sectionButton = (
            <div className="flex w-full items-center justify-between">
              <span>{section.title}</span>
              <span className="text-lg leading-none">
                {expanded[section.title] ? "−" : "+"}
              </span>
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
                    "flex w-full items-center justify-between px-0 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    expanded[section.title]
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {sectionButton}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className={cn(
                    "flex w-full items-center justify-between px-0 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    expanded[section.title]
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {sectionButton}
                </button>
              )}

              {expanded[section.title] && (
                <ul className="space-y-1 pl-4 mt-1 mb-4">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className={cn(
                            "block px-0 py-1.5 text-sm transition-colors",
                            isActive
                              ? "font-medium text-foreground"
                              : "text-muted-foreground hover:text-foreground"
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
          <div className="border-t mt-4 pt-4">
            <Link
              href={componentSection.href || "/docs/ui/components/accordion"}
              onClick={(e) => {
                e.preventDefault()
                toggleSection("Components")
                onNavigate?.()
              }}
              className={cn(
                "flex w-full items-center justify-between px-0 py-2 text-sm font-medium transition-colors hover:text-foreground",
                expanded["Components"]
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <span>Components</span>
              <span className="text-lg leading-none">
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
                    className="h-8 w-full rounded-md border border-border/50 bg-muted/40 pl-9 pr-8 text-xs outline-none placeholder:text-muted-foreground/40 focus:border-foreground/30 focus:bg-muted/60 transition-colors"
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
                              "block px-0 py-1.5 text-sm transition-colors",
                              isActive
                                ? "font-medium text-foreground"
                                : "text-muted-foreground hover:text-foreground"
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
