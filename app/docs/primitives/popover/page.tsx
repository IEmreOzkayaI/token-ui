import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import PopoverAlignments from "@/ui/components/popover-alignments"
import PopoverBasic from "@/ui/components/popover-basic"
import PopoverDemo from "@/ui/components/popover-demo"
import PopoverForm from "@/ui/components/popover-form"

const examples = [
  {
    title: "Popover Alignments",
    component: PopoverAlignments,
    sourcePath: "ui/components/popover-alignments.tsx",
  },
  {
    title: "Popover Basic",
    component: PopoverBasic,
    sourcePath: "ui/components/popover-basic.tsx",
  },
  {
    title: "Popover Demo",
    component: PopoverDemo,
    sourcePath: "ui/components/popover-demo.tsx",
  },
  {
    title: "Popover Form",
    component: PopoverForm,
    sourcePath: "ui/components/popover-form.tsx",
  },
] as const

export default function PopoverPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Popover</h1>
        <p className="text-lg text-muted-foreground">
          Popover component — {examples.length} examples rendered live with source code
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
