import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ResizableDemo from "@/ui/components/resizable/demo"
import ResizableHandleDemo from "@/ui/components/resizable/handle"
import ResizableVertical from "@/ui/components/resizable/vertical"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: ResizableDemo,
    sourcePath: "ui/components/resizable/demo.tsx",
  },
  {
    id: "handle",
    title: "Handle",
    component: ResizableHandleDemo,
    sourcePath: "ui/components/resizable/handle.tsx",
  },
  {
    id: "vertical",
    title: "Vertical",
    component: ResizableVertical,
    sourcePath: "ui/components/resizable/vertical.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "handle", title: "Handle", depth: 3 },
  { id: "vertical", title: "Vertical", depth: 3 },
]

export default function ResizablePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Resizable"
        description="Accessible resizable panel groups and layouts with keyboard support."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add resizable" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Resizable } from "@/primitives/resizable"`}
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
