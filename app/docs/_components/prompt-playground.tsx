"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent } from "@/primitives/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { cn } from "@/lib/utils"

export type PromptParameter = {
  key: string
  label: string
  placeholder: string
  type?: "text" | "textarea"
  defaultValue?: string
}

type PromptPlaygroundProps = {
  basePrompt: string
  parameters: PromptParameter[]
  example?: {
    title: string
    content: string
  }
}

export function PromptPlayground({
  basePrompt,
  parameters,
  example,
}: PromptPlaygroundProps) {
  const [copied, setCopied] = useState(false)
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(
      parameters.map((p) => [p.key, p.defaultValue || ""])
    )
  )

  const generatePrompt = () => {
    let result = basePrompt
    Object.entries(values).forEach(([key, value]) => {
      const placeholder = `{${key}}`
      result = result.replace(new RegExp(placeholder, "g"), value || `{${key}}`)
    })
    return result
  }

  const finalPrompt = generatePrompt()

  async function copyPrompt() {
    const ok = await copyToClipboard(finalPrompt)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tabs defaultValue="usage" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      <TabsContent value="usage" className="space-y-4">
        <div>
          <h4 className="font-semibold mb-3">Parameters to Replace</h4>
          <div className="space-y-2">
            {parameters.map((param) => (
              <div key={param.key}>
                <code className="bg-foreground/10 px-2 py-1 rounded text-xs">
                  {`{${param.key}}`}
                </code>
                <p className="text-sm text-muted-foreground mt-1">
                  {param.placeholder}
                </p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="example" className="space-y-4">
        {example ? (
          <div>
            <h4 className="font-semibold mb-3">{example.title}</h4>
            <CodeBlock code={example.content} showLineNumbers={false} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No example available</p>
        )}
      </TabsContent>

      <TabsContent value="create" className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Fill in the parameters below to generate your custom prompt:
        </p>
        <div className="space-y-4">
          {parameters.map((param) => (
            <div key={param.key}>
              <label htmlFor={param.key} className="text-sm font-medium block mb-2">
                {param.label}
              </label>
              {param.type === "textarea" ? (
                <textarea
                  id={param.key}
                  value={values[param.key] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [param.key]: e.target.value }))
                  }
                  placeholder={param.placeholder}
                  className={cn(
                    "w-full min-h-24 rounded-lg border border-border/50 bg-foreground/5 px-3 py-2 text-sm",
                    "outline-none focus:border-foreground/30 focus:bg-foreground/10 transition-colors",
                    "placeholder:text-muted-foreground/40"
                  )}
                />
              ) : (
                <input
                  id={param.key}
                  type="text"
                  value={values[param.key] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [param.key]: e.target.value }))
                  }
                  placeholder={param.placeholder}
                  className={cn(
                    "w-full rounded-lg border border-border/50 bg-foreground/5 px-3 py-2 text-sm",
                    "outline-none focus:border-foreground/30 focus:bg-foreground/10 transition-colors",
                    "placeholder:text-muted-foreground/40"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="preview" className="space-y-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={copyPrompt}
            className="absolute top-4 right-4 z-10"
            aria-label={copied ? "Copied" : "Copy prompt"}
          >
            {copied ? (
              <Check className="size-4 text-primary" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
          <CodeBlock code={finalPrompt} showLineNumbers={false} />
        </div>
        <div className="text-xs text-muted-foreground">
          <p className="mb-2">
            {Object.values(values).some((v) => !v) ? (
              <span className="text-yellow-600">
                ⚠️ Some parameters are empty. Fill them in the "Create" tab to complete the prompt.
              </span>
            ) : (
              <span className="text-primary">✓ All parameters filled. Ready to copy!</span>
            )}
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
