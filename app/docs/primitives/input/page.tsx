import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import InputBadge from "@/ui/components/input-badge"
import InputBasic from "@/ui/components/input-basic"
import InputButtonGroup from "@/ui/components/input-button-group"
import InputDemo from "@/ui/components/input-demo"
import InputDisabled from "@/ui/components/input-disabled"
import InputField from "@/ui/components/input-field"
import InputFieldgroup from "@/ui/components/input-fieldgroup"
import InputFile from "@/ui/components/input-file"
import InputForm from "@/ui/components/input-form"
import InputGrid from "@/ui/components/input-grid"
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
import InputInline from "@/ui/components/input-inline"
import InputInputGroup from "@/ui/components/input-input-group"
import InputInvalid from "@/ui/components/input-invalid"
import InputOTPAlphanumeric from "@/ui/components/input-otp-alphanumeric"
import InputOTPControlled from "@/ui/components/input-otp-controlled"
import InputOTPDemo from "@/ui/components/input-otp-demo"
import InputOTPDisabled from "@/ui/components/input-otp-disabled"
import InputOTPForm from "@/ui/components/input-otp-form"
import InputOTPFourDigits from "@/ui/components/input-otp-four-digits"
import InputOTPInvalid from "@/ui/components/input-otp-invalid"
import InputOTPPattern from "@/ui/components/input-otp-pattern"
import InputOTPWithSeparator from "@/ui/components/input-otp-separator"
import InputRequired from "@/ui/components/input-required"

