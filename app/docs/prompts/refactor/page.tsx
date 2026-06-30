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

Refactor: {target}

Refactor type: {refactor_type}

Current issues:
{current_issues}

Desired outcome:
{desired_outcome}

Token UI Standards to maintain:
- CVA for variant management
- data-slot attributes
- Composable sub-components
- TypeScript types
- Accessibility features (focus-visible, aria-*)
- Light/dark mode support
- CSS custom properties from app/globals.css
- cn() for class merging

Return:
1. Refactored code
2. Summary of changes
3. Breaking changes (if any)
4. Migration notes for users`

export default function RefactorPage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "usage", title: "Usage" }]}>
      <DocsPageHeader
        title="Refactor Prompt"
        description="Improve code quality and readability"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Refactor code to improve quality, consistency, and maintainability while preserving Token UI standards.
        </p>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">Refactor Types</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• modernize: Update to latest patterns</li>
              <li>• simplify: Reduce complexity</li>
              <li>• performance: Optimize execution</li>
              <li>• consistency: Align with standards</li>
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
