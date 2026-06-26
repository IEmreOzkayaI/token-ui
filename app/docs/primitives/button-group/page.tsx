import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import ButtonGroupDemo from "@/ui/components/button-group-demo"
import ButtonGroupDropdown from "@/ui/components/button-group-dropdown"
import ButtonGroupInputGroup from "@/ui/components/button-group-input-group"
import ButtonGroupInput from "@/ui/components/button-group-input"
import ButtonGroupNested from "@/ui/components/button-group-nested"
import ButtonGroupOrientation from "@/ui/components/button-group-orientation"
import ButtonGroupPopover from "@/ui/components/button-group-popover"
import ButtonGroupSelect from "@/ui/components/button-group-select"
import ButtonGroupSeparatorDemo from "@/ui/components/button-group-separator"
import ButtonGroupSize from "@/ui/components/button-group-size"

const examples = [
  {
    title: "ButtonGroup Demo",
    component: ButtonGroupDemo,
    sourcePath: "ui/components/button-group-demo.tsx",
  },
  {
    title: "ButtonGroup Dropdown",
    component: ButtonGroupDropdown,
    sourcePath: "ui/components/button-group-dropdown.tsx",
  },
  {
    title: "ButtonGroup Input Group",
    component: ButtonGroupInputGroup,
    sourcePath: "ui/components/button-group-input-group.tsx",
  },
  {
    title: "ButtonGroup Input",
    component: ButtonGroupInput,
    sourcePath: "ui/components/button-group-input.tsx",
  },
  {
    title: "ButtonGroup Nested",
    component: ButtonGroupNested,
    sourcePath: "ui/components/button-group-nested.tsx",
  },
  {
    title: "ButtonGroup Orientation",
    component: ButtonGroupOrientation,
    sourcePath: "ui/components/button-group-orientation.tsx",
  },
  {
    title: "ButtonGroup Popover",
    component: ButtonGroupPopover,
    sourcePath: "ui/components/button-group-popover.tsx",
  },
  {
    title: "ButtonGroup Select",
    component: ButtonGroupSelect,
    sourcePath: "ui/components/button-group-select.tsx",
  },
  {
    title: "ButtonGroup Separator",
    component: ButtonGroupSeparatorDemo,
    sourcePath: "ui/components/button-group-separator.tsx",
  },
  {
    title: "ButtonGroup Size",
    component: ButtonGroupSize,
    sourcePath: "ui/components/button-group-size.tsx",
  },
] as const

export default function ButtonGroupPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">ButtonGroup</h1>
        <p className="text-lg text-muted-foreground">
          ButtonGroup component — {examples.length} examples rendered live with source code
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
