"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent } from "@/primitives/card"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

const PROMPT = `You are a Token UI design system engineer.

Create demo file for component: {component_name}

Demo type: {demo_type}
Demo file name: {demo_name}.tsx
Demo purpose: {demo_content}

Guidelines:
1. Location: ui/components/{component_name}/{demo_name}.tsx
2. Import from @/primitives/{component_name} or @/components/{component_name}
3. Keep demo simple and focused
4. Show only one thing (one variant, all sizes, or interactive example)
5. Use semantic HTML when possible
6. Include accessibility attributes (aria-label, role, etc.)
7. For interactive demos: use useState from react
8. For variant demos: show variant prop values
9. For size demos: show all size options side by side
10. Use Lucide React icons if needed

Return production-ready demo component.`

export default function DemoGenerationPage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "usage", title: "Usage" }]}>
      <DocsPageHeader
        title="Demo Generation"
        description="Create demo file for component variant/size"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Create focused demo files showcasing single variant, sizes, or interactive examples.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When to Use</p>
              <p className="text-xs text-muted-foreground">
                New variant demo, size variants, interactive demo with state
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">Demo Types</p>
              <p className="text-xs text-muted-foreground">
                variant, size, interactive, state
              </p>
            </CardContent>
          </Card>
        </div>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <div className="relative mb-6">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={async () => {
              const ok = await copyToClipboard(PROMPT)
              if (ok) {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }
            }}
            className="absolute top-4 right-4 z-10"
          >
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
          </Button>
          <CodeBlock code={PROMPT} showLineNumbers={false} />
        </div>
      </DocsSection>
    </DocsPage>
  )
}
