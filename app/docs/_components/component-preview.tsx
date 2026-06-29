"use client"

import { TooltipProvider } from "@/primitives/tooltip"

type ComponentPreviewProps = {
  children: React.ReactNode
  className?: string
}

export function ComponentPreview({
  children,
  className,
}: ComponentPreviewProps) {
  return (
    <TooltipProvider>
      <div
        className={
          className ??
          "docs-component-preview relative flex w-full items-center justify-center bg-background p-8 md:p-10 min-h-96"
        }
      >
        {children}
      </div>
    </TooltipProvider>
  )
}
