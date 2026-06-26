import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import AlertDialogBasic from "@/ui/components/alert-dialog-basic"
import AlertDialogDemo from "@/ui/components/alert-dialog-demo"
import AlertDialogDestructive from "@/ui/components/alert-dialog-destructive"
import AlertDialogWithMedia from "@/ui/components/alert-dialog-media"
import AlertDialogSmallWithMedia from "@/ui/components/alert-dialog-small-media"
import AlertDialogSmall from "@/ui/components/alert-dialog-small"

const examples = [
  {
    title: "AlertDialog Basic",
    component: AlertDialogBasic,
    sourcePath: "ui/components/alert-dialog-basic.tsx",
  },
  {
    title: "AlertDialog Demo",
    component: AlertDialogDemo,
    sourcePath: "ui/components/alert-dialog-demo.tsx",
  },
  {
    title: "AlertDialog Destructive",
    component: AlertDialogDestructive,
    sourcePath: "ui/components/alert-dialog-destructive.tsx",
  },
  {
    title: "AlertDialog Media",
    component: AlertDialogWithMedia,
    sourcePath: "ui/components/alert-dialog-media.tsx",
  },
  {
    title: "AlertDialog Small Media",
    component: AlertDialogSmallWithMedia,
    sourcePath: "ui/components/alert-dialog-small-media.tsx",
  },
  {
    title: "AlertDialog Small",
    component: AlertDialogSmall,
    sourcePath: "ui/components/alert-dialog-small.tsx",
  },
] as const

export default function AlertDialogPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">AlertDialog</h1>
        <p className="text-lg text-muted-foreground">
          AlertDialog component — {examples.length} examples rendered live with source code
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
