"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"

type CodeBlockProps = {
  code: string
  className?: string
  showCopy?: boolean
  showLineNumbers?: boolean
  variant?: "standalone" | "embedded"
}

function CodeLines({
  code,
  showLineNumbers,
  startLine = 1,
  className,
}: {
  code: string
  showLineNumbers?: boolean
  startLine?: number
  className?: string
}) {
  const lines = code.split("\n")

  return (
    <code className={cn("block font-mono text-[13px] leading-6", className)}>
      {lines.map((line, index) => (
        <div key={`${startLine + index}-${line}`} className="flex">
          {showLineNumbers && (
            <span className="inline-block w-10 shrink-0 pr-4 text-right text-muted-foreground/50 select-none">
              {startLine + index}
            </span>
          )}
          <span className="flex-1 whitespace-pre">{line || " "}</span>
        </div>
      ))}
    </code>
  )
}

export function CodeBlock({
  code,
  className,
  showCopy = true,
  showLineNumbers = true,
  variant = "standalone",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isEmbedded = variant === "embedded"

  return (
    <div className={cn("group relative", className)}>
      {showCopy && (
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(
            "absolute top-2 right-2 z-10",
            isEmbedded
              ? "text-muted-foreground hover:text-foreground"
              : "opacity-0 transition-opacity group-hover:opacity-100"
          )}
          onClick={copyCode}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="size-3.5 text-green-600" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
      )}
      <pre
        className={cn(
          "overflow-x-auto p-4",
          isEmbedded
            ? "max-h-[min(70vh,650px)] bg-muted/50"
            : "rounded-lg border bg-muted/50"
        )}
      >
        <CodeLines code={code} showLineNumbers={showLineNumbers} />
      </pre>
    </div>
  )
}

const PEEK_LINES = 3

type CollapsibleCodeBlockProps = {
  code: string
}

export function CollapsibleCodeBlock({ code }: CollapsibleCodeBlockProps) {
  const [expanded, setExpanded] = useState(false)
  const lines = code.split("\n")
  const peek = lines.slice(0, PEEK_LINES).join("\n")

  if (expanded) {
    return (
      <div className="border-t bg-muted/50">
        <CodeBlock
          code={code}
          variant="embedded"
          className="[&_pre]:max-h-[min(70vh,650px)] [&_pre]:rounded-none [&_pre]:border-0"
        />
      </div>
    )
  }

  return (
    <div className="relative border-t bg-muted/50">
      <pre className="overflow-hidden px-4 pt-4 pb-12 font-mono text-[13px] leading-6 text-muted-foreground/40">
        <CodeLines code={peek} showLineNumbers startLine={1} />
      </pre>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-muted/50 from-40% to-transparent px-4 pt-10 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="pointer-events-auto bg-background shadow-sm"
          onClick={() => setExpanded(true)}
        >
          View Code
        </Button>
      </div>
    </div>
  )
}
