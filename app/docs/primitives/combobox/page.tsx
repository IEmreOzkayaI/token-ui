import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { ComboboxAutoHighlight } from "@/ui/components/combobox-auto-highlight"
import ComboboxBasic from "@/ui/components/combobox-basic"
import { ComboboxWithClear } from "@/ui/components/combobox-clear"
import { ComboboxWithCustomItems } from "@/ui/components/combobox-custom"
import { ComboboxDisabled } from "@/ui/components/combobox-disabled"
import { ComboboxWithGroupsAndSeparator } from "@/ui/components/combobox-groups"
import { ComboxboxInputGroup } from "@/ui/components/combobox-input-group"
import { ComboboxInvalid } from "@/ui/components/combobox-invalid"
import { ComboboxMultiple } from "@/ui/components/combobox-multiple"
import { ComboboxPopup } from "@/ui/components/combobox-popup"

const examples = [
  {
    title: "Combobox Auto Highlight",
    component: ComboboxAutoHighlight,
    sourcePath: "ui/components/combobox-auto-highlight.tsx",
  },
  {
    title: "Combobox Basic",
    component: ComboboxBasic,
    sourcePath: "ui/components/combobox-basic.tsx",
  },
  {
    title: "Combobox Clear",
    component: ComboboxWithClear,
    sourcePath: "ui/components/combobox-clear.tsx",
  },
  {
    title: "Combobox Custom",
    component: ComboboxWithCustomItems,
    sourcePath: "ui/components/combobox-custom.tsx",
  },
  {
    title: "Combobox Disabled",
    component: ComboboxDisabled,
    sourcePath: "ui/components/combobox-disabled.tsx",
  },
  {
    title: "Combobox Groups",
    component: ComboboxWithGroupsAndSeparator,
    sourcePath: "ui/components/combobox-groups.tsx",
  },
  {
    title: "Combobox Input Group",
    component: ComboxboxInputGroup,
    sourcePath: "ui/components/combobox-input-group.tsx",
  },
  {
    title: "Combobox Invalid",
    component: ComboboxInvalid,
    sourcePath: "ui/components/combobox-invalid.tsx",
  },
  {
    title: "Combobox Multiple",
    component: ComboboxMultiple,
    sourcePath: "ui/components/combobox-multiple.tsx",
  },
  {
    title: "Combobox Popup",
    component: ComboboxPopup,
    sourcePath: "ui/components/combobox-popup.tsx",
  },
] as const

export default function ComboboxPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Combobox</h1>
        <p className="text-lg text-muted-foreground">
          Combobox component — {examples.length} examples rendered live with source code
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
