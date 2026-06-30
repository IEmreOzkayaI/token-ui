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

Create documentation for: {component_name}

Component location: {component_path}

Available demos:
{examples_available}

Key props to document:
{key_props}

Primary use cases:
{use_cases}

Guidelines:
1. Create: app/docs/ui/components/{component_name}/page.tsx
2. Import ComponentExample, DocsPage, DocsSection, DocsCallout
3. Create examples array with all demo files
4. Use readSource() for code display
5. Structure:
   - DocsPageHeader with title/description
   - Overview section
   - Installation section
   - Examples section (ComponentExample for each demo)
   - Props documentation section
   - Best practices section (DocsCallout)
6. Show real examples with ComponentExample
7. Display source code with readSource

Return production-ready documentation page.`

export default function DocumentationPage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "usage", title: "Usage" }]}>
      <DocsPageHeader
        title="Documentation Generation"
        description="Create documentation page for component"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Generate complete documentation pages for components with live examples and prop documentation.
        </p>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-1">Documentation Structure</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Header with title and description</li>
              <li>• Overview of component purpose</li>
              <li>• Installation instructions</li>
              <li>• Live examples (ComponentExample)</li>
              <li>• Props table and documentation</li>
              <li>• Best practices (DocsCallout)</li>
            </ul>
          </CardContent>
        </Card>
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
