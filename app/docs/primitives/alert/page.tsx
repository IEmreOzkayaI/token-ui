import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import AlertActionExample from "@/ui/components/alert-action"
import AlertBasic from "@/ui/components/alert-basic"
import AlertColors from "@/ui/components/alert-colors"
import AlertDemo from "@/ui/components/alert-demo"
import AlertDestructive from "@/ui/components/alert-destructive"
import AlertDialogBasic from "@/ui/components/alert-dialog-basic"
import AlertDialogDemo from "@/ui/components/alert-dialog-demo"
import AlertDialogDestructive from "@/ui/components/alert-dialog-destructive"
import AlertDialogWithMedia from "@/ui/components/alert-dialog-media"
import AlertDialogSmallWithMedia from "@/ui/components/alert-dialog-small-media"
import AlertDialogSmall from "@/ui/components/alert-dialog-small"

const examples = [
  {
    title: "Alert Action",
    component: AlertActionExample,
    sourcePath: "ui/components/alert-action.tsx",
  },
  {
    title: "Alert Basic",
    component: AlertBasic,
    sourcePath: "ui/components/alert-basic.tsx",
  },
  {
    title: "Alert Colors",
    component: AlertColors,
    sourcePath: "ui/components/alert-colors.tsx",
  },
  {
    title: "Alert Demo",
    component: AlertDemo,
    sourcePath: "ui/components/alert-demo.tsx",
  },
  {
    title: "Alert Destructive",
    component: AlertDestructive,
    sourcePath: "ui/components/alert-destructive.tsx",
  },
  {
    title: "Alert Dialog Basic",
    component: AlertDialogBasic,
    sourcePath: "ui/components/alert-dialog-basic.tsx",
  },
  {
    title: "Alert Dialog Demo",
    component: AlertDialogDemo,
    sourcePath: "ui/components/alert-dialog-demo.tsx",
  },
  {
    title: "Alert Dialog Destructive",
    component: AlertDialogDestructive,
    sourcePath: "ui/components/alert-dialog-destructive.tsx",
  },
  {
    title: "Alert Dialog Media",
    component: AlertDialogWithMedia,
    sourcePath: "ui/components/alert-dialog-media.tsx",
  },
  {
    title: "Alert Dialog Small Media",
    component: AlertDialogSmallWithMedia,
    sourcePath: "ui/components/alert-dialog-small-media.tsx",
  },
  {
    title: "Alert Dialog Small",
    component: AlertDialogSmall,
    sourcePath: "ui/components/alert-dialog-small.tsx",
  },
] as const

export default function AlertPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Alert</h1>
        <p className="text-lg text-muted-foreground">
          Alert component — {examples.length} examples rendered live with source code
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
