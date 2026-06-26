import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import TextareaButton from "@/ui/components/textarea-button"
import TextareaDemo from "@/ui/components/textarea-demo"
import TextareaDisabled from "@/ui/components/textarea-disabled"
import TextareaField from "@/ui/components/textarea-field"
import TextareaInvalid from "@/ui/components/textarea-invalid"

const examples = [
  {
    title: "Textarea Button",
    component: TextareaButton,
    sourcePath: "ui/components/textarea-button.tsx",
  },
  {
    title: "Textarea Demo",
    component: TextareaDemo,
    sourcePath: "ui/components/textarea-demo.tsx",
  },
  {
    title: "Textarea Disabled",
    component: TextareaDisabled,
    sourcePath: "ui/components/textarea-disabled.tsx",
  },
  {
    title: "Textarea Field",
    component: TextareaField,
    sourcePath: "ui/components/textarea-field.tsx",
  },
  {
    title: "Textarea Invalid",
    component: TextareaInvalid,
    sourcePath: "ui/components/textarea-invalid.tsx",
  },
] as const

export default function TextareaPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Textarea</h1>
        <p className="text-lg text-muted-foreground">
          Textarea component — {examples.length} examples rendered live with source code
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
