import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import SeparatorDemo from "@/ui/components/separator-demo"
import SeparatorList from "@/ui/components/separator-list"
import SeparatorMenu from "@/ui/components/separator-menu"
import SeparatorVertical from "@/ui/components/separator-vertical"

const examples = [
  {
    title: "Separator Demo",
    component: SeparatorDemo,
    sourcePath: "ui/components/separator-demo.tsx",
  },
  {
    title: "Separator List",
    component: SeparatorList,
    sourcePath: "ui/components/separator-list.tsx",
  },
  {
    title: "Separator Menu",
    component: SeparatorMenu,
    sourcePath: "ui/components/separator-menu.tsx",
  },
  {
    title: "Separator Vertical",
    component: SeparatorVertical,
    sourcePath: "ui/components/separator-vertical.tsx",
  },
] as const

export default function SeparatorPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Separator</h1>
        <p className="text-lg text-muted-foreground">
          Separator component — {examples.length} examples rendered live with source code
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
