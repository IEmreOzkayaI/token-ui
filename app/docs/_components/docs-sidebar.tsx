"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Folder, FileText, Search, X } from "lucide-react"

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
    "Getting Started": pathname.startsWith("/docs/installation") ||
      pathname === "/docs",
    Foundations: pathname.startsWith("/docs/foundations"),
    Prompts: false,
    Changelog: false,
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
      <div className="space-y-2 py-4 px-2">
        {/* Sections - Tree Style */}
        <div className="space-y-1">
          {otherSections.map((section) => (
            <div key={section.title}>
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className={cn(
                  "group flex w-full items-center gap-2 px-2 py-1.5 text-xs font-semibold rounded-md transition-colors",
                  expanded[section.title]
                    ? "text-foreground bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )}
              >
                <ChevronRight
                  className={cn(
                    "size-4 transition-transform flex-shrink-0",
                    expanded[section.title] ? "rotate-90" : ""
                  )}
                />
                <Folder className="size-4 flex-shrink-0" />
                <span className="truncate uppercase tracking-wide">{section.title}</span>
              </button>

              {expanded[section.title] && (
                <ul className="space-y-0.5 mt-1 ml-2">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors",
                            "border-l-2",
                            isActive
                              ? "font-medium text-foreground bg-muted/50 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border-transparent"
                          )}
                        >
                          <FileText className="size-3.5 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Components - Tree Folder */}
        {componentSection && (
          <div className="border-t mt-4 pt-2 space-y-2">
            <button
              type="button"
              className={cn(
                "group flex w-full items-center gap-2 px-2 py-1.5 text-xs font-semibold rounded-md transition-colors",
                "text-foreground bg-muted/50"
              )}
            >
              <ChevronRight className="size-4 flex-shrink-0 rotate-90 transition-transform" />
              <Folder className="size-4 flex-shrink-0" />
              <span className="truncate uppercase tracking-wide">Components</span>
            </button>

            <div className="relative px-2">
              <Search className="pointer-events-none absolute left-4 top-2.5 size-3.5 text-muted-foreground/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="h-7 w-full rounded-md border border-border/50 bg-muted/40 pl-8 pr-2 text-xs outline-none placeholder:text-muted-foreground/40 focus:border-foreground/30 focus:bg-muted/60 transition-colors"
              />
              {hasQuery && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-2 text-muted-foreground/50 hover:text-foreground/70 transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {filteredComponents.length === 0 && hasQuery ? (
              <div className="px-3 py-2 text-xs text-muted-foreground/50 text-center">
                No results
              </div>
            ) : (
              <ul className="space-y-0.5 ml-2">
                {filteredComponents.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors",
                          "border-l-2",
                          isActive
                            ? "font-medium text-foreground bg-muted/50 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border-transparent"
                        )}
                      >
                        <FileText className="size-3.5 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
