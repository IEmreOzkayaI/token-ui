import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { InputBadge } from "@/ui/components/input-badge"
import { InputBasic } from "@/ui/components/input-basic"
import { InputButtonGroup } from "@/ui/components/input-button-group"
import { InputDemo } from "@/ui/components/input-demo"
import { InputDisabled } from "@/ui/components/input-disabled"
import { InputField } from "@/ui/components/input-field"
import { InputFieldgroup } from "@/ui/components/input-fieldgroup"
import { InputFile } from "@/ui/components/input-file"
import { InputForm } from "@/ui/components/input-form"
import { InputGrid } from "@/ui/components/input-grid"
import { InputGroupBasic } from "@/ui/components/input-group-basic"
import { InputGroupBlockEnd } from "@/ui/components/input-group-block-end"
import { InputGroupBlockStart } from "@/ui/components/input-group-block-start"
import InputGroupButtonGroup from "@/ui/components/input-group-button-group"
import { InputGroupDemo } from "@/ui/components/input-group-demo"
import InputGroupDropdown from "@/ui/components/input-group-dropdown"
import { InputGroupInCard } from "@/ui/components/input-group-in-card"
import { InputGroupInlineEnd } from "@/ui/components/input-group-inline-end"
import { InputGroupInlineStart } from "@/ui/components/input-group-inline-start"
import { InputGroupKbd } from "@/ui/components/input-group-kbd"
import InputGroupLabel from "@/ui/components/input-group-label"
import InputGroupSpinner from "@/ui/components/input-group-spinner"
import InputGroupTextExample from "@/ui/components/input-group-text"
import { InputGroupTextareaExamples } from "@/ui/components/input-group-textarea-examples"
import InputGroupTooltip from "@/ui/components/input-group-tooltip"
import { InputGroupWithAddons } from "@/ui/components/input-group-with-addons"
import { InputGroupWithButtons } from "@/ui/components/input-group-with-buttons"
import { InputGroupWithKbd } from "@/ui/components/input-group-with-kbd"
import { InputGroupWithTooltip } from "@/ui/components/input-group-with-tooltip"
import { InputInline } from "@/ui/components/input-inline"
import { InputInputGroup } from "@/ui/components/input-input-group"
import { InputInvalid } from "@/ui/components/input-invalid"
import { InputOTPAlphanumeric } from "@/ui/components/input-otp-alphanumeric"
import InputOTPControlled from "@/ui/components/input-otp-controlled"
import { InputOTPDemo } from "@/ui/components/input-otp-demo"
import { InputOTPDisabled } from "@/ui/components/input-otp-disabled"
import { InputOTPForm } from "@/ui/components/input-otp-form"
import { InputOTPFourDigits } from "@/ui/components/input-otp-four-digits"
import { InputOTPInvalid } from "@/ui/components/input-otp-invalid"
import { InputOTPPattern } from "@/ui/components/input-otp-pattern"
import InputOTPWithSeparator from "@/ui/components/input-otp-separator"
import { InputRequired } from "@/ui/components/input-required"

