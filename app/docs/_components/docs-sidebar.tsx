"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { docsNav } from "@/app/docs/_lib/nav"
import { ScrollArea } from "@/primitives/scroll-area"
import { cn } from "@/lib/utils"

type DocsSidebarProps = {
  onNavigate?: () => void
  className?: string
}

export function DocsSidebar({ onNavigate, className }: DocsSidebarProps) {
  const pathname = usePathname()

  return (
    <ScrollArea className={cn("h-full", className)}>
      <nav className="space-y-6 p-4 pr-2 pb-10">
        {docsNav.map((section) => (
          <div key={section.title} className="space-y-1">
            <h4 className="mb-2 px-2 text-sm font-semibold">{section.title}</h4>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-sm transition-colors hover:text-foreground",
                        isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </ScrollArea>
  )
}
