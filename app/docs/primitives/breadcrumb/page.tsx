import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import BreadcrumbBasic from "@/ui/components/breadcrumb-basic"
import BreadcrumbDemo from "@/ui/components/breadcrumb-demo"
import BreadcrumbDropdown from "@/ui/components/breadcrumb-dropdown"
import BreadcrumbEllipsisDemo from "@/ui/components/breadcrumb-ellipsis"
import BreadcrumbLinkDemo from "@/ui/components/breadcrumb-link"
import BreadcrumbSeparatorDemo from "@/ui/components/breadcrumb-separator"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: BreadcrumbBasic,
    sourcePath: "ui/components/breadcrumb-basic.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: BreadcrumbDemo,
    sourcePath: "ui/components/breadcrumb-demo.tsx",
  },
  {
    id: "dropdown",
    title: "Dropdown",
    component: BreadcrumbDropdown,
    sourcePath: "ui/components/breadcrumb-dropdown.tsx",
  },
  {
    id: "ellipsis",
    title: "Ellipsis",
    component: BreadcrumbEllipsisDemo,
    sourcePath: "ui/components/breadcrumb-ellipsis.tsx",
  },
  {
    id: "link",
    title: "Link",
    component: BreadcrumbLinkDemo,
    sourcePath: "ui/components/breadcrumb-link.tsx",
  },
  {
    id: "separator",
    title: "Separator",
    component: BreadcrumbSeparatorDemo,
    sourcePath: "ui/components/breadcrumb-separator.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "dropdown", title: "Dropdown", depth: 3 },
  { id: "ellipsis", title: "Ellipsis", depth: 3 },
  { id: "link", title: "Link", depth: 3 },
  { id: "separator", title: "Separator", depth: 3 },
]

export default function BreadcrumbPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Breadcrumb"
        description="Displays the path to the current resource using a hierarchy of links."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add breadcrumb" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Breadcrumb } from "@/primitives/breadcrumb"`}
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
