import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { SliderControlled } from "@/ui/components/slider-controlled"
import { SliderDemo } from "@/ui/components/slider-demo"
import { SliderDisabled } from "@/ui/components/slider-disabled"
import { SliderMultiple } from "@/ui/components/slider-multiple"
import { SliderRange } from "@/ui/components/slider-range"
import { SliderVertical } from "@/ui/components/slider-vertical"

const examples = [
  {
    title: "Slider Controlled",
    component: SliderControlled,
    sourcePath: "ui/components/slider-controlled.tsx",
  },
  {
    title: "Slider Demo",
    component: SliderDemo,
    sourcePath: "ui/components/slider-demo.tsx",
  },
  {
    title: "Slider Disabled",
    component: SliderDisabled,
    sourcePath: "ui/components/slider-disabled.tsx",
  },
  {
    title: "Slider Multiple",
    component: SliderMultiple,
    sourcePath: "ui/components/slider-multiple.tsx",
  },
  {
    title: "Slider Range",
    component: SliderRange,
    sourcePath: "ui/components/slider-range.tsx",
  },
  {
    title: "Slider Vertical",
    component: SliderVertical,
    sourcePath: "ui/components/slider-vertical.tsx",
  },
] as const

export default function SliderPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Slider</h1>
        <p className="text-lg text-muted-foreground">
          Slider component — {examples.length} examples rendered live with source code
        </p>

        <div className="flex flex-col gap-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <ComponentExample
                key={example.sourcePath}
                title={example.title}
                source={readSource(example.sourcePath)}
              >
                <Component />
              </ComponentExample>
            )
          })}
        </div>
      </div>
    </div>
  )
}
