"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { getDocsPager } from "@/app/docs/_lib/nav"
import { Separator } from "@/primitives/separator"

export function DocsPager() {
  const pathname = usePathname()
  const { prev, next } = getDocsPager(pathname)

  if (!prev && !next) return null

  return (
    <div className="mt-16">
      <Separator className="mb-8" />
      <div className="grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <span className="flex items-center text-xs text-muted-foreground">
              <ChevronLeft className="mr-1 size-3" />
              Previous
            </span>
            <span className="font-medium group-hover:text-foreground">
              {prev.label}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex flex-col items-end gap-1 rounded-lg border p-4 text-right transition-colors hover:bg-muted/50 sm:col-start-2"
          >
            <span className="flex items-center text-xs text-muted-foreground">
              Next
              <ChevronRight className="ml-1 size-3" />
            </span>
            <span className="font-medium group-hover:text-foreground">
              {next.label}
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
