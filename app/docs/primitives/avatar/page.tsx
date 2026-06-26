import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { AvatarBadgeIconExample } from "@/ui/components/avatar-badge-icon"
import { AvatarWithBadge } from "@/ui/components/avatar-badge"
import AvatarDemo from "@/ui/components/avatar-basic"
import { AvatarDropdown } from "@/ui/components/avatar-dropdown"
import { AvatarGroupCountIconExample } from "@/ui/components/avatar-group-count-icon"
import { AvatarGroupCountExample } from "@/ui/components/avatar-group-count"
import { AvatarGroupExample } from "@/ui/components/avatar-group"
import { AvatarSizeExample } from "@/ui/components/avatar-size"

const examples = [
  {
    title: "Avatar Badge Icon",
    component: AvatarBadgeIconExample,
    sourcePath: "ui/components/avatar-badge-icon.tsx",
  },
  {
    title: "Avatar Badge",
    component: AvatarWithBadge,
    sourcePath: "ui/components/avatar-badge.tsx",
  },
  {
    title: "Avatar Basic",
    component: AvatarDemo,
    sourcePath: "ui/components/avatar-basic.tsx",
  },
  {
    title: "Avatar Dropdown",
    component: AvatarDropdown,
    sourcePath: "ui/components/avatar-dropdown.tsx",
  },
  {
    title: "Avatar Group Count Icon",
    component: AvatarGroupCountIconExample,
    sourcePath: "ui/components/avatar-group-count-icon.tsx",
  },
  {
    title: "Avatar Group Count",
    component: AvatarGroupCountExample,
    sourcePath: "ui/components/avatar-group-count.tsx",
  },
  {
    title: "Avatar Group",
    component: AvatarGroupExample,
    sourcePath: "ui/components/avatar-group.tsx",
  },
  {
    title: "Avatar Size",
    component: AvatarSizeExample,
    sourcePath: "ui/components/avatar-size.tsx",
  },
] as const

export default function AvatarPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Avatar</h1>
        <p className="text-lg text-muted-foreground">
          Avatar component — {examples.length} examples rendered live with source code
        </p>

        <div className="flex flex-col gap-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <ComponentExample
                key={example.sourcePath}
                title={example.title}
                source={readSource(example.sourcePath)}
              >
                <Component />
              </ComponentExample>
            )
          })}
        </div>
      </div>
    </div>
  )
}
