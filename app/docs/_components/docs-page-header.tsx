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
}

export function DocsPageHeader({
  title,
  description,
  children,
  className,
}: DocsPageHeaderProps) {
  const [copied, setCopied] = useState(false)

  async function copyPage() {
    const ok = await copyToClipboard(window.location.href)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("space-y-2 pb-8", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="hidden shrink-0 gap-2 sm:flex"
          onClick={copyPage}
        >
          {copied ? (
            <Check className="size-3.5 text-green-600" />
          ) : (
            <Copy className="size-3.5" />
          )}
          Copy Page
        </Button>
      </div>
      {children}
    </div>
  )
}
