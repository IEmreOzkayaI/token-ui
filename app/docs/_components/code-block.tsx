"use client"

import { Check, Copy, ChevronUp } from "lucide-react"
import { useState } from "react"

import { Button } from "@/primitives/button"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { cn } from "@/lib/utils"
import { tokenizeJSON, getTokenColor } from "@/app/docs/_lib/syntax-highlighter"

type CodeBlockProps = {
  code: string
  className?: string
  showCopy?: boolean
  showLineNumbers?: boolean
  variant?: "standalone" | "embedded"
  language?: string
}

function CodeLines({
  code,
  showLineNumbers,
  startLine = 1,
  className,
  isDark = true,
}: {
  code: string
  showLineNumbers?: boolean
  startLine?: number
  className?: string
  isDark?: boolean
}) {
  const lines = code.split("\n")

  return (
    <code className={cn("block font-mono text-[13px] leading-6", className)}>
      {lines.map((line, index) => {
        const tokens = tokenizeJSON(line)
        return (
          <div key={`${startLine + index}-${line}`} className="flex">
            {showLineNumbers && (
              <span className={cn(
                "inline-block w-10 shrink-0 pr-4 text-right select-none",
                isDark ? "text-muted-foreground/50" : "text-muted-foreground/60"
              )}>
                {startLine + index}
              </span>
            )}
            <span className="flex-1 whitespace-pre">
              {tokens.map((token, i) => (
                <span
                  key={i}
                  className={token.type === "whitespace" ? "" : getTokenColor(token.type, isDark)}
                >
                  {token.value}
                </span>
              ))}
            </span>
          </div>
        )
      })}
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
  const [failed, setFailed] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useState(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  async function copyCode() {
    const ok = await copyToClipboard(code)
    if (ok) {
      setCopied(true)
      setFailed(false)
      setTimeout(() => setCopied(false), 2000)
      return
    }

    setFailed(true)
    setTimeout(() => setFailed(false), 3000)
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
          aria-label={failed ? "Copy failed" : "Copy code"}
        >
          {copied ? (
            <Check className="size-3.5 text-primary" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
      )}
      <pre
        className={cn(
          "overflow-x-auto p-4",
          isEmbedded
            ? "max-h-[min(70vh,650px)] bg-foreground/5"
            : "rounded-lg border border-border/50 bg-foreground/5"
        )}
      >
        <CodeLines code={code} showLineNumbers={showLineNumbers} isDark={isDark} />
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
  const [isDark, setIsDark] = useState(true)

  useState(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const lines = code.split("\n")
  const peek = lines.slice(0, PEEK_LINES).join("\n")

  if (expanded) {
    return (
      <div className="border-t border-border/30 bg-foreground/5 relative">
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-2 right-10 z-10 text-muted-foreground hover:text-foreground"
          onClick={() => setExpanded(false)}
          aria-label="Collapse code"
        >
          <ChevronUp className="size-3.5" />
        </Button>
        <CodeBlock
          code={code}
          variant="embedded"
          className="[&_pre]:max-h-[min(70vh,650px)] [&_pre]:rounded-none [&_pre]:border-0"
        />
      </div>
    )
  }

  return (
    <div className="relative border-t border-border/30 bg-foreground/5">
      <pre className="overflow-hidden px-4 pt-4 pb-12 font-mono text-[13px] leading-6 text-muted-foreground/40">
        <CodeLines code={peek} showLineNumbers startLine={1} isDark={isDark} />
      </pre>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-foreground/5 from-40% to-transparent px-4 pt-10 pb-4">
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
