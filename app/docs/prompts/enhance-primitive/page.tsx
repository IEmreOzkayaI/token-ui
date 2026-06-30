"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent, CardHeader } from "@/primitives/card"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

const PROMPT = `You are a Token UI design system engineer.

Enhance existing primitive: {primitive_name}

Current location: ui/primitives/{primitive_name}.tsx

Enhancement type: {enhancement_type}

Changes required:
{changes}

Backwards compatibility: {backwards_compatibility}

Guidelines:
1. Review current CVA structure before adding changes
2. If adding variants/sizes, follow existing naming pattern
3. Maintain consistency with other variants
4. Update data-slot attributes if needed
5. Ensure accessibility maintained or improved
6. Test dark mode compatibility
7. Update exports if new variants added
8. Keep component API stable if possible

Return only the modified code sections with explanations.`

export default function EnhancePrimitivePage() {
  const [copied, setCopied] = useState(false)

  async function copyPrompt() {
    const ok = await copyToClipboard(PROMPT)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
      { id: "usage", title: "Usage" },
    ]}>
      <DocsPageHeader
        title="Existing Primitive Enhancement"
        description="Add variants, sizes, or accessibility to existing primitive"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Use this prompt when enhancing an existing primitive with new variants, sizes, or accessibility improvements.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When to Use</p>
              <p className="text-xs text-muted-foreground">
                Adding new variants, adding sizes, improving accessibility, refactoring styling, updating patterns
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When NOT to Use</p>
              <p className="text-xs text-muted-foreground">
                Creating entirely new primitive (use New Primitive), simple bug fixes, style tweaks
              </p>
            </CardContent>
          </Card>
        </div>

        <DocsCallout title="Enhancement Types" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• new-variant: Add new CVA variant option</li>
            <li>• new-size: Add new size option</li>
            <li>• a11y-improvement: Add accessibility features</li>
            <li>• refactor: Improve code quality while keeping API stable</li>
          </ul>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-4">
          Copy and fill in the enhancement details:
        </p>

        <div className="relative mb-6">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={copyPrompt}
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
