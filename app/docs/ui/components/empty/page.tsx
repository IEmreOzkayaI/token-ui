import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import EmptyAvatarGroup from "@/ui/components/empty/avatar-group"
import EmptyAvatar from "@/ui/components/empty/avatar"
import EmptyInCard from "@/ui/components/empty/card"
import EmptyInputGroup from "@/ui/components/empty/input-group"

const examples = [
  {
    id: "avatar-group",
    title: "Avatar Group",
    component: EmptyAvatarGroup,
    sourcePath: "ui/components/empty/avatar-group.tsx",
  },
  {
    id: "avatar",
    title: "Avatar",
    component: EmptyAvatar,
    sourcePath: "ui/components/empty/avatar.tsx",
  },
  {
    id: "card",
    title: "Card",
    component: EmptyInCard,
    sourcePath: "ui/components/empty/card.tsx",
  },
  {
    id: "input-group",
    title: "Input Group",
    component: EmptyInputGroup,
    sourcePath: "ui/components/empty/input-group.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "avatar-group", title: "Avatar Group", depth: 3 },
  { id: "avatar", title: "Avatar", depth: 3 },
  { id: "card", title: "Card", depth: 3 },
  { id: "input-group", title: "Input Group", depth: 3 },
]

export default function EmptyPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Empty"
        description="Placeholder component for empty states with icon, title, and action."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add empty" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Empty } from "@/primitives/empty"`}
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
