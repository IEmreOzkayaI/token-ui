import { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DocsSectionProps = {
  id: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function DocsSection({
  id,
  title,
  description,
  children,
  className,
}: DocsSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 space-y-4", className)}>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
