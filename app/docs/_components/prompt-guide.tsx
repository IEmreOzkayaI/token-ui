import type { ReactNode } from "react"
import { ArrowRight, CircleCheck, CircleX, Dot, Quote } from "lucide-react"

import { cn } from "@/lib/utils"

type PromptGuideProps = {
  summary: ReactNode
  useWhen: ReactNode
  avoidWhen: ReactNode
  example: ReactNode
  outputs?: ReactNode
  outputsTitle?: string
  className?: string
}

type PromptGuideSplitItem = {
  title: string
  description: ReactNode
}

type PromptGuideSplitProps = {
  items: PromptGuideSplitItem[]
  className?: string
}

type PromptGuideListProps = {
  title?: string
  items: ReactNode[]
  className?: string
}

function PromptGuide({
  summary,
  useWhen,
  avoidWhen,
  example,
  outputs,
  outputsTitle = "Ne üretilir",
  className,
}: PromptGuideProps) {
  return (
    <div className={cn("not-prose space-y-6", className)}>
      <p className="text-[15px] leading-relaxed text-muted-foreground">{summary}</p>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid divide-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                <CircleCheck className="size-3.5" aria-hidden />
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase">
                Ne zaman kullan
              </span>
            </div>
            <div className="text-sm leading-relaxed text-muted-foreground">{useWhen}</div>
          </div>

          <div className="bg-muted/30 p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <CircleX className="size-3.5" aria-hidden />
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase">
                Ne zaman kullanma
              </span>
            </div>
            <div className="text-sm leading-relaxed text-muted-foreground">{avoidWhen}</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card px-5 py-4 sm:px-6 sm:py-5">
        <div className="mb-2 flex items-center gap-2">
          <Quote className="size-3.5 text-muted-foreground" aria-hidden />
          <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Örnek senaryo
          </p>
        </div>
        <div className="flex gap-3 text-sm leading-relaxed text-foreground">
          <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <div>{example}</div>
        </div>
      </div>

      {outputs ? (
        <div className="border-t border-border pt-6">
          <p className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {outputsTitle}
          </p>
          <div className="text-sm text-muted-foreground">{outputs}</div>
        </div>
      ) : null}
    </div>
  )
}

function PromptGuideSplit({ items, className }: PromptGuideSplitProps) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.title} className="bg-background p-5 sm:p-6">
          <p className="mb-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            {item.title}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

function PromptGuideList({ title, items, className }: PromptGuideListProps) {
  return (
    <ul className={cn("space-y-2", className)}>
      {title ? (
        <p className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {title}
        </p>
      ) : null}
      {items.map((item, index) => (
        <li key={index} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
          <Dot className="mt-1.5 size-4 shrink-0 text-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export { PromptGuide, PromptGuideList, PromptGuideSplit }
