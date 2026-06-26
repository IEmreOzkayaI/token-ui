import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ResizableDemo from "@/ui/components/resizable-demo"
import ResizableHandleDemo from "@/ui/components/resizable-handle"
import ResizableVertical from "@/ui/components/resizable-vertical"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: ResizableDemo,
    sourcePath: "ui/components/resizable-demo.tsx",
  },
  {
    id: "handle",
    title: "Handle",
    component: ResizableHandleDemo,
    sourcePath: "ui/components/resizable-handle.tsx",
  },
  {
    id: "vertical",
    title: "Vertical",
    component: ResizableVertical,
    sourcePath: "ui/components/resizable-vertical.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "demo", title: "Demo" },
    { id: "handle", title: "Handle" },
    { id: "vertical", title: "Vertical" },
]

export default function ResizablePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Resizable"
        description="Resizable component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the resizable primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add resizable" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Resizable component."
      >
        <CodeBlock
          code={`import { Resizable } from "@/primitives/resizable"`}
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
