import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import SheetDemo from "@/ui/components/sheet-demo"
import SheetNoCloseButton from "@/ui/components/sheet-no-close-button"
import SheetSide from "@/ui/components/sheet-side"

const examples = [
  {
    title: "Sheet Demo",
    component: SheetDemo,
    sourcePath: "ui/components/sheet-demo.tsx",
  },
  {
    title: "Sheet No Close Button",
    component: SheetNoCloseButton,
    sourcePath: "ui/components/sheet-no-close-button.tsx",
  },
  {
    title: "Sheet Side",
    component: SheetSide,
    sourcePath: "ui/components/sheet-side.tsx",
  },
] as const

export default function SheetPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Sheet</h1>
        <p className="text-lg text-muted-foreground">
          Sheet component — {examples.length} examples rendered live with source code
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
