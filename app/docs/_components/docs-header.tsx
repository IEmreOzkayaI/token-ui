"use client"

import Link from "next/link"
import { Code2, Menu, Search, X } from "lucide-react"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Button } from "@/primitives/button"
import { Separator } from "@/primitives/separator"
import { cn } from "@/lib/utils"

type DocsHeaderProps = {
  mobileOpen: boolean
  onToggleMobile: () => void
}

export function DocsHeader({ mobileOpen, onToggleMobile }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={onToggleMobile}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>

        <div className="flex items-center gap-2">
          <Link href="/" className="mr-2 flex items-center gap-2 font-semibold">
            <div className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
              <span className="text-xs font-bold">UI</span>
            </div>
            <span className="hidden sm:inline">UI Tokens</span>
          </Link>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <Link
            href="/docs"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Docs
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "hidden h-8 w-full max-w-56 justify-start gap-2 text-muted-foreground md:flex"
            )}
          >
            <Search className="size-3.5" />
            <span className="text-sm">Search documentation...</span>
            <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium lg:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <ThemeToggle />

          <Button variant="ghost" size="icon-sm" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Code2 className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
