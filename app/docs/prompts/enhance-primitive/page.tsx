"use client"

import { Card, CardContent } from "@/primitives/card"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { PromptPlayground } from "@/app/docs/_components/prompt-playground"

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
  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
      { id: "playground", title: "Playground" },
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
                Adding new variants, sizes, improving accessibility, refactoring styling
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When NOT to Use</p>
              <p className="text-xs text-muted-foreground">
                Creating new primitive, simple bug fixes, style tweaks
              </p>
            </CardContent>
          </Card>
        </div>

        <DocsCallout title="Enhancement Types" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• new-variant: Add new CVA variant option</li>
            <li>• new-size: Add new size option</li>
            <li>• a11y-improvement: Add accessibility features</li>
            <li>• refactor: Improve code quality</li>
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
              placeholder: "e.g., button, input, badge",
              type: "text",
              defaultValue: "button",
            },
            {
              key: "enhancement_type",
              label: "Enhancement Type",
              placeholder: "new-variant, new-size, a11y-improvement, or refactor",
              type: "text",
              defaultValue: "new-variant",
            },
            {
              key: "changes",
              label: "Changes Required",
              placeholder: "Describe specific changes",
              type: "textarea",
              defaultValue: "Add 'premium' variant that uses accent colors and elevated shadow\nMake available for all sizes\nIncrease padding slightly",
            },
            {
              key: "backwards_compatibility",
              label: "Backwards Compatibility",
              placeholder: "yes or no",
              type: "text",
              defaultValue: "yes",
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
