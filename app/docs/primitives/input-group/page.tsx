import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import InputGroupBasic from "@/ui/components/input-group-basic"
import InputGroupBlockEnd from "@/ui/components/input-group-block-end"
import InputGroupBlockStart from "@/ui/components/input-group-block-start"
import InputGroupButtonGroup from "@/ui/components/input-group-button-group"
import InputGroupDemo from "@/ui/components/input-group-demo"
import InputGroupDropdown from "@/ui/components/input-group-dropdown"
import InputGroupInCard from "@/ui/components/input-group-in-card"
import InputGroupInlineEnd from "@/ui/components/input-group-inline-end"
import InputGroupInlineStart from "@/ui/components/input-group-inline-start"
import InputGroupKbd from "@/ui/components/input-group-kbd"
import InputGroupLabel from "@/ui/components/input-group-label"
import InputGroupSpinner from "@/ui/components/input-group-spinner"
import InputGroupTextExample from "@/ui/components/input-group-text"
import InputGroupTextareaExamples from "@/ui/components/input-group-textarea-examples"
import InputGroupTooltip from "@/ui/components/input-group-tooltip"
import InputGroupWithAddons from "@/ui/components/input-group-with-addons"
import InputGroupWithButtons from "@/ui/components/input-group-with-buttons"
import InputGroupWithKbd from "@/ui/components/input-group-with-kbd"
import InputGroupWithTooltip from "@/ui/components/input-group-with-tooltip"

const examples = [
  {
    title: "InputGroup Basic",
    component: InputGroupBasic,
    sourcePath: "ui/components/input-group-basic.tsx",
  },
  {
    title: "InputGroup Block End",
    component: InputGroupBlockEnd,
    sourcePath: "ui/components/input-group-block-end.tsx",
  },
  {
    title: "InputGroup Block Start",
    component: InputGroupBlockStart,
    sourcePath: "ui/components/input-group-block-start.tsx",
  },
  {
    title: "InputGroup Button Group",
    component: InputGroupButtonGroup,
    sourcePath: "ui/components/input-group-button-group.tsx",
  },
  {
    title: "InputGroup Demo",
    component: InputGroupDemo,
    sourcePath: "ui/components/input-group-demo.tsx",
  },
  {
    title: "InputGroup Dropdown",
    component: InputGroupDropdown,
    sourcePath: "ui/components/input-group-dropdown.tsx",
  },
  {
    title: "InputGroup In Card",
    component: InputGroupInCard,
    sourcePath: "ui/components/input-group-in-card.tsx",
  },
  {
    title: "InputGroup Inline End",
    component: InputGroupInlineEnd,
    sourcePath: "ui/components/input-group-inline-end.tsx",
  },
  {
    title: "InputGroup Inline Start",
    component: InputGroupInlineStart,
    sourcePath: "ui/components/input-group-inline-start.tsx",
  },
  {
    title: "InputGroup Kbd",
    component: InputGroupKbd,
    sourcePath: "ui/components/input-group-kbd.tsx",
  },
  {
    title: "InputGroup Label",
    component: InputGroupLabel,
    sourcePath: "ui/components/input-group-label.tsx",
  },
  {
    title: "InputGroup Spinner",
    component: InputGroupSpinner,
    sourcePath: "ui/components/input-group-spinner.tsx",
  },
  {
    title: "InputGroup Text",
    component: InputGroupTextExample,
    sourcePath: "ui/components/input-group-text.tsx",
  },
  {
    title: "InputGroup Textarea Examples",
    component: InputGroupTextareaExamples,
    sourcePath: "ui/components/input-group-textarea-examples.tsx",
  },
  {
    title: "InputGroup Tooltip",
    component: InputGroupTooltip,
    sourcePath: "ui/components/input-group-tooltip.tsx",
  },
  {
    title: "InputGroup With Addons",
    component: InputGroupWithAddons,
    sourcePath: "ui/components/input-group-with-addons.tsx",
  },
  {
    title: "InputGroup With Buttons",
    component: InputGroupWithButtons,
    sourcePath: "ui/components/input-group-with-buttons.tsx",
  },
  {
    title: "InputGroup With Kbd",
    component: InputGroupWithKbd,
    sourcePath: "ui/components/input-group-with-kbd.tsx",
  },
  {
    title: "InputGroup With Tooltip",
    component: InputGroupWithTooltip,
    sourcePath: "ui/components/input-group-with-tooltip.tsx",
  },
] as const

export default function InputGroupPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">InputGroup</h1>
        <p className="text-lg text-muted-foreground">
          InputGroup component — {examples.length} examples rendered live with source code
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
