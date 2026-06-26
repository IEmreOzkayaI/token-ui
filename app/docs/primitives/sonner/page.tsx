import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import SonnerDemo from "@/ui/components/sonner-demo"
import SonnerDescription from "@/ui/components/sonner-description"
import SonnerPosition from "@/ui/components/sonner-position"
import SonnerTypes from "@/ui/components/sonner-types"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: SonnerDemo,
    sourcePath: "ui/components/sonner-demo.tsx",
  },
  {
    id: "description",
    title: "Description",
    component: SonnerDescription,
    sourcePath: "ui/components/sonner-description.tsx",
  },
  {
    id: "position",
    title: "Position",
    component: SonnerPosition,
    sourcePath: "ui/components/sonner-position.tsx",
  },
  {
    id: "types",
    title: "Types",
    component: SonnerTypes,
    sourcePath: "ui/components/sonner-types.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "description", title: "Description", depth: 3 },
  { id: "position", title: "Position", depth: 3 },
  { id: "types", title: "Types", depth: 3 },
]

export default function SonnerPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Sonner"
        description="An opinionated toast notification component for React."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add sonner" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Sonner } from "@/primitives/sonner"`}
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
