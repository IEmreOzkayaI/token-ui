import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import DialogCloseButton from "@/ui/components/dialog-close-button"
import DialogDemo from "@/ui/components/dialog-demo"
import DialogNoCloseButton from "@/ui/components/dialog-no-close-button"
import DialogScrollableContent from "@/ui/components/dialog-scrollable-content"
import DialogStickyFooter from "@/ui/components/dialog-sticky-footer"

const examples = [
  {
    id: "close-button",
    title: "Close Button",
    component: DialogCloseButton,
    sourcePath: "ui/components/dialog-close-button.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: DialogDemo,
    sourcePath: "ui/components/dialog-demo.tsx",
  },
  {
    id: "no-close-button",
    title: "No Close Button",
    component: DialogNoCloseButton,
    sourcePath: "ui/components/dialog-no-close-button.tsx",
  },
  {
    id: "scrollable-content",
    title: "Scrollable Content",
    component: DialogScrollableContent,
    sourcePath: "ui/components/dialog-scrollable-content.tsx",
  },
  {
    id: "sticky-footer",
    title: "Sticky Footer",
    component: DialogStickyFooter,
    sourcePath: "ui/components/dialog-sticky-footer.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "close-button", title: "Close Button" },
    { id: "demo", title: "Demo" },
    { id: "no-close-button", title: "No Close Button" },
    { id: "scrollable-content", title: "Scrollable Content" },
    { id: "sticky-footer", title: "Sticky Footer" },
]

export default function DialogPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Dialog"
        description="Dialog component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the dialog primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add dialog" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Dialog component."
      >
        <CodeBlock
          code={`import { Dialog } from "@/primitives/dialog"`}
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
