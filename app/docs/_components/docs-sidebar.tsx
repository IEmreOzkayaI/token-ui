"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, X, ChevronDown, ChevronRight, Folder, FolderOpen, FileText } from "lucide-react"

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

  const [treeExpanded, setTreeExpanded] = useState<Record<string, boolean>>({})

  const toggleSection = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const toggleTreeItem = (key: string) => {
    setTreeExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const renderItems = (items: typeof docsNav[0]["items"], level = 0): React.ReactNode => {
    return (
      <ul className={cn("mt-1 ml-3 border-l border-primary/30 pl-2")}>
        {items.map((item, idx) => {
          const isActive = pathname === item.href
          const hasChildren = item.items && item.items.length > 0
          const itemKey = `${level}-${item.href}-${idx}`
          const isItemExpanded = treeExpanded[itemKey] ?? true

          if (hasChildren) {
            return (
              <li key={itemKey}>
                <button
                  onClick={() => toggleTreeItem(itemKey)}
                  className={cn(
                    "flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-xs transition-all hover:bg-foreground/5",
                    isItemExpanded ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ChevronDown className={cn("size-3 shrink-0 transition-transform", !isItemExpanded && "-rotate-90")} />
                  {isItemExpanded
                    ? <FolderOpen className="size-3.5 shrink-0 text-primary" />
                    : <Folder className="size-3.5 shrink-0 text-primary/60" />
                  }
                  <span className="font-medium">{item.label}</span>
                </button>
                {isItemExpanded && renderItems(item.items!, level + 1)}
              </li>
            )
          }

          return (
            <li key={itemKey}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-1.5 rounded px-2 py-1.5 text-xs transition-all",
                  isActive
                    ? "font-medium text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <div className="size-3 shrink-0" />
                <FileText className="size-3.5 shrink-0 text-primary/50" />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="space-y-0.5 py-4 px-4">
        {/* Sections */}
        {otherSections.map((section) => {
          const sectionButton = (
            <div className="flex w-full items-center gap-2">
              <ChevronDown className={cn("size-3 shrink-0 transition-transform", !expanded[section.title] && "-rotate-90")} />
              {expanded[section.title]
                ? <FolderOpen className="size-3.5 shrink-0 text-primary" />
                : <Folder className="size-3.5 shrink-0 text-primary/60" />
              }
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
                      ? "text-foreground"
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
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {sectionButton}
                </button>
              )}

              {expanded[section.title] && renderItems(section.items)}
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
                "group flex w-full items-center gap-2 rounded px-2 py-2 text-xs font-medium transition-all hover:bg-foreground/5",
                expanded["Components"]
                  ? "text-foreground bg-foreground/5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ChevronDown className={cn("size-3 shrink-0 transition-transform", !expanded["Components"] && "-rotate-90")} />
              {expanded["Components"]
                ? <FolderOpen className="size-3.5 shrink-0 text-primary" />
                : <Folder className="size-3.5 shrink-0 text-primary/60" />
              }
              <span className="font-semibold">Components</span>
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
                  renderItems(filteredComponents)
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
