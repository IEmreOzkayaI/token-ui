import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { CheckboxBasic } from "@/ui/components/checkbox-basic"
import CheckboxDemo from "@/ui/components/checkbox-demo"
import { CheckboxDescription } from "@/ui/components/checkbox-description"
import { CheckboxDisabled } from "@/ui/components/checkbox-disabled"
import { CheckboxGroup } from "@/ui/components/checkbox-group"
import { CheckboxInvalid } from "@/ui/components/checkbox-invalid"
import { CheckboxInTable } from "@/ui/components/checkbox-table"

const examples = [
  {
    title: "Checkbox Basic",
    component: CheckboxBasic,
    sourcePath: "ui/components/checkbox-basic.tsx",
  },
  {
    title: "Checkbox Demo",
    component: CheckboxDemo,
    sourcePath: "ui/components/checkbox-demo.tsx",
  },
  {
    title: "Checkbox Description",
    component: CheckboxDescription,
    sourcePath: "ui/components/checkbox-description.tsx",
  },
  {
    title: "Checkbox Disabled",
    component: CheckboxDisabled,
    sourcePath: "ui/components/checkbox-disabled.tsx",
  },
  {
    title: "Checkbox Group",
    component: CheckboxGroup,
    sourcePath: "ui/components/checkbox-group.tsx",
  },
  {
    title: "Checkbox Invalid",
    component: CheckboxInvalid,
    sourcePath: "ui/components/checkbox-invalid.tsx",
  },
  {
    title: "Checkbox Table",
    component: CheckboxInTable,
    sourcePath: "ui/components/checkbox-table.tsx",
  },
] as const

export default function CheckboxPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Checkbox</h1>
        <p className="text-lg text-muted-foreground">
          Checkbox component — {examples.length} examples rendered live with source code
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
