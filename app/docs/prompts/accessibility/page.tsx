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

const PROMPT = `You are a Token UI accessibility specialist.

Review accessibility: {target}

WCAG Compliance level: {wcag_level}

Specific concerns:
{specific_concerns}

User groups to prioritize:
{user_groups}

A11Y Checklist:

1. KEYBOARD NAVIGATION
   - Tab order logical
   - Focus visible
   - All interactive elements keyboard accessible

2. SCREEN READER
   - Proper semantic HTML
   - ARIA roles/labels when needed
   - Text alternatives for icons

3. COLOR & CONTRAST
   - Text/background contrast >= 4.5:1 (AA)
   - Color not only information method

4. MOTION & ANIMATIONS
   - Respects prefers-reduced-motion
   - Not flashing (> 3 times/sec)

5. FORMS & VALIDATION
   - Labels associated with inputs
   - Error messages clear
   - aria-invalid states

6. INTERACTIVE ELEMENTS
   - Proper focus states
   - Touch targets >= 44x44px

Return:
1. Current a11y status
2. Issues found (with severity)
3. Specific fixes needed
4. Code changes required`

export default function AccessibilityPage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "usage", title: "Usage" }]}>
      <DocsPageHeader
        title="Accessibility Review"
        description="Audit for WCAG compliance"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Audit components for accessibility compliance and WCAG standards.
        </p>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">Compliance Levels</p>
            <p className="text-xs text-muted-foreground">
              AA (minimum) or AAA (enhanced). Most components should target AA.
            </p>
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
