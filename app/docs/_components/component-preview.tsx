"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ComponentPreviewProps = {
  children: React.ReactNode
  className?: string
}

export function ComponentPreview({ children, className }: ComponentPreviewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className={cn("relative w-full", className)}>
      {/* Preview area */}
      <div
        ref={containerRef}
        className="docs-component-preview relative w-full overflow-x-hidden bg-background"
        style={{ minHeight: "24rem" }}
      >
        <div className="flex min-h-96 items-center justify-center p-8 md:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}
