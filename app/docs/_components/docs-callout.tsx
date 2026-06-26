import { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DocsCalloutProps = {
  title?: string
  children: ReactNode
  variant?: "info" | "tip" | "warning"
}

const variants = {
  info: "border-border bg-muted/40",
  tip: "border-primary/20 bg-primary/5",
  warning: "border-destructive/20 bg-destructive/5",
}

export function DocsCallout({
  title,
  children,
  variant = "info",
}: DocsCalloutProps) {
  return (
    <div className={cn("rounded-xl border p-4 text-sm", variants[variant])}>
      {title && <p className="mb-1 font-medium">{title}</p>}
      <div className="text-muted-foreground [&_code]:text-foreground">
        {children}
      </div>
    </div>
  )
}
