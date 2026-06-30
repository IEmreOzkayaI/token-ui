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

const PROMPT = `You are a Token UI design system engineer - Token Compliance Officer.

Review token usage: {target}

Token categories to check: {token_categories}

Available tokens from app/globals.css:
- Colors: --primary, --secondary, --destructive, --success, --warning, --info, --muted
- Typography: --font-size-xs to --font-size-7xl, --font-weight-light to --font-weight-bold
- Spacing: --space-0 to --space-32
- Radius: --radius-sm to --radius-full
- Shadows: --shadow-none to --shadow-2xl
- Transitions: --transition-fast, --transition-base, --transition-slow
- Z-Index: --z-dropdown to --z-tooltip
- Opacity: --opacity-disabled, --opacity-hover, --opacity-focus

Compliance Check:

1. COLOR USAGE - All from token system? No hardcoded hex?
2. SPACING USAGE - Uses --space-*? Uses gap-(--variable)?
3. SIZING USAGE - Uses --font-size-*?
4. SHADOW USAGE - Uses --shadow-*?
5. RADIUS USAGE - Uses --radius-*?
6. TRANSITIONS USAGE - Uses --transition-*?

Return:
1. Compliance status (% compliant)
2. Hardcoded values found
3. Recommended replacements
4. Migration plan`

export default function TokenCompliancePage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "usage", title: "Usage" }]}>
      <DocsPageHeader
        title="Token Compliance Review"
        description="Check design token usage and consistency"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Ensure components use design tokens correctly and avoid hardcoded values.
        </p>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">Token Categories</p>
            <p className="text-xs text-muted-foreground">
              Colors, Typography, Spacing, Radius, Shadows, Transitions, Z-Index, Opacity
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
