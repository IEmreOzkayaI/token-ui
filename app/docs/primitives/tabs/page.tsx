import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { TabsDemo } from "@/ui/components/tabs-demo"
import { TabsDisabled } from "@/ui/components/tabs-disabled"
import { TabsIcons } from "@/ui/components/tabs-icons"
import { TabsLine } from "@/ui/components/tabs-line"
import { TabsVertical } from "@/ui/components/tabs-vertical"

const examples = [
  {
    title: "Tabs Demo",
    component: TabsDemo,
    sourcePath: "ui/components/tabs-demo.tsx",
  },
  {
    title: "Tabs Disabled",
    component: TabsDisabled,
    sourcePath: "ui/components/tabs-disabled.tsx",
  },
  {
    title: "Tabs Icons",
    component: TabsIcons,
    sourcePath: "ui/components/tabs-icons.tsx",
  },
  {
    title: "Tabs Line",
    component: TabsLine,
    sourcePath: "ui/components/tabs-line.tsx",
  },
  {
    title: "Tabs Vertical",
    component: TabsVertical,
    sourcePath: "ui/components/tabs-vertical.tsx",
  },
] as const

export default function TabsPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Tabs</h1>
        <p className="text-lg text-muted-foreground">
          Tabs component — {examples.length} examples rendered live with source code
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
