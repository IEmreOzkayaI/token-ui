"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/primitives/card"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { PromptPlayground } from "@/app/docs/_components/prompt-playground"

const PROMPT = `You are a Token UI design system engineer.

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

Return complete, production-ready code.`

export default function NewPrimitivePage() {
  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
      { id: "playground", title: "Playground" },
    ]}>
      <DocsPageHeader
        title="New Primitive Generation"
        description="Create new base UI component from scratch"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Use this prompt when creating a new foundational primitive component. A primitive is a base UI component that combines with others to create full-featured components.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When to Use</p>
              <p className="text-xs text-muted-foreground">
                Creating foundational component, converting external library component to Token UI, building new base element
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When NOT to Use</p>
              <p className="text-xs text-muted-foreground">
                Adding to existing primitive, creating full-featured component, just adding a variant
              </p>
            </CardContent>
          </Card>
        </div>

        <DocsCallout title="Key Points" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• Primitives are base components in ui/primitives/</li>
            <li>• Use CVA (class-variance-authority) for variants</li>
            <li>• Add data-slot attributes to all elements</li>
            <li>• Export both component and variants CVA</li>
            <li>• Support composable sub-components if needed</li>
            <li>• Include accessibility features from the start</li>
          </ul>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="playground" title="Prompt Playground">
        <PromptPlayground
          basePrompt={PROMPT}
          parameters={[
            {
              key: "primitive_name",
              label: "Primitive Name",
              placeholder: "e.g., toggle, badge, toggle-group",
              type: "text",
              defaultValue: "toggle-group",
            },
            {
              key: "base_element",
              label: "Base Element/Primitive",
              placeholder: "e.g., button, div, input",
              type: "text",
              defaultValue: "div",
            },
            {
              key: "features",
              label: "Required Features",
              placeholder: "List features line by line",
              type: "textarea",
              defaultValue: "- Multiple toggle buttons\n- Selection state management\n- Single or multiple selection modes\n- Keyboard navigation (arrow keys)",
            },
            {
              key: "variants",
              label: "Variant Options",
              placeholder: "e.g., default, outline, ghost, Size: sm, default, lg",
              type: "textarea",
              defaultValue: "- default, outline, ghost\n- Size: sm, default, lg",
            },
            {
              key: "a11y_requirements",
              label: "Accessibility Requirements",
              placeholder: "Keyboard nav, ARIA labels, etc.",
              type: "textarea",
              defaultValue: "- ARIA roles for button group\n- Keyboard navigation with arrow keys\n- Proper focus management\n- Screen reader support",
            },
          ]}
          example={{
            title: "Example: toggle-group primitive",
            content: `You are a Token UI design system engineer.

Create a new primitive component: toggle-group

Base element/primitive: div

Required features:
- Multiple toggle buttons that can be selected together or mutually exclusive
- Manage selection state
- Support single or multiple selection modes
- Keyboard navigation (arrow keys)

Variant options:
- default, outline, ghost
- Size: sm, default, lg

Accessibility requirements:
- ARIA roles for button group
- Keyboard navigation with arrow keys
- Proper focus management
- Screen reader support

Guidelines:
[same as template above]`,
          }}
        />
      </DocsSection>
    </DocsPage>
  )
}
