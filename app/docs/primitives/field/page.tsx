import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
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
    id: "checkbox",
    title: "Checkbox",
    component: FieldCheckbox,
    sourcePath: "ui/components/field-checkbox.tsx",
  },
  {
    id: "choice-card",
    title: "Choice Card",
    component: FieldChoiceCard,
    sourcePath: "ui/components/field-choice-card.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: FieldDemo,
    sourcePath: "ui/components/field-demo.tsx",
  },
  {
    id: "fieldset",
    title: "Fieldset",
    component: FieldFieldset,
    sourcePath: "ui/components/field-fieldset.tsx",
  },
  {
    id: "group",
    title: "Group",
    component: FieldGroupExample,
    sourcePath: "ui/components/field-group.tsx",
  },
  {
    id: "input",
    title: "Input",
    component: FieldInput,
    sourcePath: "ui/components/field-input.tsx",
  },
  {
    id: "radio",
    title: "Radio",
    component: FieldRadio,
    sourcePath: "ui/components/field-radio.tsx",
  },
  {
    id: "responsive",
    title: "Responsive",
    component: FieldResponsive,
    sourcePath: "ui/components/field-responsive.tsx",
  },
  {
    id: "select",
    title: "Select",
    component: FieldSelect,
    sourcePath: "ui/components/field-select.tsx",
  },
  {
    id: "slider",
    title: "Slider",
    component: FieldSlider,
    sourcePath: "ui/components/field-slider.tsx",
  },
  {
    id: "switch",
    title: "Switch",
    component: FieldSwitch,
    sourcePath: "ui/components/field-switch.tsx",
  },
  {
    id: "textarea",
    title: "Textarea",
    component: FieldTextarea,
    sourcePath: "ui/components/field-textarea.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "checkbox", title: "Checkbox" },
    { id: "choice-card", title: "Choice Card" },
    { id: "demo", title: "Demo" },
    { id: "fieldset", title: "Fieldset" },
    { id: "group", title: "Group" },
    { id: "input", title: "Input" },
    { id: "radio", title: "Radio" },
    { id: "responsive", title: "Responsive" },
    { id: "select", title: "Select" },
    { id: "slider", title: "Slider" },
    { id: "switch", title: "Switch" },
    { id: "textarea", title: "Textarea" },
]

export default function FieldPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Field"
        description="Field component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the field primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add field" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Field component."
      >
        <CodeBlock
          code={`import { Field } from "@/primitives/field"`}
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
