"use client"

import { CollapsibleCodeBlock } from "./code-block"
import { ComponentPreview } from "./component-preview"
import { cn } from "@/lib/utils"

type ComponentExampleProps = {
  description?: React.ReactNode
  source: string
  children: React.ReactNode
  className?: string
}

export function ComponentExample({
  description,
  source,
  children,
  className,
}: ComponentExampleProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
        <ComponentPreview>{children}</ComponentPreview>
        <CollapsibleCodeBlock code={source} />
      </div>
    </div>
  )
}
