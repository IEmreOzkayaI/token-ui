import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ProgressControlled from "@/ui/components/progress/controlled"
import ProgressDemo from "@/ui/components/progress/demo"
import ProgressWithLabel from "@/ui/components/progress/label"

const examples = [
  {
    id: "controlled",
    title: "Controlled",
    component: ProgressControlled,
    sourcePath: "ui/components/progress/controlled.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: ProgressDemo,
    sourcePath: "ui/components/progress/demo.tsx",
  },
  {
    id: "label",
    title: "Label",
    component: ProgressWithLabel,
    sourcePath: "ui/components/progress/label.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "controlled", title: "Controlled", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "label", title: "Label", depth: 3 },
]

export default function ProgressPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Progress"
        description="Displays an indicator showing the completion progress of a task."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add progress" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Progress } from "@/primitives/progress"`}
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
