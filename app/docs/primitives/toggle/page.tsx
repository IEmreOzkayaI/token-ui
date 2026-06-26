import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import ToggleDemo from "@/ui/components/toggle-demo"
import ToggleDisabled from "@/ui/components/toggle-disabled"
import ToggleGroupDemo from "@/ui/components/toggle-group-demo"
import ToggleGroupDisabled from "@/ui/components/toggle-group-disabled"
import ToggleGroupFontWeightSelector from "@/ui/components/toggle-group-font-weight-selector"
import ToggleGroupOutline from "@/ui/components/toggle-group-outline"
import ToggleGroupSizes from "@/ui/components/toggle-group-sizes"
import ToggleGroupSpacing from "@/ui/components/toggle-group-spacing"
import ToggleGroupVertical from "@/ui/components/toggle-group-vertical"
import ToggleOutline from "@/ui/components/toggle-outline"
import ToggleSizes from "@/ui/components/toggle-sizes"
import ToggleText from "@/ui/components/toggle-text"

const examples = [
  {
    title: "Toggle Demo",
    component: ToggleDemo,
    sourcePath: "ui/components/toggle-demo.tsx",
  },
  {
    title: "Toggle Disabled",
    component: ToggleDisabled,
    sourcePath: "ui/components/toggle-disabled.tsx",
  },
  {
    title: "Toggle Group Demo",
    component: ToggleGroupDemo,
    sourcePath: "ui/components/toggle-group-demo.tsx",
  },
  {
    title: "Toggle Group Disabled",
    component: ToggleGroupDisabled,
    sourcePath: "ui/components/toggle-group-disabled.tsx",
  },
  {
    title: "Toggle Group Font Weight Selector",
    component: ToggleGroupFontWeightSelector,
    sourcePath: "ui/components/toggle-group-font-weight-selector.tsx",
  },
  {
    title: "Toggle Group Outline",
    component: ToggleGroupOutline,
    sourcePath: "ui/components/toggle-group-outline.tsx",
  },
  {
    title: "Toggle Group Sizes",
    component: ToggleGroupSizes,
    sourcePath: "ui/components/toggle-group-sizes.tsx",
  },
  {
    title: "Toggle Group Spacing",
    component: ToggleGroupSpacing,
    sourcePath: "ui/components/toggle-group-spacing.tsx",
  },
  {
    title: "Toggle Group Vertical",
    component: ToggleGroupVertical,
    sourcePath: "ui/components/toggle-group-vertical.tsx",
  },
  {
    title: "Toggle Outline",
    component: ToggleOutline,
    sourcePath: "ui/components/toggle-outline.tsx",
  },
  {
    title: "Toggle Sizes",
    component: ToggleSizes,
    sourcePath: "ui/components/toggle-sizes.tsx",
  },
  {
    title: "Toggle Text",
    component: ToggleText,
    sourcePath: "ui/components/toggle-text.tsx",
  },
] as const

export default function TogglePage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Toggle</h1>
        <p className="text-lg text-muted-foreground">
          Toggle component — {examples.length} examples rendered live with source code
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
