import { ReactNode } from "react"

import { DocsPager } from "@/app/docs/_components/docs-pager"
import { DocsToc } from "@/app/docs/_components/docs-toc"
import type { TocItem } from "@/app/docs/_lib/toc"
import { cn } from "@/lib/utils"

type DocsPageProps = {
  children: ReactNode
  toc?: TocItem[]
  className?: string
}

export function DocsPage({ children, toc = [], className }: DocsPageProps) {
  return (
    <div className={cn("relative mx-auto flex w-full max-w-5xl gap-12", className)}>
      <div className="min-w-0 flex-1 space-y-8">
        <div className="docs-prose">{children}</div>
        <DocsPager />
      </div>
      <div className="hidden w-56 shrink-0 xl:block">
        <div className="sticky top-20">
          <DocsToc items={toc} />
        </div>
      </div>
    </div>
  )
}
