"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/primitives/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

const PROMPTS = [
  {
    id: "new-primitive",
    title: "1. New Primitive Generation",
    description: "Create new base UI component from scratch",
    when_use: "Creating foundational component, converting external library",
    when_not: "Adding to existing, creating full-featured component",
    template: `You are a Token UI design system engineer.

Create a new primitive component: {primitive_name}

Base element/primitive: {base_element}

Required features:
{features}

Variant options:
{variants}

Accessibility requirements:
{a11y_requirements}

Guidelines:
1. Use CVA (class-variance-authority) for variant management
2. Add data-slot="{primitive_name}" to root element
3. Support className prop for customization
4. Use cn() utility to merge classes
5. Export both component and {primitive_name}Variants
6. Support asChild pattern if composition needed
7. Include focus-visible and aria-invalid states
8. Support light/dark modes via Tailwind
9. Use CSS custom properties from app/globals.css for colors/spacing
10. Add TypeScript types for all props

File location: ui/primitives/{primitive_name}.tsx

Return complete, production-ready code.`,
  },
  {
    id: "enhance-primitive",
    title: "2. Existing Primitive Enhancement",
    description: "Add variants, sizes, or a11y to existing primitive",
    when_use: "Adding new variants, sizes, or accessibility features",
    when_not: "Creating entirely new primitive, bug fixes",
    template: `You are a Token UI design system engineer.

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

Return only the modified code sections with explanations.`,
  },
  {
    id: "new-component",
    title: "3. New Component Generation",
    description: "Create full-featured component combining primitives",
    when_use: "Full-featured component, combines multiple primitives",
    when_not: "Base primitives, just adding demos",
    template: `You are a Token UI design system engineer.

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
10. Create demo files (see #5)

Return:
1. Main component file(s)
2. Demo files structure
3. Documentation code example`,
  },
  {
    id: "variant-generation",
    title: "4. Component Variant Generation",
    description: "Add new visual variant to existing component",
    when_use: "New visual variant, alternative style for use case",
    when_not: "Adding size option, changing existing variant",
    template: `You are a Token UI design system engineer.

Add variant to component: {component_name}

Variant name: {variant_name}
Variant description: {variant_description}

Design tokens this variant uses:
{tokens_used}

Usage examples:
{examples}

Guidelines:
1. Add to existing CVA in ui/primitives/{component_name}.tsx
2. Follow existing variant naming pattern
3. Ensure proper contrast (WCAG AA)
4. Support light/dark mode
5. Add to component file: ui/components/{component_name}/{variant_name}.tsx
6. Keep variant file minimal (just demo)

Return:
1. Updated CVA with new variant
2. Component file showing the variant
3. Usage example`,
  },
  {
    id: "demo-generation",
    title: "5. Demo Generation",
    description: "Create demo file for component variant/size",
    when_use: "New variant demo, size variants, interactive demo",
    when_not: "Modifying component itself, creating docs page",
    template: `You are a Token UI design system engineer.

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

Return production-ready demo component.`,
  },
  {
    id: "documentation",
    title: "6. Documentation Generation",
    description: "Create documentation page for component",
    when_use: "Creating doc page for component, adding examples",
    when_not: "Just adding demos, updating existing docs",
    template: `You are a Token UI design system engineer.

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
8. Use semantic HTML and accessibility best practices

Return production-ready documentation page.`,
  },
  {
    id: "audit",
    title: "7. Design System Audit",
    description: "Review code for Token UI standards compliance",
    when_use: "Reviewing for consistency, auditing component",
    when_not: "General code review, bug fixes",
    template: `You are a Token UI design system engineer auditor.

Audit scope: {audit_scope}
Target: {target}
Focus areas: {focus_areas}

Audit against:

1. NAMING CONVENTIONS
   - Primitives: kebab-case, lowercase
   - Exports: PascalCase
   - Variants: kebab-case
   - data-slot: kebab-case with prefix

2. ARCHITECTURE
   - Uses CVA for variants
   - Has data-slot attributes
   - Supports className prop
   - Uses cn() for merging
   - Forwards all HTML props
   - TypeScript typed

3. TOKENS
   - Uses CSS custom properties from app/globals.css
   - No hardcoded colors/spacing
   - Respects token naming (gap/padding with variables)
   - Light/dark mode support

4. ACCESSIBILITY
   - focus-visible states
   - aria-invalid for errors
   - aria-* attributes as needed
   - Proper color contrast
   - WCAG AA compliant

5. STYLING
   - Uses Tailwind CSS
   - Uses data-attribute selectors
   - Supports container queries
   - Proper dark mode via .dark selector

6. DOCUMENTATION
   - Components documented
   - Props explained
   - Examples provided
   - Accessibility noted

Return audit report with:
- Compliance status (✅/❌) for each area
- Specific issues found
- Recommendations for fixes
- Priority level for each issue`,
  },
  {
    id: "refactor",
    title: "8. Refactor Prompt",
    description: "Improve code quality and readability",
    when_use: "Improving code quality, updating patterns",
    when_not: "Adding features, bug fixes, style tweaks",
    template: `You are a Token UI design system engineer.

Refactor: {target}

Refactor type: {refactor_type}

Current issues:
{current_issues}

Desired outcome:
{desired_outcome}

Token UI Standards to maintain:
- CVA for variant management
- data-slot attributes
- Composable sub-components if complex
- TypeScript types
- Accessibility features (focus-visible, aria-*)
- Support for light/dark mode
- CSS custom properties from app/globals.css
- cn() for class merging

Return:
1. Refactored code
2. Summary of changes
3. Breaking changes (if any)
4. Migration notes for users`,
  },
  {
    id: "a11y",
    title: "9. Accessibility Review",
    description: "Audit for WCAG compliance",
    when_use: "A11y compliance check, improving accessibility",
    when_not: "General code review, styling changes",
    template: `You are a Token UI accessibility specialist.

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
   - No keyboard traps

2. SCREEN READER
   - Proper semantic HTML (button, input, etc.)
   - ARIA roles/labels when needed
   - Text alternatives for icons
   - Proper heading hierarchy
   - Skip links if applicable

3. COLOR & CONTRAST
   - Text/background contrast >= 4.5:1 (AA)
   - Color not only information method
   - Alerts visible without color alone

4. MOTION & ANIMATIONS
   - Respects prefers-reduced-motion
   - Not flashing (> 3 times/sec)
   - Auto-play paused/controlled

5. FORMS & VALIDATION
   - Labels associated with inputs
   - Error messages clear
   - Required fields marked
   - Valid aria-invalid states

6. INTERACTIVE ELEMENTS
   - Proper focus states
   - Touch targets >= 44x44px
   - Proper ARIA attributes

Return:
1. Current a11y status
2. Issues found (with severity)
3. Specific fixes needed
4. Code changes required
5. Testing recommendations`,
  },
  {
    id: "token-audit",
    title: "10. Token Compliance Review",
    description: "Check design token usage",
    when_use: "Ensuring components use tokens correctly",
    when_not: "General code review, bug fixes",
    template: `You are a Token UI design system engineer - Token Compliance Officer.

Review token usage: {target}

Token categories to check: {token_categories}

Available tokens from app/globals.css:
- Colors: --primary, --secondary, --destructive, --success, --warning, --info, --muted, etc.
- Typography: --font-size-xs to --font-size-7xl, --font-weight-light to --font-weight-bold
- Spacing: --space-0 to --space-32
- Radius: --radius-sm to --radius-full
- Shadows: --shadow-none to --shadow-2xl
- Transitions: --transition-fast, --transition-base, --transition-slow
- Z-Index: --z-dropdown to --z-tooltip
- Opacity: --opacity-disabled, --opacity-hover, --opacity-focus

Compliance Check:

1. COLOR USAGE
   - All colors from token system?
   - Light/dark variants used?
   - No hardcoded hex/rgb values?

2. SPACING USAGE
   - Uses --space-* variables?
   - Consistent with 8px base?
   - Uses gap-(--variable) in Tailwind?

3. SIZING USAGE
   - Uses --font-size-* for text?
   - Uses proper units for dimensions?

4. SHADOW USAGE
   - Uses --shadow-* variables?
   - Proper elevation levels?

5. RADIUS USAGE
   - Uses --radius-* variables?
   - Semantic radius choice?

6. TRANSITIONS USAGE
   - Uses --transition-* variables?
   - Proper transition timing?

Return:
1. Compliance status (% compliant)
2. All hardcoded values found
3. Recommended token replacements
4. Code changes needed
5. Migration plan`,
  },
  {
    id: "migration",
    title: "11. Component Migration",
    description: "Convert legacy components to Token UI",
    when_use: "Converting legacy components, migrating from other systems",
    when_not: "Creating new components, refactoring existing Token UI",
    template: `You are a Token UI migration specialist.

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
   - Export variants CVA (e.g., buttonVariants)

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

Migration Steps:
1. Analyze current component
2. Map props to Token UI equivalents
3. Extract variants and sizes
4. Convert styling to Tailwind + CSS variables
5. Add accessibility features
6. Create demo files
7. Test dark mode
8. Create documentation

Return:
1. Migrated component(s)
2. Demo files
3. Migration guide
4. Breaking changes list
5. Testing checklist`,
  },
]