const examples = [
  {
    title: "Input Badge",
    component: InputBadge,
    sourcePath: "ui/components/input-badge.tsx",
  },
  {
    title: "Input Basic",
    component: InputBasic,
    sourcePath: "ui/components/input-basic.tsx",
  },
  {
    title: "Input Button Group",
    component: InputButtonGroup,
    sourcePath: "ui/components/input-button-group.tsx",
  },
  {
    title: "Input Demo",
    component: InputDemo,
    sourcePath: "ui/components/input-demo.tsx",
  },
  {
    title: "Input Disabled",
    component: InputDisabled,
    sourcePath: "ui/components/input-disabled.tsx",
  },
  {
    title: "Input Field",
    component: InputField,
    sourcePath: "ui/components/input-field.tsx",
  },
  {
    title: "Input Fieldgroup",
    component: InputFieldgroup,
    sourcePath: "ui/components/input-fieldgroup.tsx",
  },
  {
    title: "Input File",
    component: InputFile,
    sourcePath: "ui/components/input-file.tsx",
  },
  {
    title: "Input Form",
    component: InputForm,
    sourcePath: "ui/components/input-form.tsx",
  },
  {
    title: "Input Grid",
    component: InputGrid,
    sourcePath: "ui/components/input-grid.tsx",
  },
  {
    title: "Input Group Basic",
    component: InputGroupBasic,
    sourcePath: "ui/components/input-group-basic.tsx",
  },
  {
    title: "Input Group Block End",
    component: InputGroupBlockEnd,
    sourcePath: "ui/components/input-group-block-end.tsx",
  },
  {
    title: "Input Group Block Start",
    component: InputGroupBlockStart,
    sourcePath: "ui/components/input-group-block-start.tsx",
  },
  {
    title: "Input Group Button Group",
    component: InputGroupButtonGroup,
    sourcePath: "ui/components/input-group-button-group.tsx",
  },
  {
    title: "Input Group Demo",
    component: InputGroupDemo,
    sourcePath: "ui/components/input-group-demo.tsx",
  },
  {
    title: "Input Group Dropdown",
    component: InputGroupDropdown,
    sourcePath: "ui/components/input-group-dropdown.tsx",
  },
  {
    title: "Input Group In Card",
    component: InputGroupInCard,
    sourcePath: "ui/components/input-group-in-card.tsx",
  },
  {
    title: "Input Group Inline End",
    component: InputGroupInlineEnd,
    sourcePath: "ui/components/input-group-inline-end.tsx",
  },
  {
    title: "Input Group Inline Start",
    component: InputGroupInlineStart,
    sourcePath: "ui/components/input-group-inline-start.tsx",
  },
  {
    title: "Input Group Kbd",
    component: InputGroupKbd,
    sourcePath: "ui/components/input-group-kbd.tsx",
  },
  {
    title: "Input Group Label",
    component: InputGroupLabel,
    sourcePath: "ui/components/input-group-label.tsx",
  },
  {
    title: "Input Group Spinner",
    component: InputGroupSpinner,
    sourcePath: "ui/components/input-group-spinner.tsx",
  },
  {
    title: "Input Group Text",
    component: InputGroupTextExample,
    sourcePath: "ui/components/input-group-text.tsx",
  },
  {
    title: "Input Group Textarea Examples",
    component: InputGroupTextareaExamples,
    sourcePath: "ui/components/input-group-textarea-examples.tsx",
  },
  {
    title: "Input Group Tooltip",
    component: InputGroupTooltip,
    sourcePath: "ui/components/input-group-tooltip.tsx",
  },
  {
    title: "Input Group With Addons",
    component: InputGroupWithAddons,
    sourcePath: "ui/components/input-group-with-addons.tsx",
  },
  {
    title: "Input Group With Buttons",
    component: InputGroupWithButtons,
    sourcePath: "ui/components/input-group-with-buttons.tsx",
  },
  {
    title: "Input Group With Kbd",
    component: InputGroupWithKbd,
    sourcePath: "ui/components/input-group-with-kbd.tsx",
  },
  {
    title: "Input Group With Tooltip",
    component: InputGroupWithTooltip,
    sourcePath: "ui/components/input-group-with-tooltip.tsx",
  },
  {
    title: "Input Inline",
    component: InputInline,
    sourcePath: "ui/components/input-inline.tsx",
  },
  {
    title: "Input Input Group",
    component: InputInputGroup,
    sourcePath: "ui/components/input-input-group.tsx",
  },
  {
    title: "Input Invalid",
    component: InputInvalid,
    sourcePath: "ui/components/input-invalid.tsx",
  },
  {
    title: "Input Otp Alphanumeric",
    component: InputOTPAlphanumeric,
    sourcePath: "ui/components/input-otp-alphanumeric.tsx",
  },
  {
    title: "Input Otp Controlled",
    component: InputOTPControlled,
    sourcePath: "ui/components/input-otp-controlled.tsx",
  },
  {
    title: "Input Otp Demo",
    component: InputOTPDemo,
    sourcePath: "ui/components/input-otp-demo.tsx",
  },
  {
    title: "Input Otp Disabled",
    component: InputOTPDisabled,
    sourcePath: "ui/components/input-otp-disabled.tsx",
  },
  {
    title: "Input Otp Form",
    component: InputOTPForm,
    sourcePath: "ui/components/input-otp-form.tsx",
  },
  {
    title: "Input Otp Four Digits",
    component: InputOTPFourDigits,
    sourcePath: "ui/components/input-otp-four-digits.tsx",
  },
  {
    title: "Input Otp Invalid",
    component: InputOTPInvalid,
    sourcePath: "ui/components/input-otp-invalid.tsx",
  },
  {
    title: "Input Otp Pattern",
    component: InputOTPPattern,
    sourcePath: "ui/components/input-otp-pattern.tsx",
  },
  {
    title: "Input Otp Separator",
    component: InputOTPWithSeparator,
    sourcePath: "ui/components/input-otp-separator.tsx",
  },
  {
    title: "Input Required",
    component: InputRequired,
    sourcePath: "ui/components/input-required.tsx",
  },
] as const

export default function InputPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Input</h1>
        <p className="text-lg text-muted-foreground">
          Input component — {examples.length} examples rendered live with source code
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
