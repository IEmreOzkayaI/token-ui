import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { RadioGroupChoiceCard } from "@/ui/components/radio-group-choice-card"
import { RadioGroupDemo } from "@/ui/components/radio-group-demo"
import { RadioGroupDescription } from "@/ui/components/radio-group-description"
import { RadioGroupDisabled } from "@/ui/components/radio-group-disabled"
import { RadioGroupFieldset } from "@/ui/components/radio-group-fieldset"
import { RadioGroupInvalid } from "@/ui/components/radio-group-invalid"

const examples = [
  {
    title: "RadioGroup Choice Card",
    component: RadioGroupChoiceCard,
    sourcePath: "ui/components/radio-group-choice-card.tsx",
  },
  {
    title: "RadioGroup Demo",
    component: RadioGroupDemo,
    sourcePath: "ui/components/radio-group-demo.tsx",
  },
  {
    title: "RadioGroup Description",
    component: RadioGroupDescription,
    sourcePath: "ui/components/radio-group-description.tsx",
  },
  {
    title: "RadioGroup Disabled",
    component: RadioGroupDisabled,
    sourcePath: "ui/components/radio-group-disabled.tsx",
  },
  {
    title: "RadioGroup Fieldset",
    component: RadioGroupFieldset,
    sourcePath: "ui/components/radio-group-fieldset.tsx",
  },
  {
    title: "RadioGroup Invalid",
    component: RadioGroupInvalid,
    sourcePath: "ui/components/radio-group-invalid.tsx",
  },
] as const

export default function RadioGroupPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">RadioGroup</h1>
        <p className="text-lg text-muted-foreground">
          RadioGroup component — {examples.length} examples rendered live with source code
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
