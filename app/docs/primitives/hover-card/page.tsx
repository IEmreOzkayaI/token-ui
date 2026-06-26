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
    { id: "demo", title: "Demo" },
    { id: "sides", title: "Sides" },
]

export default function HoverCardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="HoverCard"
        description="HoverCard component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the hover-card primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add hover-card" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the HoverCard component."
      >
        <CodeBlock
          code={`import { HoverCard } from "@/primitives/hover-card"`}
        />
      </DocsSection>

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
    </DocsPage>
  )
}
