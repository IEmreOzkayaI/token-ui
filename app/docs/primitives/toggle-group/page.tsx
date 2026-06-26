import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { ToggleGroupDemo } from "@/ui/components/toggle-group-demo"
import { ToggleGroupDisabled } from "@/ui/components/toggle-group-disabled"
import { ToggleGroupFontWeightSelector } from "@/ui/components/toggle-group-font-weight-selector"
import { ToggleGroupOutline } from "@/ui/components/toggle-group-outline"
import { ToggleGroupSizes } from "@/ui/components/toggle-group-sizes"
import { ToggleGroupSpacing } from "@/ui/components/toggle-group-spacing"
import { ToggleGroupVertical } from "@/ui/components/toggle-group-vertical"

const examples = [
  {
    title: "ToggleGroup Demo",
    component: ToggleGroupDemo,
    sourcePath: "ui/components/toggle-group-demo.tsx",
  },
  {
    title: "ToggleGroup Disabled",
    component: ToggleGroupDisabled,
    sourcePath: "ui/components/toggle-group-disabled.tsx",
  },
  {
    title: "ToggleGroup Font Weight Selector",
    component: ToggleGroupFontWeightSelector,
    sourcePath: "ui/components/toggle-group-font-weight-selector.tsx",
  },
  {
    title: "ToggleGroup Outline",
    component: ToggleGroupOutline,
    sourcePath: "ui/components/toggle-group-outline.tsx",
  },
  {
    title: "ToggleGroup Sizes",
    component: ToggleGroupSizes,
    sourcePath: "ui/components/toggle-group-sizes.tsx",
  },
  {
    title: "ToggleGroup Spacing",
    component: ToggleGroupSpacing,
    sourcePath: "ui/components/toggle-group-spacing.tsx",
  },
  {
    title: "ToggleGroup Vertical",
    component: ToggleGroupVertical,
    sourcePath: "ui/components/toggle-group-vertical.tsx",
  },
] as const

export default function ToggleGroupPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">ToggleGroup</h1>
        <p className="text-lg text-muted-foreground">
          ToggleGroup component — {examples.length} examples rendered live with source code
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
