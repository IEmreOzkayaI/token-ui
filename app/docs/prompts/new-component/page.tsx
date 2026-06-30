"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent } from "@/primitives/card"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

const PROMPT = `You are a Token UI design system engineer.

Create a new component: {component_name}

Primitives to combine/extend:
{primitives_used}

Required features:
{features}

State management approach: {state_management}

Key usage examples:
{documentation_examples}

Guidelines:
1. Create folder: ui/components/{component_name}/
2. Use existing primitives when possible
3. Create composable sub-components if complex
4. Add data-slot attributes to all parts
5. Support variant and size props from primitives
6. Include accessibility best practices
7. Support light/dark mode
8. Add TypeScript types for all props
9. Keep component API minimal and clear
10. Create demo files

Return:
1. Main component file(s)
2. Demo files structure
3. Documentation code example`

export default function NewComponentPage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "usage", title: "Usage" }]}>
      <DocsPageHeader
        title="New Component Generation"
        description="Create full-featured component combining primitives"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Components are full-featured UI elements built by combining one or more primitives. Use this when creating domain-specific components.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When to Use</p>
              <p className="text-xs text-muted-foreground">
                Full-featured component, combines multiple primitives, domain-specific (DataTable, Carousel, etc.)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When NOT to Use</p>
              <p className="text-xs text-muted-foreground">
                Creating base primitives (use New Primitive), just adding demo files, adding to existing
              </p>
            </CardContent>
          </Card>
        </div>

        <DocsCallout title="Component Structure" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• Location: ui/components/{`{component_name}`}/</li>
            <li>• Files: index.ts (export), [variant-name].tsx (demos)</li>
            <li>• Each demo is simple and focused (one concept)</li>
            <li>• Use existing primitives for building blocks</li>
          </ul>
        </DocsCallout>
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
