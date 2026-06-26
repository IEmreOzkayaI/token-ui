import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import SliderControlled from "@/ui/components/slider-controlled"
import SliderDemo from "@/ui/components/slider-demo"
import SliderDisabled from "@/ui/components/slider-disabled"
import SliderMultiple from "@/ui/components/slider-multiple"
import SliderRange from "@/ui/components/slider-range"
import SliderVertical from "@/ui/components/slider-vertical"

const examples = [
  {
    id: "controlled",
    title: "Controlled",
    component: SliderControlled,
    sourcePath: "ui/components/slider-controlled.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: SliderDemo,
    sourcePath: "ui/components/slider-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: SliderDisabled,
    sourcePath: "ui/components/slider-disabled.tsx",
  },
  {
    id: "multiple",
    title: "Multiple",
    component: SliderMultiple,
    sourcePath: "ui/components/slider-multiple.tsx",
  },
  {
    id: "range",
    title: "Range",
    component: SliderRange,
    sourcePath: "ui/components/slider-range.tsx",
  },
  {
    id: "vertical",
    title: "Vertical",
    component: SliderVertical,
    sourcePath: "ui/components/slider-vertical.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "controlled", title: "Controlled" },
    { id: "demo", title: "Demo" },
    { id: "disabled", title: "Disabled" },
    { id: "multiple", title: "Multiple" },
    { id: "range", title: "Range" },
    { id: "vertical", title: "Vertical" },
]

export default function SliderPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Slider"
        description="Slider component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the slider primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add slider" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Slider component."
      >
        <CodeBlock
          code={`import { Slider } from "@/primitives/slider"`}
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
