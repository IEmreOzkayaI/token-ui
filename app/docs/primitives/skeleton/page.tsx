import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import SkeletonAvatar from "@/ui/components/skeleton-avatar"
import SkeletonCard from "@/ui/components/skeleton-card"
import SkeletonDemo from "@/ui/components/skeleton-demo"
import SkeletonForm from "@/ui/components/skeleton-form"
import SkeletonTable from "@/ui/components/skeleton-table"
import SkeletonText from "@/ui/components/skeleton-text"

const examples = [
  {
    id: "avatar",
    title: "Avatar",
    component: SkeletonAvatar,
    sourcePath: "ui/components/skeleton-avatar.tsx",
  },
  {
    id: "card",
    title: "Card",
    component: SkeletonCard,
    sourcePath: "ui/components/skeleton-card.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: SkeletonDemo,
    sourcePath: "ui/components/skeleton-demo.tsx",
  },
  {
    id: "form",
    title: "Form",
    component: SkeletonForm,
    sourcePath: "ui/components/skeleton-form.tsx",
  },
  {
    id: "table",
    title: "Table",
    component: SkeletonTable,
    sourcePath: "ui/components/skeleton-table.tsx",
  },
  {
    id: "text",
    title: "Text",
    component: SkeletonText,
    sourcePath: "ui/components/skeleton-text.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "avatar", title: "Avatar" },
    { id: "card", title: "Card" },
    { id: "demo", title: "Demo" },
    { id: "form", title: "Form" },
    { id: "table", title: "Table" },
    { id: "text", title: "Text" },
]

export default function SkeletonPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Skeleton"
        description="Skeleton component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the skeleton primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add skeleton" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Skeleton component."
      >
        <CodeBlock
          code={`import { Skeleton } from "@/primitives/skeleton"`}
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
