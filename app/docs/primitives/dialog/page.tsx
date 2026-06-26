import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import DialogCloseButton from "@/ui/components/dialog-close-button"
import DialogDemo from "@/ui/components/dialog-demo"
import DialogNoCloseButton from "@/ui/components/dialog-no-close-button"
import DialogScrollableContent from "@/ui/components/dialog-scrollable-content"
import DialogStickyFooter from "@/ui/components/dialog-sticky-footer"

const examples = [
  {
    title: "Dialog Close Button",
    component: DialogCloseButton,
    sourcePath: "ui/components/dialog-close-button.tsx",
  },
  {
    title: "Dialog Demo",
    component: DialogDemo,
    sourcePath: "ui/components/dialog-demo.tsx",
  },
  {
    title: "Dialog No Close Button",
    component: DialogNoCloseButton,
    sourcePath: "ui/components/dialog-no-close-button.tsx",
  },
  {
    title: "Dialog Scrollable Content",
    component: DialogScrollableContent,
    sourcePath: "ui/components/dialog-scrollable-content.tsx",
  },
  {
    title: "Dialog Sticky Footer",
    component: DialogStickyFooter,
    sourcePath: "ui/components/dialog-sticky-footer.tsx",
  },
] as const

export default function DialogPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Dialog</h1>
        <p className="text-lg text-muted-foreground">
          Dialog component — {examples.length} examples rendered live with source code
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
