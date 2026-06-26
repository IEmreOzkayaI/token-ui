import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
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
    id: "action",
    title: "Action",
    component: AlertActionExample,
    sourcePath: "ui/components/alert-action.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: AlertBasic,
    sourcePath: "ui/components/alert-basic.tsx",
  },
  {
    id: "colors",
    title: "Colors",
    component: AlertColors,
    sourcePath: "ui/components/alert-colors.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: AlertDemo,
    sourcePath: "ui/components/alert-demo.tsx",
  },
  {
    id: "destructive",
    title: "Destructive",
    component: AlertDestructive,
    sourcePath: "ui/components/alert-destructive.tsx",
  },
  {
    id: "dialog-basic",
    title: "Dialog Basic",
    component: AlertDialogBasic,
    sourcePath: "ui/components/alert-dialog-basic.tsx",
  },
  {
    id: "dialog-demo",
    title: "Dialog Demo",
    component: AlertDialogDemo,
    sourcePath: "ui/components/alert-dialog-demo.tsx",
  },
  {
    id: "dialog-destructive",
    title: "Dialog Destructive",
    component: AlertDialogDestructive,
    sourcePath: "ui/components/alert-dialog-destructive.tsx",
  },
  {
    id: "dialog-media",
    title: "Dialog Media",
    component: AlertDialogWithMedia,
    sourcePath: "ui/components/alert-dialog-media.tsx",
  },
  {
    id: "dialog-small-media",
    title: "Dialog Small Media",
    component: AlertDialogSmallWithMedia,
    sourcePath: "ui/components/alert-dialog-small-media.tsx",
  },
  {
    id: "dialog-small",
    title: "Dialog Small",
    component: AlertDialogSmall,
    sourcePath: "ui/components/alert-dialog-small.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "action", title: "Action" },
    { id: "basic", title: "Basic" },
    { id: "colors", title: "Colors" },
    { id: "demo", title: "Demo" },
    { id: "destructive", title: "Destructive" },
    { id: "dialog-basic", title: "Dialog Basic" },
    { id: "dialog-demo", title: "Dialog Demo" },
    { id: "dialog-destructive", title: "Dialog Destructive" },
    { id: "dialog-media", title: "Dialog Media" },
    { id: "dialog-small-media", title: "Dialog Small Media" },
    { id: "dialog-small", title: "Dialog Small" },
]

export default function AlertPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Alert"
        description="Alert component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the alert primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add alert" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Alert component."
      >
        <CodeBlock
          code={`import { Alert } from "@/primitives/alert"`}
        />
      </DocsSection>

      <div className="space-y-10">
        {examples.map((example) => {
          const Component = example.component

          return (
            <DocsSection
              key={example.id}
              id={example.id}
              title={example.title}
            >
              <ComponentExample
                source={readSource(example.sourcePath)}
              >
                <Component />
              </ComponentExample>
            </DocsSection>
          )
        })}
      </div>
    </DocsPage>
  )
}
