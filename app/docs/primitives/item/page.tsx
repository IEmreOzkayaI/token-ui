import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import { ItemAvatar } from "@/ui/components/item-avatar"
import { ItemDemo } from "@/ui/components/item-demo"
import { ItemDropdown } from "@/ui/components/item-dropdown"
import { ItemGroupExample } from "@/ui/components/item-group"
import { ItemHeaderDemo } from "@/ui/components/item-header"
import { ItemIcon } from "@/ui/components/item-icon"
import { ItemImage } from "@/ui/components/item-image"
import { ItemLink } from "@/ui/components/item-link"
import { ItemSizeDemo } from "@/ui/components/item-size"
import { ItemVariant } from "@/ui/components/item-variant"

const examples = [
  {
    title: "Item Avatar",
    component: ItemAvatar,
    sourcePath: "ui/components/item-avatar.tsx",
  },
  {
    title: "Item Demo",
    component: ItemDemo,
    sourcePath: "ui/components/item-demo.tsx",
  },
  {
    title: "Item Dropdown",
    component: ItemDropdown,
    sourcePath: "ui/components/item-dropdown.tsx",
  },
  {
    title: "Item Group",
    component: ItemGroupExample,
    sourcePath: "ui/components/item-group.tsx",
  },
  {
    title: "Item Header",
    component: ItemHeaderDemo,
    sourcePath: "ui/components/item-header.tsx",
  },
  {
    title: "Item Icon",
    component: ItemIcon,
    sourcePath: "ui/components/item-icon.tsx",
  },
  {
    title: "Item Image",
    component: ItemImage,
    sourcePath: "ui/components/item-image.tsx",
  },
  {
    title: "Item Link",
    component: ItemLink,
    sourcePath: "ui/components/item-link.tsx",
  },
  {
    title: "Item Size",
    component: ItemSizeDemo,
    sourcePath: "ui/components/item-size.tsx",
  },
  {
    title: "Item Variant",
    component: ItemVariant,
    sourcePath: "ui/components/item-variant.tsx",
  },
] as const

export default function ItemPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Item</h1>
        <p className="text-lg text-muted-foreground">
          Item component — {examples.length} examples rendered live with source code
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
