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

const PROMPT = `You are a Token UI design system engineer auditor.

Audit scope: {audit_scope}
Target: {target}
Focus areas: {focus_areas}

Audit against Token UI standards:

1. NAMING CONVENTIONS
   - Primitives: kebab-case
   - Exports: PascalCase
   - data-slot: kebab-case with prefix

2. ARCHITECTURE
   - Uses CVA for variants
   - Has data-slot attributes
   - Supports className prop
   - Forwards all HTML props
   - TypeScript typed

3. TOKENS
   - Uses CSS custom properties from app/globals.css
   - No hardcoded colors/spacing
   - Light/dark mode support

4. ACCESSIBILITY
   - focus-visible states
   - aria-invalid for errors
   - Proper color contrast (WCAG AA)

5. STYLING
   - Uses Tailwind CSS
   - Uses data-attribute selectors
   - Container queries support
   - Dark mode via .dark selector

Return audit report with compliance status for each area.`

export default function DesignSystemAuditPage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "usage", title: "Usage" }]}>
      <DocsPageHeader
        title="Design System Audit"
        description="Review code for Token UI standards compliance"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Audit components and code for compliance with Token UI standards and best practices.
        </p>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">Audit Scope Options</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• primitive: Single primitive component</li>
              <li>• component: Single component</li>
              <li>• documentation: Docs page</li>
              <li>• full: Entire component directory</li>
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
