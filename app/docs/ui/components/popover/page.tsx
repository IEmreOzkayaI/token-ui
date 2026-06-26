import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import PopoverAlignments from "@/ui/components/popover-alignments"
import PopoverBasic from "@/ui/components/popover-basic"
import PopoverDemo from "@/ui/components/popover-demo"
import PopoverForm from "@/ui/components/popover-form"

const examples = [
  {
    id: "alignments",
    title: "Alignments",
    component: PopoverAlignments,
    sourcePath: "ui/components/popover-alignments.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: PopoverBasic,
    sourcePath: "ui/components/popover-basic.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: PopoverDemo,
    sourcePath: "ui/components/popover-demo.tsx",
  },
  {
    id: "form",
    title: "Form",
    component: PopoverForm,
    sourcePath: "ui/components/popover-form.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "alignments", title: "Alignments", depth: 3 },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "form", title: "Form", depth: 3 },
]

export default function PopoverPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Popover"
        description="Displays rich content in a portal, triggered by a button."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add popover" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Popover } from "@/primitives/popover"`}
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
