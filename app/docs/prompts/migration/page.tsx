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

const PROMPT = `You are a Token UI migration specialist.

Migrate component: {source_component}
Target name: {target_name}
Migration scope: {migration_scope}

Token UI Standards (target format):

1. STRUCTURE
   - Location: {migration_scope === "primitive" ? "ui/primitives/" : "ui/components/"}
   - Use CVA for variants
   - data-slot attributes on all elements
   - Composable sub-components

2. PROPS
   - Support variant prop
   - Support size prop
   - Support className for customization
   - Forward all HTML props

3. EXPORTS
   - Named export: PascalCase
   - Export variants CVA

4. STYLING
   - Tailwind CSS only
   - CSS custom properties from app/globals.css
   - Support light/dark mode
   - Use data-attribute selectors

5. TYPES
   - TypeScript types for all props
   - VariantProps<typeof cva>
   - React.ComponentProps<"element">

6. A11Y
   - focus-visible states
   - aria-invalid states
   - Proper roles and labels
   - Color contrast checked

Return:
1. Migrated component(s)
2. Demo files
3. Migration guide
4. Breaking changes list
5. Testing checklist`

export default function MigrationPage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "usage", title: "Usage" }]}>
      <DocsPageHeader
        title="Component Migration"
        description="Convert legacy components to Token UI standard"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Migrate legacy or external components to Token UI patterns and standards.
        </p>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">Scope Options</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• primitive: Base component</li>
              <li>• component: Full-featured component</li>
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
