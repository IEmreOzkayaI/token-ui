import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import AlertDialogBasic from "@/ui/components/alert-dialog-basic"
import AlertDialogDemo from "@/ui/components/alert-dialog-demo"
import AlertDialogDestructive from "@/ui/components/alert-dialog-destructive"
import AlertDialogWithMedia from "@/ui/components/alert-dialog-media"
import AlertDialogSmallWithMedia from "@/ui/components/alert-dialog-small-media"
import AlertDialogSmall from "@/ui/components/alert-dialog-small"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: AlertDialogBasic,
    sourcePath: "ui/components/alert-dialog-basic.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: AlertDialogDemo,
    sourcePath: "ui/components/alert-dialog-demo.tsx",
  },
  {
    id: "destructive",
    title: "Destructive",
    component: AlertDialogDestructive,
    sourcePath: "ui/components/alert-dialog-destructive.tsx",
  },
  {
    id: "media",
    title: "Media",
    component: AlertDialogWithMedia,
    sourcePath: "ui/components/alert-dialog-media.tsx",
  },
  {
    id: "small-media",
    title: "Small Media",
    component: AlertDialogSmallWithMedia,
    sourcePath: "ui/components/alert-dialog-small-media.tsx",
  },
  {
    id: "small",
    title: "Small",
    component: AlertDialogSmall,
    sourcePath: "ui/components/alert-dialog-small.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "destructive", title: "Destructive", depth: 3 },
  { id: "media", title: "Media", depth: 3 },
  { id: "small-media", title: "Small Media", depth: 3 },
  { id: "small", title: "Small", depth: 3 },
]

export default function AlertDialogPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="AlertDialog"
        description="A modal dialog that interrupts the user with important content and expects a response."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add alert-dialog" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { AlertDialog } from "@/primitives/alert-dialog"`}
        />
      </DocsSection>

      <DocsSection id="examples" title="Examples">
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
      </DocsSection>
    </DocsPage>
  )
}
