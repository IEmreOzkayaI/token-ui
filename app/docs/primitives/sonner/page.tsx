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
    { id: "demo", title: "Demo" },
    { id: "description", title: "Description" },
    { id: "position", title: "Position" },
    { id: "types", title: "Types" },
]

export default function SonnerPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Sonner"
        description="Sonner component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the sonner primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add sonner" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Sonner component."
      >
        <CodeBlock
          code={`import { Sonner } from "@/primitives/sonner"`}
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
