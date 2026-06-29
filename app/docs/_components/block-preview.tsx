"use client"

import { useState } from "react"
import { X, Maximize2, Copy, Check } from "lucide-react"
import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

interface BlockPreviewProps {
  children: React.ReactNode
  source?: string
  title?: string
}

export function BlockPreview({ children, source, title }: BlockPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (source) {
      const ok = await copyToClipboard(source)
      if (ok) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b sticky top-0"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
        >
          <div>
            <h2 className="font-semibold text-lg" style={{ color: "var(--foreground)" }}>
              {title || "Block Preview"}
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Full-screen view
            </p>
          </div>
          <div className="flex items-center gap-2">
            {source && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCode(!showCode)}
                  className="h-8 w-8"
                >
                  <span className="text-xs font-mono">{"</>"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="h-8 w-8"
                >
                  {copied ? (
                    <Check className="size-4 text-green-600" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="h-8 w-8"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {showCode && source ? (
            <pre
              className="p-6 font-mono text-sm"
              style={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }}
            >
              <code>{source}</code>
            </pre>
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: "var(--background)" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)" }}>
      {/* Preview Container */}
      <div
        className="relative min-h-[400px] overflow-auto bg-muted/30"
        style={{ backgroundColor: "var(--muted)" }}
      >
        <div className="absolute inset-0 overflow-auto">{children}</div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          {source && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className={cn("text-xs", showCode && "bg-muted")}
            >
              {showCode ? "Hide Code" : "View Code"}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {source && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              title="Copy source"
            >
              {copied ? (
                <Check className="size-3.5 text-green-600" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsFullscreen(true)}
            title="Full screen"
          >
            <Maximize2 className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Code Section */}
      {showCode && source && (
        <div
          className="border-t p-4 max-h-64 overflow-auto font-mono text-xs"
          style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
        >
          <code style={{ color: "var(--foreground)" }}>{source}</code>
        </div>
      )}
    </div>
  )
}
