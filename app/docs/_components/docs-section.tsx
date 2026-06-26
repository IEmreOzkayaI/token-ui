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
        nested ? "space-y-3" : "border-t border-border pt-10",
        className
      )}
    >
      <div className="space-y-1">
        {nested ? (
          <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        ) : (
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        )}
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
