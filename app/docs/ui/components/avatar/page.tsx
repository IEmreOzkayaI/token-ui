import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import AvatarBadgeIconExample from "@/ui/components/avatar/badge-icon"
import AvatarWithBadge from "@/ui/components/avatar/badge"
import AvatarDemo from "@/ui/components/avatar/basic"
import AvatarDropdown from "@/ui/components/avatar/dropdown"
import AvatarGroupCountIconExample from "@/ui/components/avatar/group-count-icon"
import AvatarGroupCountExample from "@/ui/components/avatar/group-count"
import AvatarGroupExample from "@/ui/components/avatar/group"
import AvatarSizeExample from "@/ui/components/avatar/size"

const examples = [
  {
    id: "badge-icon",
    title: "Badge Icon",
    component: AvatarBadgeIconExample,
    sourcePath: "ui/components/avatar/badge-icon.tsx",
  },
  {
    id: "badge",
    title: "Badge",
    component: AvatarWithBadge,
    sourcePath: "ui/components/avatar/badge.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: AvatarDemo,
    sourcePath: "ui/components/avatar/basic.tsx",
  },
  {
    id: "dropdown",
    title: "Dropdown",
    component: AvatarDropdown,
    sourcePath: "ui/components/avatar/dropdown.tsx",
  },
  {
    id: "group-count-icon",
    title: "Group Count Icon",
    component: AvatarGroupCountIconExample,
    sourcePath: "ui/components/avatar/group-count-icon.tsx",
  },
  {
    id: "group-count",
    title: "Group Count",
    component: AvatarGroupCountExample,
    sourcePath: "ui/components/avatar/group-count.tsx",
  },
  {
    id: "group",
    title: "Group",
    component: AvatarGroupExample,
    sourcePath: "ui/components/avatar/group.tsx",
  },
  {
    id: "size",
    title: "Size",
    component: AvatarSizeExample,
    sourcePath: "ui/components/avatar/size.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "badge-icon", title: "Badge Icon", depth: 3 },
  { id: "badge", title: "Badge", depth: 3 },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "dropdown", title: "Dropdown", depth: 3 },
  { id: "group-count-icon", title: "Group Count Icon", depth: 3 },
  { id: "group-count", title: "Group Count", depth: 3 },
  { id: "group", title: "Group", depth: 3 },
  { id: "size", title: "Size", depth: 3 },
]

export default function AvatarPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Avatar"
        description="An image element with a fallback for representing the user."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add avatar" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Avatar } from "@/primitives/avatar"`}
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