function PromptCard({ prompt }: { prompt: (typeof PROMPTS)[0] }) {
  const [copied, setCopied] = useState(false)

  async function copyPrompt() {
    const ok = await copyToClipboard(prompt.template)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{prompt.title}</CardTitle>
            <CardDescription>{prompt.description}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={copyPrompt}
            aria-label={copied ? "Copied" : "Copy prompt"}
          >
            {copied ? (
              <Check className="size-4 text-primary" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">When to use</p>
            <p className="text-sm text-muted-foreground">{prompt.when_use}</p>
          </div>
          <div>
            <p className="text-sm font-medium">When NOT to use</p>
            <p className="text-sm text-muted-foreground">{prompt.when_not}</p>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Template</p>
          <CodeBlock code={prompt.template} showLineNumbers={false} />
        </div>
      </CardContent>
    </Card>
  )
}

const toc = PROMPTS.map((p) => ({
  id: p.id,
  title: p.title,
}))

export default function PromptFrameworkPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Prompt Framework"
        description="12 optimized prompt templates for Token UI development. Copy-paste ready prompts for any design system task."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Token UI Prompt Framework provides comprehensive, repository-specific prompts for consistent design system development. Each prompt is optimized for the exact patterns, standards, and structure used in Token UI.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">12 Templates</p>
              <p className="text-xs text-muted-foreground">
                New primitives, components, variants, demos, docs, audits, refactors, accessibility, tokens, and migrations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">Copy-Paste Ready</p>
              <p className="text-xs text-muted-foreground">
                Each prompt is complete and ready to use immediately with your AI agent
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">Repository-Specific</p>
              <p className="text-xs text-muted-foreground">
                Optimized for Token UI's actual structure, patterns, and conventions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">Complete Documentation</p>
              <p className="text-xs text-muted-foreground">
                When to use, parameters, examples, and expected outputs for each
              </p>
            </CardContent>
          </Card>
        </div>
      </DocsSection>

      <div className="space-y-6">
        {PROMPTS.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      <DocsSection id="usage" title="Usage Tips">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Be Specific</h4>
            <p className="text-sm text-muted-foreground">
              Provide exact component names, file paths, and requirements. Generic prompts produce generic results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Include Examples</h4>
            <p className="text-sm text-muted-foreground">
              Show usage examples of what you want. "Show me what this should look like" is more effective than abstract descriptions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Reference Files</h4>
            <p className="text-sm text-muted-foreground">
              When relevant, include exact file locations and existing code. Paste related primitives or components for context.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Patterns</h4>
            <p className="text-sm text-muted-foreground">
              Align with existing Token UI patterns. Don't ask for new patterns or alternatives unless absolutely necessary.
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
