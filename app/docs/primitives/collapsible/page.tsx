import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import CollapsibleDemo from "@/ui/components/collapsible-demo"
import { CollapsibleFileTree } from "@/ui/components/collapsible-file-tree"
import { CollapsibleSettings } from "@/ui/components/collapsible-settings"

const examples = [
  {
    title: "Collapsible Demo",
    component: CollapsibleDemo,
    sourcePath: "ui/components/collapsible-demo.tsx",
  },
  {
    title: "Collapsible File Tree",
    component: CollapsibleFileTree,
    sourcePath: "ui/components/collapsible-file-tree.tsx",
  },
  {
    title: "Collapsible Settings",
    component: CollapsibleSettings,
    sourcePath: "ui/components/collapsible-settings.tsx",
  },
] as const

export default function CollapsiblePage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Collapsible</h1>
        <p className="text-lg text-muted-foreground">
          Collapsible component — {examples.length} examples rendered live with source code
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
