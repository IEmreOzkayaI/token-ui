import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import KbdButton from "@/ui/components/kbd-button"
import KbdDemo from "@/ui/components/kbd-demo"
import KbdGroupExample from "@/ui/components/kbd-group"
import KbdInputGroup from "@/ui/components/kbd-input-group"
import KbdTooltip from "@/ui/components/kbd-tooltip"

const examples = [
  {
    title: "Kbd Button",
    component: KbdButton,
    sourcePath: "ui/components/kbd-button.tsx",
  },
  {
    title: "Kbd Demo",
    component: KbdDemo,
    sourcePath: "ui/components/kbd-demo.tsx",
  },
  {
    title: "Kbd Group",
    component: KbdGroupExample,
    sourcePath: "ui/components/kbd-group.tsx",
  },
  {
    title: "Kbd Input Group",
    component: KbdInputGroup,
    sourcePath: "ui/components/kbd-input-group.tsx",
  },
  {
    title: "Kbd Tooltip",
    component: KbdTooltip,
    sourcePath: "ui/components/kbd-tooltip.tsx",
  },
] as const

export default function KbdPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Kbd</h1>
        <p className="text-lg text-muted-foreground">
          Kbd component — {examples.length} examples rendered live with source code
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
