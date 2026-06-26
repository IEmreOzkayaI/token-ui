import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import ButtonAsChild from "@/ui/components/button-aschild"
import ButtonDefault from "@/ui/components/button-default"
import ButtonDemo from "@/ui/components/button-demo"
import ButtonDestructive from "@/ui/components/button-destructive"
import ButtonGhost from "@/ui/components/button-ghost"
import ButtonGroupDemo from "@/ui/components/button-group-demo"
import ButtonGroupDropdown from "@/ui/components/button-group-dropdown"
import ButtonGroupInputGroup from "@/ui/components/button-group-input-group"
import ButtonGroupInput from "@/ui/components/button-group-input"
import { ButtonGroupNested } from "@/ui/components/button-group-nested"
import ButtonGroupOrientation from "@/ui/components/button-group-orientation"
import ButtonGroupPopover from "@/ui/components/button-group-popover"
import ButtonGroupSelect from "@/ui/components/button-group-select"
import ButtonGroupSeparatorDemo from "@/ui/components/button-group-separator"
import ButtonGroupSize from "@/ui/components/button-group-size"
import ButtonIcon from "@/ui/components/button-icon"
import ButtonLink from "@/ui/components/button-link"
import ButtonOutline from "@/ui/components/button-outline"
import ButtonRounded from "@/ui/components/button-rounded"
import ButtonSecondary from "@/ui/components/button-secondary"
import ButtonSize from "@/ui/components/button-size"
import ButtonSpinner from "@/ui/components/button-spinner"

const examples = [
  {
    title: "Button Aschild",
    component: ButtonAsChild,
    sourcePath: "ui/components/button-aschild.tsx",
  },
  {
    title: "Button Default",
    component: ButtonDefault,
    sourcePath: "ui/components/button-default.tsx",
  },
  {
    title: "Button Demo",
    component: ButtonDemo,
    sourcePath: "ui/components/button-demo.tsx",
  },
  {
    title: "Button Destructive",
    component: ButtonDestructive,
    sourcePath: "ui/components/button-destructive.tsx",
  },
  {
    title: "Button Ghost",
    component: ButtonGhost,
    sourcePath: "ui/components/button-ghost.tsx",
  },
  {
    title: "Button Group Demo",
    component: ButtonGroupDemo,
    sourcePath: "ui/components/button-group-demo.tsx",
  },
  {
    title: "Button Group Dropdown",
    component: ButtonGroupDropdown,
    sourcePath: "ui/components/button-group-dropdown.tsx",
  },
  {
    title: "Button Group Input Group",
    component: ButtonGroupInputGroup,
    sourcePath: "ui/components/button-group-input-group.tsx",
  },
  {
    title: "Button Group Input",
    component: ButtonGroupInput,
    sourcePath: "ui/components/button-group-input.tsx",
  },
  {
    title: "Button Group Nested",
    component: ButtonGroupNested,
    sourcePath: "ui/components/button-group-nested.tsx",
  },
  {
    title: "Button Group Orientation",
    component: ButtonGroupOrientation,
    sourcePath: "ui/components/button-group-orientation.tsx",
  },
  {
    title: "Button Group Popover",
    component: ButtonGroupPopover,
    sourcePath: "ui/components/button-group-popover.tsx",
  },
  {
    title: "Button Group Select",
    component: ButtonGroupSelect,
    sourcePath: "ui/components/button-group-select.tsx",
  },
  {
    title: "Button Group Separator",
    component: ButtonGroupSeparatorDemo,
    sourcePath: "ui/components/button-group-separator.tsx",
  },
  {
    title: "Button Group Size",
    component: ButtonGroupSize,
    sourcePath: "ui/components/button-group-size.tsx",
  },
  {
    title: "Button Icon",
    component: ButtonIcon,
    sourcePath: "ui/components/button-icon.tsx",
  },
  {
    title: "Button Link",
    component: ButtonLink,
    sourcePath: "ui/components/button-link.tsx",
  },
  {
    title: "Button Outline",
    component: ButtonOutline,
    sourcePath: "ui/components/button-outline.tsx",
  },
  {
    title: "Button Rounded",
    component: ButtonRounded,
    sourcePath: "ui/components/button-rounded.tsx",
  },
  {
    title: "Button Secondary",
    component: ButtonSecondary,
    sourcePath: "ui/components/button-secondary.tsx",
  },
  {
    title: "Button Size",
    component: ButtonSize,
    sourcePath: "ui/components/button-size.tsx",
  },
  {
    title: "Button Spinner",
    component: ButtonSpinner,
    sourcePath: "ui/components/button-spinner.tsx",
  },
] as const

export default function ButtonPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Button</h1>
        <p className="text-lg text-muted-foreground">
          Button component — {examples.length} examples rendered live with source code
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
