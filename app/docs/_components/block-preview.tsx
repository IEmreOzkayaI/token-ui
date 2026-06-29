"use client"

import { useState } from "react"
import { X, Maximize2 } from "lucide-react"
import { Button } from "@/primitives/button"
import { CollapsibleCodeBlock } from "./code-block"

interface BlockPreviewProps {
  children: React.ReactNode
  source?: string
  title?: string
}

export function BlockPreview({ children, source, title }: BlockPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
        >
          <div>
            <h2 className="font-semibold text-lg" style={{ color: "var(--foreground)" }}>
              {title || "Block Preview"}
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Full-screen responsive preview — resize window to test
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(false)}
            className="h-8 w-8 flex-shrink-0"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: "var(--background)" }}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
      {/* Preview Container */}
      <div
        className="relative min-h-[400px] overflow-auto"
        style={{ backgroundColor: "var(--muted)" }}
      >
        <div className="absolute inset-0 overflow-auto">{children}</div>
      </div>

      {/* Fullscreen Button */}
      <div
        className="flex items-center justify-end px-4 py-3 border-t"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsFullscreen(true)}
          title="Full screen responsive preview"
        >
          <Maximize2 className="size-3.5" />
        </Button>
      </div>

      {/* Code Section */}
      {source && <CollapsibleCodeBlock code={source} />}
    </div>
  )
}
