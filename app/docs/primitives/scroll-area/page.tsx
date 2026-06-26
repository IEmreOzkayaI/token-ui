import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import ScrollAreaDemo from "@/ui/components/scroll-area-demo"
import ScrollAreaHorizontalDemo from "@/ui/components/scroll-area-horizontal-demo"

const examples = [
  {
    title: "ScrollArea Demo",
    component: ScrollAreaDemo,
    sourcePath: "ui/components/scroll-area-demo.tsx",
  },
  {
    title: "ScrollArea Horizontal Demo",
    component: ScrollAreaHorizontalDemo,
    sourcePath: "ui/components/scroll-area-horizontal-demo.tsx",
  },
] as const

export default function ScrollAreaPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">ScrollArea</h1>
        <p className="text-lg text-muted-foreground">
          ScrollArea component — {examples.length} examples rendered live with source code
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
