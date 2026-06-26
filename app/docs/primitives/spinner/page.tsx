import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { SpinnerBadge } from "@/ui/components/spinner-badge"
import { SpinnerButton } from "@/ui/components/spinner-button"
import { SpinnerCustom } from "@/ui/components/spinner-custom"
import { SpinnerDemo } from "@/ui/components/spinner-demo"
import { SpinnerEmpty } from "@/ui/components/spinner-empty"
import { SpinnerInputGroup } from "@/ui/components/spinner-input-group"
import { SpinnerSize } from "@/ui/components/spinner-size"

const examples = [
  {
    title: "Spinner Badge",
    component: SpinnerBadge,
    sourcePath: "ui/components/spinner-badge.tsx",
  },
  {
    title: "Spinner Button",
    component: SpinnerButton,
    sourcePath: "ui/components/spinner-button.tsx",
  },
  {
    title: "Spinner Custom",
    component: SpinnerCustom,
    sourcePath: "ui/components/spinner-custom.tsx",
  },
  {
    title: "Spinner Demo",
    component: SpinnerDemo,
    sourcePath: "ui/components/spinner-demo.tsx",
  },
  {
    title: "Spinner Empty",
    component: SpinnerEmpty,
    sourcePath: "ui/components/spinner-empty.tsx",
  },
  {
    title: "Spinner Input Group",
    component: SpinnerInputGroup,
    sourcePath: "ui/components/spinner-input-group.tsx",
  },
  {
    title: "Spinner Size",
    component: SpinnerSize,
    sourcePath: "ui/components/spinner-size.tsx",
  },
] as const

export default function SpinnerPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Spinner</h1>
        <p className="text-lg text-muted-foreground">
          Spinner component — {examples.length} examples rendered live with source code
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
