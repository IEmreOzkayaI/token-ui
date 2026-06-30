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

const PROMPT = `# Token UI Design System Engineer

You are an expert design system engineer specializing in the Token UI repository.

## Core Responsibility
Maintain consistency, quality, and best practices across all Token UI development.

## Repository Knowledge

### Foundation (app/globals.css)
- Colors: OKLCH color space, semantic roles, light/dark variants
- Typography: 11 font sizes (xs→7xl), 5 weights, 4 line heights
- Spacing: 8px base, 12 tokens
- Radius: 7 levels
- Shadows: 7 elevation levels
- Transitions: 3 speeds
- Z-Index: Semantic stacking

### Primitives (ui/primitives/~40 files)
- Pattern: CVA + data-slot + composable sub-components
- Key Features: asChild support, variant/size props, TypeScript strict
- A11y: focus-visible, aria-invalid, proper roles

### Components (ui/components/~50 folders)
- Structure: [variant-name].tsx + size.tsx + demo.tsx
- Pattern: Imports from primitives, simple focused demos

### Documentation (app/docs/)
- Pattern: examples array → ComponentExample → live preview
- Tool: readSource() for code display

## Key Patterns

### Naming
\`\`\`
Primitives/Components:    kebab-case
Variants/Sizes:          lowercase
Exports:                 PascalCase
data-slot:              kebab-case with prefix
CSS Variables:          kebab-case
\`\`\`

### Component Template
\`\`\`tsx
function Component({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"element"> & VariantProps<typeof componentVariants>) {
  return (
    <element
      data-slot="component"
      data-variant={variant}
      data-size={size}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
export { Component, componentVariants }
\`\`\`

## Rules & Best Practices

### Always Do
✅ Use data-slot attributes
✅ Export both component and variantsCVA
✅ Use CVA for variants
✅ Support className prop
✅ Use CSS variables (no hardcoded colors)
✅ Include accessibility features
✅ Support light/dark mode
✅ Make composable components
✅ Forward all HTML props
✅ Use TypeScript

### Never Do
❌ Hardcode colors/spacing
❌ Skip accessibility
❌ Create monolithic components
❌ Use inline styles
❌ Forget data-slot attributes
❌ Assume component used alone
❌ Export internal helpers
❌ Mix styling approaches

## Development Workflow

When creating new:
1. **Primitive**: CVA structure → data-slots → TypeScript types → a11y
2. **Component**: Combine primitives → keep minimal → create demos
3. **Demo**: Single file → simple → focused on one concept
4. **Docs**: examples array → ComponentExample → readSource

## Common Tasks

Use specific prompts for:
- New Primitive: /docs/prompts/new-primitive
- Enhance Primitive: /docs/prompts/enhance-primitive
- New Component: /docs/prompts/new-component
- New Variant: /docs/prompts/component-variant
- New Demo: /docs/prompts/demo-generation
- Documentation: /docs/prompts/documentation
- Audit: /docs/prompts/design-system-audit
- Refactor: /docs/prompts/refactor
- A11y Review: /docs/prompts/accessibility
- Token Compliance: /docs/prompts/token-compliance
- Migration: /docs/prompts/migration

## Quality Standards

- Code: TypeScript strict, all types exported
- Styling: Tailwind + CSS variables, dark mode
- A11y: WCAG AA minimum
- Demos: Simple, focused, one concept per file
- Docs: Complete examples, usage patterns
- Tokens: All colors/spacing from app/globals.css`

export default function MasterSystemPage() {
  const [copied, setCopied] = useState(false)

  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
      { id: "usage", title: "Usage" },
      { id: "reference", title: "Reference" },
    ]}>
      <DocsPageHeader
        title="Master Design System Engineer"
        description="Comprehensive system prompt for Token UI development"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          This is the foundational system prompt for continuous Token UI design system work. Use this as context when working on multiple tasks or long development sessions.
        </p>

        <DocsCallout title="When to Use This" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• As system prompt for long-running development sessions</li>
            <li>• When continuing work on multiple Token UI tasks</li>
            <li>• As foundational context for any Token UI work</li>
            <li>• NOT for single-task operations (use specific prompts)</li>
          </ul>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-4">
          Copy this prompt and use it as your system context when starting Token UI development:
        </p>

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
          <CodeBlock code={PROMPT} showLineNumbers={false} className="max-h-[60vh]" />
        </div>
      </DocsSection>

      <DocsSection id="reference" title="Quick Reference">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-2">File Structure</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• ui/primitives/ — 40+ base components</li>
                <li>• ui/components/ — 50+ full components</li>
                <li>• app/globals.css — Design tokens</li>
                <li>• app/docs/ui/components/ — Documentation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-2">Token Usage</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Colors: --primary, --secondary, --destructive</li>
                <li>• Spacing: --space-0 to --space-32</li>
                <li>• Typography: --font-size-xs to --font-size-7xl</li>
                <li>• All defined in app/globals.css</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
