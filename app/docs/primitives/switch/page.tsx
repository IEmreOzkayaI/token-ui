import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { SwitchChoiceCard } from "@/ui/components/switch-choice-card"
import { SwitchDemo } from "@/ui/components/switch-demo"
import { SwitchDescription } from "@/ui/components/switch-description"
import { SwitchDisabled } from "@/ui/components/switch-disabled"
import { SwitchInvalid } from "@/ui/components/switch-invalid"
import { SwitchSizes } from "@/ui/components/switch-sizes"

const examples = [
  {
    title: "Switch Choice Card",
    component: SwitchChoiceCard,
    sourcePath: "ui/components/switch-choice-card.tsx",
  },
  {
    title: "Switch Demo",
    component: SwitchDemo,
    sourcePath: "ui/components/switch-demo.tsx",
  },
  {
    title: "Switch Description",
    component: SwitchDescription,
    sourcePath: "ui/components/switch-description.tsx",
  },
  {
    title: "Switch Disabled",
    component: SwitchDisabled,
    sourcePath: "ui/components/switch-disabled.tsx",
  },
  {
    title: "Switch Invalid",
    component: SwitchInvalid,
    sourcePath: "ui/components/switch-invalid.tsx",
  },
  {
    title: "Switch Sizes",
    component: SwitchSizes,
    sourcePath: "ui/components/switch-sizes.tsx",
  },
] as const

export default function SwitchPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Switch</h1>
        <p className="text-lg text-muted-foreground">
          Switch component — {examples.length} examples rendered live with source code
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
