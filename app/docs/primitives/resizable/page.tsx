import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import ResizableDemo from "@/ui/components/resizable-demo"
import ResizableHandleDemo from "@/ui/components/resizable-handle"
import { ResizableVertical } from "@/ui/components/resizable-vertical"

const examples = [
  {
    title: "Resizable Demo",
    component: ResizableDemo,
    sourcePath: "ui/components/resizable-demo.tsx",
  },
  {
    title: "Resizable Handle",
    component: ResizableHandleDemo,
    sourcePath: "ui/components/resizable-handle.tsx",
  },
  {
    title: "Resizable Vertical",
    component: ResizableVertical,
    sourcePath: "ui/components/resizable-vertical.tsx",
  },
] as const

export default function ResizablePage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Resizable</h1>
        <p className="text-lg text-muted-foreground">
          Resizable component — {examples.length} examples rendered live with source code
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
