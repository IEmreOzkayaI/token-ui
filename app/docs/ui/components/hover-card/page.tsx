import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import HoverCardDemo from "@/ui/components/hover-card-demo"
import HoverCardSides from "@/ui/components/hover-card-sides"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: HoverCardDemo,
    sourcePath: "ui/components/hover-card-demo.tsx",
  },
  {
    id: "sides",
    title: "Sides",
    component: HoverCardSides,
    sourcePath: "ui/components/hover-card-sides.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "sides", title: "Sides", depth: 3 },
]

export default function HoverCardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="HoverCard"
        description="A card that appears when hovering over a trigger element."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add hover-card" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { HoverCard } from "@/primitives/hover-card"`}
        />
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <DocsSection
                key={example.id}
                id={example.id}
                title={example.title}
              >
                <ComponentExample
                  source={readSource(example.sourcePath)}
                >
                  <Component />
                </ComponentExample>
              </DocsSection>
            )
          })}
        </div>
      </DocsSection>
    </DocsPage>
  )
}
