import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import SelectAlignItem from "@/ui/components/select-align-item"
import SelectDemo from "@/ui/components/select-demo"
import SelectDisabled from "@/ui/components/select-disabled"
import SelectGroups from "@/ui/components/select-groups"
import SelectInvalid from "@/ui/components/select-invalid"
import SelectScrollable from "@/ui/components/select-scrollable"

const examples = [
  {
    title: "Select Align Item",
    component: SelectAlignItem,
    sourcePath: "ui/components/select-align-item.tsx",
  },
  {
    title: "Select Demo",
    component: SelectDemo,
    sourcePath: "ui/components/select-demo.tsx",
  },
  {
    title: "Select Disabled",
    component: SelectDisabled,
    sourcePath: "ui/components/select-disabled.tsx",
  },
  {
    title: "Select Groups",
    component: SelectGroups,
    sourcePath: "ui/components/select-groups.tsx",
  },
  {
    title: "Select Invalid",
    component: SelectInvalid,
    sourcePath: "ui/components/select-invalid.tsx",
  },
  {
    title: "Select Scrollable",
    component: SelectScrollable,
    sourcePath: "ui/components/select-scrollable.tsx",
  },
] as const

export default function SelectPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Select</h1>
        <p className="text-lg text-muted-foreground">
          Select component — {examples.length} examples rendered live with source code
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
