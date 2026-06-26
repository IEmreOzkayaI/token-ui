import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import AspectRatioDemo from "@/ui/components/aspect-ratio-demo"
import { AspectRatioPortrait } from "@/ui/components/aspect-ratio-portrait"
import { AspectRatioSquare } from "@/ui/components/aspect-ratio-square"

const examples = [
  {
    title: "AspectRatio Demo",
    component: AspectRatioDemo,
    sourcePath: "ui/components/aspect-ratio-demo.tsx",
  },
  {
    title: "AspectRatio Portrait",
    component: AspectRatioPortrait,
    sourcePath: "ui/components/aspect-ratio-portrait.tsx",
  },
  {
    title: "AspectRatio Square",
    component: AspectRatioSquare,
    sourcePath: "ui/components/aspect-ratio-square.tsx",
  },
] as const

export default function AspectRatioPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">AspectRatio</h1>
        <p className="text-lg text-muted-foreground">
          AspectRatio component — {examples.length} examples rendered live with source code
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