const examples = [
  {
    id: "badge",
    title: "Badge",
    component: InputBadge,
    sourcePath: "ui/components/input-badge.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: InputBasic,
    sourcePath: "ui/components/input-basic.tsx",
  },
  {
    id: "button-group",
    title: "Button Group",
    component: InputButtonGroup,
    sourcePath: "ui/components/input-button-group.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: InputDemo,
    sourcePath: "ui/components/input-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: InputDisabled,
    sourcePath: "ui/components/input-disabled.tsx",
  },
  {
    id: "field",
    title: "Field",
    component: InputField,
    sourcePath: "ui/components/input-field.tsx",
  },
  {
    id: "fieldgroup",
    title: "Fieldgroup",
    component: InputFieldgroup,
    sourcePath: "ui/components/input-fieldgroup.tsx",
  },
  {
    id: "file",
    title: "File",
    component: InputFile,
    sourcePath: "ui/components/input-file.tsx",
  },
  {
    id: "form",
    title: "Form",
    component: InputForm,
    sourcePath: "ui/components/input-form.tsx",
  },
  {
    id: "grid",
    title: "Grid",
    component: InputGrid,
    sourcePath: "ui/components/input-grid.tsx",
  },
  {
    id: "group-basic",
    title: "Group Basic",
    component: InputGroupBasic,
    sourcePath: "ui/components/input-group-basic.tsx",
  },
  {
    id: "group-block-end",
    title: "Group Block End",
    component: InputGroupBlockEnd,
    sourcePath: "ui/components/input-group-block-end.tsx",
  },
  {
    id: "group-block-start",
    title: "Group Block Start",
    component: InputGroupBlockStart,
    sourcePath: "ui/components/input-group-block-start.tsx",
  },
  {
    id: "group-button-group",
    title: "Group Button Group",
    component: InputGroupButtonGroup,
    sourcePath: "ui/components/input-group-button-group.tsx",
  },
  {
    id: "group-demo",
    title: "Group Demo",
    component: InputGroupDemo,
    sourcePath: "ui/components/input-group-demo.tsx",
  },
  {
    id: "group-dropdown",
    title: "Group Dropdown",
    component: InputGroupDropdown,
    sourcePath: "ui/components/input-group-dropdown.tsx",
  },
  {
    id: "group-in-card",
    title: "Group In Card",
    component: InputGroupInCard,
    sourcePath: "ui/components/input-group-in-card.tsx",
  },
  {
    id: "group-inline-end",
    title: "Group Inline End",
    component: InputGroupInlineEnd,
    sourcePath: "ui/components/input-group-inline-end.tsx",
  },
  {
    id: "group-inline-start",
    title: "Group Inline Start",
    component: InputGroupInlineStart,
    sourcePath: "ui/components/input-group-inline-start.tsx",
  },
  {
    id: "group-kbd",
    title: "Group Kbd",
    component: InputGroupKbd,
    sourcePath: "ui/components/input-group-kbd.tsx",
  },
  {
    id: "group-label",
    title: "Group Label",
    component: InputGroupLabel,
    sourcePath: "ui/components/input-group-label.tsx",
  },
  {
    id: "group-spinner",
    title: "Group Spinner",
    component: InputGroupSpinner,
    sourcePath: "ui/components/input-group-spinner.tsx",
  },
  {
    id: "group-text",
    title: "Group Text",
    component: InputGroupTextExample,
    sourcePath: "ui/components/input-group-text.tsx",
  },
  {
    id: "group-textarea-examples",
    title: "Group Textarea Examples",
    component: InputGroupTextareaExamples,
    sourcePath: "ui/components/input-group-textarea-examples.tsx",
  },
  {
    id: "group-tooltip",
    title: "Group Tooltip",
    component: InputGroupTooltip,
    sourcePath: "ui/components/input-group-tooltip.tsx",
  },
  {
    id: "group-with-addons",
    title: "Group With Addons",
    component: InputGroupWithAddons,
    sourcePath: "ui/components/input-group-with-addons.tsx",
  },
  {
    id: "group-with-buttons",
    title: "Group With Buttons",
    component: InputGroupWithButtons,
    sourcePath: "ui/components/input-group-with-buttons.tsx",
  },
  {
    id: "group-with-kbd",
    title: "Group With Kbd",
    component: InputGroupWithKbd,
    sourcePath: "ui/components/input-group-with-kbd.tsx",
  },
  {
    id: "group-with-tooltip",
    title: "Group With Tooltip",
    component: InputGroupWithTooltip,
    sourcePath: "ui/components/input-group-with-tooltip.tsx",
  },
  {
    id: "inline",
    title: "Inline",
    component: InputInline,
    sourcePath: "ui/components/input-inline.tsx",
  },
  {
    id: "input-group",
    title: "Input Group",
    component: InputInputGroup,
    sourcePath: "ui/components/input-input-group.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: InputInvalid,
    sourcePath: "ui/components/input-invalid.tsx",
  },
  {
    id: "otp-alphanumeric",
    title: "Otp Alphanumeric",
    component: InputOTPAlphanumeric,
    sourcePath: "ui/components/input-otp-alphanumeric.tsx",
  },
  {
    id: "otp-controlled",
    title: "Otp Controlled",
    component: InputOTPControlled,
    sourcePath: "ui/components/input-otp-controlled.tsx",
  },
  {
    id: "otp-demo",
    title: "Otp Demo",
    component: InputOTPDemo,
    sourcePath: "ui/components/input-otp-demo.tsx",
  },
  {
    id: "otp-disabled",
    title: "Otp Disabled",
    component: InputOTPDisabled,
    sourcePath: "ui/components/input-otp-disabled.tsx",
  },
  {
    id: "otp-form",
    title: "Otp Form",
    component: InputOTPForm,
    sourcePath: "ui/components/input-otp-form.tsx",
  },
  {
    id: "otp-four-digits",
    title: "Otp Four Digits",
    component: InputOTPFourDigits,
    sourcePath: "ui/components/input-otp-four-digits.tsx",
  },
  {
    id: "otp-invalid",
    title: "Otp Invalid",
    component: InputOTPInvalid,
    sourcePath: "ui/components/input-otp-invalid.tsx",
  },
  {
    id: "otp-pattern",
    title: "Otp Pattern",
    component: InputOTPPattern,
    sourcePath: "ui/components/input-otp-pattern.tsx",
  },
  {
    id: "otp-separator",
    title: "Otp Separator",
    component: InputOTPWithSeparator,
    sourcePath: "ui/components/input-otp-separator.tsx",
  },
  {
    id: "required",
    title: "Required",
    component: InputRequired,
    sourcePath: "ui/components/input-required.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "badge", title: "Badge" },
    { id: "basic", title: "Basic" },
    { id: "button-group", title: "Button Group" },
    { id: "demo", title: "Demo" },
    { id: "disabled", title: "Disabled" },
    { id: "field", title: "Field" },
    { id: "fieldgroup", title: "Fieldgroup" },
    { id: "file", title: "File" },
    { id: "form", title: "Form" },
    { id: "grid", title: "Grid" },
    { id: "group-basic", title: "Group Basic" },
    { id: "group-block-end", title: "Group Block End" },
    { id: "group-block-start", title: "Group Block Start" },
    { id: "group-button-group", title: "Group Button Group" },
    { id: "group-demo", title: "Group Demo" },
    { id: "group-dropdown", title: "Group Dropdown" },
    { id: "group-in-card", title: "Group In Card" },
    { id: "group-inline-end", title: "Group Inline End" },
    { id: "group-inline-start", title: "Group Inline Start" },
    { id: "group-kbd", title: "Group Kbd" },
    { id: "group-label", title: "Group Label" },
    { id: "group-spinner", title: "Group Spinner" },
    { id: "group-text", title: "Group Text" },
    { id: "group-textarea-examples", title: "Group Textarea Examples" },
    { id: "group-tooltip", title: "Group Tooltip" },
    { id: "group-with-addons", title: "Group With Addons" },
    { id: "group-with-buttons", title: "Group With Buttons" },
    { id: "group-with-kbd", title: "Group With Kbd" },
    { id: "group-with-tooltip", title: "Group With Tooltip" },
    { id: "inline", title: "Inline" },
    { id: "input-group", title: "Input Group" },
    { id: "invalid", title: "Invalid" },
    { id: "otp-alphanumeric", title: "Otp Alphanumeric" },
    { id: "otp-controlled", title: "Otp Controlled" },
    { id: "otp-demo", title: "Otp Demo" },
    { id: "otp-disabled", title: "Otp Disabled" },
    { id: "otp-form", title: "Otp Form" },
    { id: "otp-four-digits", title: "Otp Four Digits" },
    { id: "otp-invalid", title: "Otp Invalid" },
    { id: "otp-pattern", title: "Otp Pattern" },
    { id: "otp-separator", title: "Otp Separator" },
    { id: "required", title: "Required" },
]

export default function InputPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Input"
        description="Input component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the input primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add input" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Input component."
      >
        <CodeBlock
          code={`import { Input } from "@/primitives/input"`}
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
