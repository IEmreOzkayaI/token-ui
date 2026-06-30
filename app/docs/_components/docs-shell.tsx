"use client"

import { ReactNode, useState } from "react"

import { DocsHeader } from "@/app/docs/_components/docs-header"
import { DocsSidebar } from "@/app/docs/_components/docs-sidebar"
import { cn } from "@/lib/utils"

export function DocsShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <DocsHeader
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((open) => !open)}
      />

      <div className="flex min-h-0 flex-1 justify-center overflow-hidden">
        <div className="flex min-h-0 w-full max-w-7xl">
          {mobileOpen && (
            <div
              className="fixed inset-0 top-14 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}

          <aside
            className={cn(
              "fixed top-14 z-50 flex h-[calc(100dvh-3.5rem)] w-64 shrink-0 flex-col overflow-hidden border-r border-border/50 bg-background/95 transition-transform duration-200",
              "lg:relative lg:top-0 lg:z-0 lg:h-full lg:translate-x-0",
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <DocsSidebar onNavigate={() => setMobileOpen(false)} />
          </aside>

          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto no-scrollbar">
            <div className="px-4 py-6 md:px-6 lg:px-8 xl:px-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
