import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ChartTooltipDemo from "@/ui/components/chart-tooltip"

const examples = [
  {
    id: "tooltip",
    title: "Tooltip",
    component: ChartTooltipDemo,
    sourcePath: "ui/components/chart-tooltip.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "tooltip", title: "Tooltip" },
]

export default function ChartPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Chart"
        description="Chart component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the chart primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add chart" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Chart component."
      >
        <CodeBlock
          code={`import { Chart } from "@/primitives/chart"`}
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
