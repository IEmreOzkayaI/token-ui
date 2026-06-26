import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import AvatarBadgeIconExample from "@/ui/components/avatar-badge-icon"
import AvatarWithBadge from "@/ui/components/avatar-badge"
import AvatarDemo from "@/ui/components/avatar-basic"
import AvatarDropdown from "@/ui/components/avatar-dropdown"
import AvatarGroupCountIconExample from "@/ui/components/avatar-group-count-icon"
import AvatarGroupCountExample from "@/ui/components/avatar-group-count"
import AvatarGroupExample from "@/ui/components/avatar-group"
import AvatarSizeExample from "@/ui/components/avatar-size"

const examples = [
  {
    id: "badge-icon",
    title: "Badge Icon",
    component: AvatarBadgeIconExample,
    sourcePath: "ui/components/avatar-badge-icon.tsx",
  },
  {
    id: "badge",
    title: "Badge",
    component: AvatarWithBadge,
    sourcePath: "ui/components/avatar-badge.tsx",
  },
  {
    id: "basic",
    title: "Basic",
    component: AvatarDemo,
    sourcePath: "ui/components/avatar-basic.tsx",
  },
  {
    id: "dropdown",
    title: "Dropdown",
    component: AvatarDropdown,
    sourcePath: "ui/components/avatar-dropdown.tsx",
  },
  {
    id: "group-count-icon",
    title: "Group Count Icon",
    component: AvatarGroupCountIconExample,
    sourcePath: "ui/components/avatar-group-count-icon.tsx",
  },
  {
    id: "group-count",
    title: "Group Count",
    component: AvatarGroupCountExample,
    sourcePath: "ui/components/avatar-group-count.tsx",
  },
  {
    id: "group",
    title: "Group",
    component: AvatarGroupExample,
    sourcePath: "ui/components/avatar-group.tsx",
  },
  {
    id: "size",
    title: "Size",
    component: AvatarSizeExample,
    sourcePath: "ui/components/avatar-size.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "badge-icon", title: "Badge Icon" },
    { id: "badge", title: "Badge" },
    { id: "basic", title: "Basic" },
    { id: "dropdown", title: "Dropdown" },
    { id: "group-count-icon", title: "Group Count Icon" },
    { id: "group-count", title: "Group Count" },
    { id: "group", title: "Group" },
    { id: "size", title: "Size" },
]

export default function AvatarPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Avatar"
        description="Avatar component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the avatar primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add avatar" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Avatar component."
      >
        <CodeBlock
          code={`import { Avatar } from "@/primitives/avatar"`}
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
