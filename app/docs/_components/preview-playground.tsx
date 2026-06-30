"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Monitor, Smartphone, Tablet } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/primitives/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/primitives/tooltip"
import { cn } from "@/lib/utils"

import { PreviewFrame } from "./preview-frame"

export type ViewportPreset = "375" | "768" | "1024" | "full"

const MIN_PREVIEW_WIDTH = 320
const MAX_PREVIEW_WIDTH = 1440

export const VIEWPORT_PRESETS: {
  value: ViewportPreset
  label: string
  width: number | null
  icon: typeof Smartphone
  iconClassName?: string
}[] = [
  { value: "375", label: "Mobil", width: 375, icon: Smartphone },
  { value: "768", label: "Tablet", width: 768, icon: Tablet },
  {
    value: "1024",
    label: "Tablet Yatay",
    width: 1024,
    icon: Tablet,
    iconClassName: "rotate-90",
  },
  { value: "full", label: "Masaüstü", width: null, icon: Monitor },
]

const DOT_GRID_STYLE = {
  backgroundImage:
    "radial-gradient(circle, color-mix(in oklch, var(--muted-foreground) 22%, transparent) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const

function PreviewSurface({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="@container/block-preview w-full min-w-0">{children}</div>
    </TooltipProvider>
  )
}

export function ViewportToggle({
  value,
  onChange,
  className,
}: {
  value: ViewportPreset | ""
  onChange: (value: ViewportPreset) => void
  className?: string
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next as ViewportPreset)
      }}
      variant="outline"
      size="sm"
      className={className}
      aria-label="Önizleme genişliği"
    >
      {VIEWPORT_PRESETS.map((preset) => {
        const Icon = preset.icon
        const hint = preset.width ? `${preset.width}px` : "Tam genişlik"

        return (
          <Tooltip key={preset.value}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value={preset.value}
                aria-label={`${preset.label} (${hint})`}
                className="size-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <Icon
                  className={cn("size-4", preset.iconClassName)}
                  aria-hidden
                />
                <span className="sr-only">{preset.label}</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="font-medium">{preset.label}</p>
              <p className="text-xs text-muted-foreground">{hint}</p>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </ToggleGroup>
  )
}

function ResizeHandle({ onResizeStart }: { onResizeStart: (e: React.MouseEvent) => void }) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Önizleme genişliğini ayarla"
      onMouseDown={onResizeStart}
      className="absolute -right-2 top-0 z-20 flex h-full w-4 cursor-col-resize items-center justify-center group"
    >
      <div className="flex h-10 w-1.5 items-center justify-center rounded-full border border-border/60 bg-background shadow-sm transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
        <div className="flex flex-col gap-0.5 opacity-40 transition-opacity group-hover:opacity-100">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="mx-auto h-px w-2 rounded-full bg-muted-foreground group-hover:bg-primary"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function usePlaygroundWidth(playgroundRef: React.RefObject<HTMLDivElement | null>) {
  const [playgroundWidth, setPlaygroundWidth] = useState<number | null>(null)

  useEffect(() => {
    const element = playgroundRef.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      setPlaygroundWidth(Math.round(entry.contentRect.width))
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [playgroundRef])

  return playgroundWidth
}

function resolveFrameWidth(
  mode: "inline" | "playground",
  viewport: ViewportPreset,
  customWidth: number | null,
  isCustom: boolean,
  playgroundWidth: number | null
): number | null {
  if (playgroundWidth === null) return null

  const maxWidth = Math.min(playgroundWidth, MAX_PREVIEW_WIDTH)

  if (mode === "inline") {
    if (isCustom && customWidth !== null) {
      return Math.min(maxWidth, Math.max(MIN_PREVIEW_WIDTH, customWidth))
    }
    return maxWidth
  }

  if (isCustom && customWidth !== null) {
    return Math.min(maxWidth, Math.max(MIN_PREVIEW_WIDTH, customWidth))
  }

  const preset = VIEWPORT_PRESETS.find((item) => item.value === viewport)
  if (viewport === "full" || preset?.width === null) {
    return maxWidth
  }

  return Math.min(maxWidth, Math.max(MIN_PREVIEW_WIDTH, preset?.width ?? maxWidth))
}

type PreviewPlaygroundProps = {
  children: React.ReactNode
  className?: string
  playgroundClassName?: string
  scrollClassName?: string
  defaultViewport?: ViewportPreset
  footer?: React.ReactNode
  fill?: boolean
  /** Inline peek: container width only, no viewport preset toggles */
  mode?: "inline" | "playground"
}

export function PreviewPlayground({
  children,
  className,
  playgroundClassName,
  scrollClassName,
  defaultViewport = "full",
  footer,
  fill = false,
  mode = "playground",
}: PreviewPlaygroundProps) {
  const playgroundRef = useRef<HTMLDivElement>(null)
  const playgroundWidth = usePlaygroundWidth(playgroundRef)

  const [viewport, setViewport] = useState<ViewportPreset>(defaultViewport)
  const [customWidth, setCustomWidth] = useState<number | null>(null)
  const [isCustom, setIsCustom] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const frameWidth = resolveFrameWidth(
    mode,
    viewport,
    customWidth,
    isCustom,
    playgroundWidth
  )

  const handlePresetChange = useCallback((value: ViewportPreset) => {
    setViewport(value)
    setIsCustom(false)
    setCustomWidth(null)
  }, [])

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      if (frameWidth === null) return

      const startX = e.clientX
      const startWidth = frameWidth
      const maxWidth = Math.min(playgroundWidth ?? MAX_PREVIEW_WIDTH, MAX_PREVIEW_WIDTH)

      setIsDragging(true)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      const onMove = (ev: MouseEvent) => {
        const delta = ev.clientX - startX
        const nextWidth = Math.min(maxWidth, Math.max(MIN_PREVIEW_WIDTH, startWidth + delta))
        setCustomWidth(nextWidth)
        setIsCustom(true)
      }

      const onUp = () => {
        setIsDragging(false)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
        window.removeEventListener("mousemove", onMove)
        window.removeEventListener("mouseup", onUp)
      }

      window.addEventListener("mousemove", onMove)
      window.addEventListener("mouseup", onUp)
    },
    [frameWidth, playgroundWidth]
  )

  const toggleValue = isCustom ? "" : viewport

  return (
    <div className={cn("flex flex-col", fill && "min-h-0 flex-1", className)}>
      <div
        className={cn(
          "relative bg-muted/30",
          fill ? "min-h-0 flex-1" : "max-h-[min(600px,65vh)]",
          scrollClassName
        )}
        style={DOT_GRID_STYLE}
      >
        <div
          className={cn(
            "overflow-auto",
            fill ? "h-full" : "max-h-[min(600px,65vh)]"
          )}
        >
          <div
            ref={playgroundRef}
            className={cn(
              "flex min-h-[320px] w-full items-start justify-center p-6 md:p-8",
              playgroundClassName
            )}
          >
            {frameWidth ? (
              <div className="relative shrink-0" style={{ width: frameWidth }}>
                <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                  <PreviewFrame width={frameWidth} className="w-full">
                    <PreviewSurface>{children}</PreviewSurface>
                  </PreviewFrame>
                </div>

                {mode === "playground" ? (
                  <ResizeHandle onResizeStart={handleResizeStart} />
                ) : null}

                {isDragging ? (
                  <div className="pointer-events-none absolute -top-9 left-1/2 z-30 -translate-x-1/2 rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium tabular-nums text-foreground shadow-sm">
                    {frameWidth}px
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center text-sm text-muted-foreground">
                Önizleme yükleniyor…
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 border-t border-border bg-background px-4 py-4">
        {mode === "playground" ? (
          <TooltipProvider>
            <ViewportToggle value={toggleValue} onChange={handlePresetChange} />
          </TooltipProvider>
        ) : null}
        {footer}
      </div>
    </div>
  )
}
