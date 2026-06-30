"use client"

import { Check, Copy } from "lucide-react"
import { ReactNode, useState } from "react"

import { Button } from "@/primitives/button"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { cn } from "@/lib/utils"

type DocsPageHeaderProps = {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  action?: ReactNode
}

export function DocsPageHeader({
  title,
  description,
  children,
  className,
  action,
}: DocsPageHeaderProps) {
  const [copied, setCopied] = useState(false)

  async function copyPage() {
    const ok = await copyToClipboard(window.location.href)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("space-y-3 pb-10", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">{description}</p>
          )}
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex items-center">
          {action}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={copyPage}
          >
            {copied ? (
              <Check className="size-3.5 text-primary" />
            ) : (
              <Copy className="size-3.5" />
            )}
            Copy Page
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}
