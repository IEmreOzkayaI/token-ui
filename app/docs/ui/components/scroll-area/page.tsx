import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ScrollAreaDemo from "@/ui/components/scroll-area-demo"
import ScrollAreaHorizontalDemo from "@/ui/components/scroll-area-horizontal-demo"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: ScrollAreaDemo,
    sourcePath: "ui/components/scroll-area-demo.tsx",
  },
  {
    id: "horizontal-demo",
    title: "Horizontal Demo",
    component: ScrollAreaHorizontalDemo,
    sourcePath: "ui/components/scroll-area-horizontal-demo.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "horizontal-demo", title: "Horizontal Demo", depth: 3 },
]

export default function ScrollAreaPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="ScrollArea"
        description="Augments native scroll functionality for custom, cross-browser styling."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add scroll-area" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { ScrollArea } from "@/primitives/scroll-area"`}
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
