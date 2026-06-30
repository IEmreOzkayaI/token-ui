import { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DocsSectionProps = {
  id: string
  title: string
  description?: string
  children: ReactNode
  className?: string
  nested?: boolean
}

export function DocsSection({
  id,
  title,
  description,
  children,
  className,
  nested = false,
}: DocsSectionProps) {
  return (
    <section
      id={id}
      data-nested={nested || undefined}
      className={cn(
        "docs-section scroll-mt-20 space-y-4",
        nested ? "space-y-3" : "border-t border-border/30 pt-10 mt-8",
        className
      )}
    >
      <div className="space-y-2">
        {nested ? (
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        ) : (
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
