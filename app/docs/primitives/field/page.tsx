import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import FieldCheckbox from "@/ui/components/field-checkbox"
import FieldChoiceCard from "@/ui/components/field-choice-card"
import FieldDemo from "@/ui/components/field-demo"
import FieldFieldset from "@/ui/components/field-fieldset"
import FieldGroupExample from "@/ui/components/field-group"
import FieldInput from "@/ui/components/field-input"
import FieldRadio from "@/ui/components/field-radio"
import FieldResponsive from "@/ui/components/field-responsive"
import FieldSelect from "@/ui/components/field-select"
import FieldSlider from "@/ui/components/field-slider"
import FieldSwitch from "@/ui/components/field-switch"
import FieldTextarea from "@/ui/components/field-textarea"

const examples = [
  {
    title: "Field Checkbox",
    component: FieldCheckbox,
    sourcePath: "ui/components/field-checkbox.tsx",
  },
  {
    title: "Field Choice Card",
    component: FieldChoiceCard,
    sourcePath: "ui/components/field-choice-card.tsx",
  },
  {
    title: "Field Demo",
    component: FieldDemo,
    sourcePath: "ui/components/field-demo.tsx",
  },
  {
    title: "Field Fieldset",
    component: FieldFieldset,
    sourcePath: "ui/components/field-fieldset.tsx",
  },
  {
    title: "Field Group",
    component: FieldGroupExample,
    sourcePath: "ui/components/field-group.tsx",
  },
  {
    title: "Field Input",
    component: FieldInput,
    sourcePath: "ui/components/field-input.tsx",
  },
  {
    title: "Field Radio",
    component: FieldRadio,
    sourcePath: "ui/components/field-radio.tsx",
  },
  {
    title: "Field Responsive",
    component: FieldResponsive,
    sourcePath: "ui/components/field-responsive.tsx",
  },
  {
    title: "Field Select",
    component: FieldSelect,
    sourcePath: "ui/components/field-select.tsx",
  },
  {
    title: "Field Slider",
    component: FieldSlider,
    sourcePath: "ui/components/field-slider.tsx",
  },
  {
    title: "Field Switch",
    component: FieldSwitch,
    sourcePath: "ui/components/field-switch.tsx",
  },
  {
    title: "Field Textarea",
    component: FieldTextarea,
    sourcePath: "ui/components/field-textarea.tsx",
  },
] as const

export default function FieldPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Field</h1>
        <p className="text-lg text-muted-foreground">
          Field component — {examples.length} examples rendered live with source code
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
