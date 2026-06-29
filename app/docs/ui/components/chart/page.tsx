import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import { ChartDemo } from "@/ui/components/chart/demo"
import { ChartExample } from "@/ui/components/chart/example"
import { ChartBarDemoAxis } from "@/ui/components/chart/example-axis"
import { ChartBarDemoGrid } from "@/ui/components/chart/example-grid"
import { ChartBarDemoLegend } from "@/ui/components/chart/example-legend"
import { ChartBarDemoTooltip } from "@/ui/components/chart/example-tooltip"
import { ChartTooltipDemo } from "@/ui/components/chart/tooltip"
import ChartPie from "@/ui/components/chart/pie"
import ChartLine from "@/ui/components/chart/line"

const examples = [
  {
    id: "example",
    title: "Example",
    component: ChartExample,
    sourcePath: "ui/components/chart/example.tsx",
  },
  {
    id: "example-axis",
    title: "Axis",
    component: ChartBarDemoAxis,
    sourcePath: "ui/components/chart/example-axis.tsx",
  },
  {
    id: "example-grid",
    title: "Grid",
    component: ChartBarDemoGrid,
    sourcePath: "ui/components/chart/example-grid.tsx",
  },
  {
    id: "example-legend",
    title: "Legend",
    component: ChartBarDemoLegend,
    sourcePath: "ui/components/chart/example-legend.tsx",
  },
  {
    id: "example-tooltip",
    title: "Example Tooltip",
    component: ChartBarDemoTooltip,
    sourcePath: "ui/components/chart/example-tooltip.tsx",
  },
  {
    id: "tooltip",
    title: "Tooltip",
    component: ChartTooltipDemo,
    sourcePath: "ui/components/chart/tooltip.tsx",
  },
  {
    id: "pie",
    title: "Pie",
    component: ChartPie,
    sourcePath: "ui/components/chart/pie.tsx",
  },
  {
    id: "line",
    title: "Line",
    component: ChartLine,
    sourcePath: "ui/components/chart/line.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  ...examples.map((ex) => ({ id: ex.id, title: ex.title, depth: 3 })),
]

export default function ChartPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Chart"
        description="Beautiful charts built using Recharts. Copy and paste into your apps."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add chart" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Chart } from "@/primitives/chart"`}
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
