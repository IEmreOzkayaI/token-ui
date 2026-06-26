import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import SonnerDemo from "@/ui/components/sonner-demo"
import SonnerDescription from "@/ui/components/sonner-description"
import SonnerPosition from "@/ui/components/sonner-position"
import SonnerTypes from "@/ui/components/sonner-types"

const examples = [
  {
    title: "Sonner Demo",
    component: SonnerDemo,
    sourcePath: "ui/components/sonner-demo.tsx",
  },
  {
    title: "Sonner Description",
    component: SonnerDescription,
    sourcePath: "ui/components/sonner-description.tsx",
  },
  {
    title: "Sonner Position",
    component: SonnerPosition,
    sourcePath: "ui/components/sonner-position.tsx",
  },
  {
    title: "Sonner Types",
    component: SonnerTypes,
    sourcePath: "ui/components/sonner-types.tsx",
  },
] as const

export default function SonnerPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Sonner</h1>
        <p className="text-lg text-muted-foreground">
          Sonner component — {examples.length} examples rendered live with source code
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
