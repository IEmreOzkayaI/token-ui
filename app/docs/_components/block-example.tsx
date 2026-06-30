"use client"

import { BlockPreview } from "./block-preview"
import { cn } from "@/lib/utils"

type BlockExampleProps = {
  description?: React.ReactNode
  source: string
  title?: string
  children: React.ReactNode
  className?: string
}

export function BlockExample({
  description,
  source,
  title,
  children,
  className,
}: BlockExampleProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {description ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}

      <BlockPreview source={source} title={title}>
        {children}
      </BlockPreview>
    </div>
  )
}
