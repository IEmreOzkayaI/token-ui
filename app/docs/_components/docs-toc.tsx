"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import type { TocItem } from "@/app/docs/_lib/toc"
import { cn } from "@/lib/utils"

type DocsTocProps = {
  items: TocItem[]
}

export function DocsToc({ items }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    )

    for (const item of items) {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <div className="hidden xl:block">
      <div className="sticky top-20 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On This Page</p>
        <ul className="space-y-1 border-l border-border/30 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={cn(
                  "block border-l border-transparent py-1 pl-3 transition-all hover:text-foreground",
                  item.depth === 3 && "pl-6",
                  activeId === item.id
                    ? "border-foreground/50 font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
