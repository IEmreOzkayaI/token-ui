"use client"

import { useCallback, useEffect, useState } from "react"
import { Expand, X } from "lucide-react"

import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

import { CollapsibleCodeBlock } from "./code-block"
import { PreviewPlayground } from "./preview-playground"

type BlockPreviewProps = {
  children: React.ReactNode
  source?: string
  title?: string
  className?: string
}

function InlinePeekPreview({
  children,
  onOpenFullscreen,
}: {
  children: React.ReactNode
  onOpenFullscreen: () => void
}) {
  return (
    <PreviewPlayground
      mode="inline"
      footer={
        <Button type="button" onClick={onOpenFullscreen} className="gap-2">
          <Expand className="size-4" aria-hidden />
          Tam ekran önizle
        </Button>
      }
    >
      {children}
    </PreviewPlayground>
  )
}

function FullscreenPreview({
  title,
  onClose,
  children,
}: {
  title?: string
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Block preview"}
    >
      <div className="flex shrink-0 flex-col gap-3 border-b border-border px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground md:text-lg">
            {title ?? "Block Preview"}
          </h2>
          <p className="text-xs text-muted-foreground">
            Esc ile çıkın — sürükleyerek veya simgelerle genişliği test edin
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="self-end md:self-auto"
          aria-label="Tam ekrandan çık"
        >
          <X className="size-4" />
        </Button>
      </div>

      <PreviewPlayground fill mode="playground" className="min-h-0 flex-1">
        {children}
      </PreviewPlayground>
    </div>
  )
}

export function BlockPreview({
  children,
  source,
  title,
  className,
}: BlockPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const closeFullscreen = useCallback(() => setIsFullscreen(false), [])
  const openFullscreen = useCallback(() => setIsFullscreen(true), [])

  return (
    <>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-background shadow-sm",
          className
        )}
      >
        {isFullscreen ? (
          <div className="flex flex-col items-center justify-center gap-3 border-b border-border bg-muted/20 px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              Önizleme tam ekranda açık
            </p>
            <Button type="button" variant="outline" size="sm" onClick={closeFullscreen}>
              Önizlemeye dön
            </Button>
          </div>
        ) : (
          <InlinePeekPreview onOpenFullscreen={openFullscreen}>
            {children}
          </InlinePeekPreview>
        )}

        {source ? <CollapsibleCodeBlock code={source} /> : null}
      </div>

      {isFullscreen ? (
        <FullscreenPreview title={title} onClose={closeFullscreen}>
          {children}
        </FullscreenPreview>
      ) : null}
    </>
  )
}
