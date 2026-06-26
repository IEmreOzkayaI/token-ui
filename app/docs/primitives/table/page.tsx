import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import TableActions from "@/ui/components/table-actions"
import TableDemo from "@/ui/components/table-demo"
import TableFooterExample from "@/ui/components/table-footer"

const examples = [
  {
    title: "Table Actions",
    component: TableActions,
    sourcePath: "ui/components/table-actions.tsx",
  },
  {
    title: "Table Demo",
    component: TableDemo,
    sourcePath: "ui/components/table-demo.tsx",
  },
  {
    title: "Table Footer",
    component: TableFooterExample,
    sourcePath: "ui/components/table-footer.tsx",
  },
] as const

export default function TablePage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Table</h1>
        <p className="text-lg text-muted-foreground">
          Table component — {examples.length} examples rendered live with source code
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
