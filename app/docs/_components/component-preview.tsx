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
          "flex w-full items-center justify-center bg-background p-8 md:p-10"
        }
      >
        {children}
      </div>
    </TooltipProvider>
  )
}
