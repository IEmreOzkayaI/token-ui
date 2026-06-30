import Link from "next/link"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { Card, CardContent } from "@/primitives/card"

const PROMPTS = [
  {
    group: "Building",
    items: [
      {
        href: "/docs/prompts/new-primitive",
        title: "New Primitive",
        description: "Build a base component from scratch — CVA, data-slot, TypeScript, accessibility. Use this when nothing in ui/primitives/ fits.",
      },
      {
        href: "/docs/prompts/enhance-primitive",
        title: "Enhance Primitive",
        description: "Add variants, sizes, or accessibility improvements to an existing primitive without breaking existing usage.",
      },
      {
        href: "/docs/prompts/new-component",
        title: "New Component",
        description: "Compose a full-featured UI element from existing primitives. For domain-specific components like stat cards, data tables, carousels.",
      },
      {
        href: "/docs/prompts/from-scratch",
        title: "From Scratch",
        description: "Build anything — primitive or component — with a detailed spec. Best when requirements are complex or involve multiple interactions.",
      },
    ],
  },
  {
    group: "Extending",
    items: [
      {
        href: "/docs/prompts/derive-variant",
        title: "Component Variant",
        description: "Add a new visual variant to an existing component's CVA definition. Includes a focused demo file.",
      },
      {
        href: "/docs/prompts/modify-existing",
        title: "Modify Existing",
        description: "Apply targeted, scoped changes to one component or variant. Preserves all surrounding code.",
      },
      {
        href: "/docs/prompts/demo-generation",
        title: "Demo Generation",
        description: "Create a focused demo file for a component — variant, size, interactive, or state. One concept per file.",
      },
    ],
  },
  {
    group: "Quality & Maintenance",
    items: [
      {
        href: "/docs/prompts/refactor",
        title: "Refactor",
        description: "Improve code quality — consistency, simplification, modernization, or performance — while keeping Token UI standards intact.",
      },
      {
        href: "/docs/prompts/migration",
        title: "Migration",
        description: "Convert legacy or external components (shadcn, other design systems) to Token UI patterns.",
      },
      {
        href: "/docs/prompts/design-system-audit",
        title: "Design System Audit",
        description: "Audit a component for naming, architecture, token usage, accessibility, and documentation compliance.",
      },
      {
        href: "/docs/prompts/token-compliance",
        title: "Token Compliance",
        description: "Scan a file for hardcoded values (hex colors, px spacing, arbitrary shadows) and get token replacements.",
      },
      {
        href: "/docs/prompts/accessibility",
        title: "Accessibility Review",
        description: "Audit keyboard navigation, screen reader support, ARIA attributes, color contrast, and touch targets against WCAG AA.",
      },
    ],
  },
  {
    group: "Documentation",
    items: [
      {
        href: "/docs/prompts/documentation",
        title: "Documentation",
        description: "Generate a complete docs page for a component — live examples, props table, usage patterns, best practices.",
      },
    ],
  },
]

export default function PromptsPage() {
  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
      { id: "how-it-works", title: "How It Works" },
      { id: "prompts", title: "Prompts" },
    ]}>
      <DocsPageHeader
        title="Prompt Framework"
        description="Ready-made prompts that instruct AI to build Token UI components correctly — following your exact codebase patterns."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI's prompt framework solves a specific problem: AI models write generic React components by default. They don't know your CVA structure, your CSS variable names, your data-slot conventions, or which primitives already exist.
        </p>
        <p className="text-muted-foreground mb-6">
          Each prompt in this framework includes a <strong className="text-foreground">CODEBASE REFERENCE</strong> section that tells the AI to read your actual files before writing anything — <code className="text-xs bg-muted px-1 py-0.5 rounded">app/globals.css</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">ui/primitives/*</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">ui/components/*</code>, and <code className="text-xs bg-muted px-1 py-0.5 rounded">app/docs/foundations/*</code>. The result is code that looks like it was written by someone who knows the codebase.
        </p>
        <DocsCallout title="When to use these prompts" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• Use the <strong>interactive generator</strong> on each prompt page to fill in your parameters</li>
            <li>• Copy the generated prompt and paste it into Claude Code, Cursor, or any AI coding tool</li>
            <li>• The AI reads your codebase first, then produces code that matches your patterns</li>
          </ul>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="how-it-works" title="How It Works">
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-semibold mb-1">1. Fill in the form</p>
              <p className="text-xs text-muted-foreground">Each prompt page has a generator. Open it with the "Create" button and fill in your component name, features, variants, etc.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-semibold mb-1">2. Copy the prompt</p>
              <p className="text-xs text-muted-foreground">The right panel shows the formatted prompt with your values highlighted. Copy it with one click.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-semibold mb-1">3. Paste into AI</p>
              <p className="text-xs text-muted-foreground">The AI reads your codebase files, learns your patterns, and produces code that fits — no manual corrections needed.</p>
            </CardContent>
          </Card>
        </div>
        <DocsCallout title="Works best with Claude Code or Cursor" variant="default">
          <p className="text-sm">These prompts assume the AI has filesystem access to read your codebase. They work with any tool that can read files — Claude Code, Cursor, Windsurf, or Copilot Workspace.</p>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="prompts" title="Prompts">
        <div className="space-y-10">
          {PROMPTS.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{group.group}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="block">
                    <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="pt-5 pb-5">
                        <p className="text-sm font-semibold mb-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocsSection>
    </DocsPage>
  )
}
