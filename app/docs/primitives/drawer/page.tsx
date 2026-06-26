import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import DrawerScrollableContent from "@/ui/components/drawer-scrollable-content"
import DrawerWithSides from "@/ui/components/drawer-sides"

const examples = [
  {
    id: "scrollable-content",
    title: "Scrollable Content",
    component: DrawerScrollableContent,
    sourcePath: "ui/components/drawer-scrollable-content.tsx",
  },
  {
    id: "sides",
    title: "Sides",
    component: DrawerWithSides,
    sourcePath: "ui/components/drawer-sides.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "scrollable-content", title: "Scrollable Content" },
    { id: "sides", title: "Sides" },
]

export default function DrawerPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Drawer"
        description="Drawer component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the drawer primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add drawer" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Drawer component."
      >
        <CodeBlock
          code={`import { Drawer } from "@/primitives/drawer"`}
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
