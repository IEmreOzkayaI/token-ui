"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"

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
    Foundations: false,
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
      <div className="space-y-6 py-4 px-3">
        {/* Sections */}
        <div className="space-y-3">
          {otherSections.map((section) => (
            <div key={section.title}>
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className="group flex w-full items-center gap-1 px-2 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronDownIcon
                  className={cn(
                    "size-3.5 transition-transform",
                    expanded[section.title] ? "rotate-0" : "-rotate-90"
                  )}
                />
                {section.title}
              </button>

              {expanded[section.title] && (
                <ul className="space-y-0.5 mt-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className={cn(
                            "block rounded-sm px-2 py-1.5 text-sm transition-colors",
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
          ))}
        </div>

        {/* Components */}
        {componentSection && (
          <div className="space-y-2 border-t pt-4">
            <div className="space-y-1">
              <h4 className="px-2 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Components
              </h4>
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-muted-foreground/50" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="h-8 w-full rounded-sm border bg-muted/40 pl-8 pr-8 text-xs outline-none placeholder:text-muted-foreground/40 focus:border-foreground/30"
                />
                {hasQuery && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
              </div>
            </div>

            {filteredComponents.length === 0 && hasQuery ? (
              <div className="px-2 py-2 text-xs text-muted-foreground/50">
                No results
              </div>
            ) : (
              <ul className="space-y-0.5">
                {filteredComponents.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                          "block rounded-sm px-2 py-1.5 text-sm transition-colors",
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
    </ScrollArea>
  )
}
