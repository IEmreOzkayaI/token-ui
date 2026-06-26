import { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DocsStepProps = {
  step: number
  title: string
  description?: string
  children?: ReactNode
}

export function DocsStep({
  step,
  title,
  description,
  children,
}: DocsStepProps) {
  return (
    <div className="relative flex gap-4 pb-10 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium">
          {step}
        </div>
        <div className="mt-2 w-px flex-1 bg-border" />
      </div>
      <div className={cn("min-w-0 flex-1 space-y-3", children && "pb-2")}>
        <div className="space-y-1">
          <h3 className="text-lg font-medium tracking-tight">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
