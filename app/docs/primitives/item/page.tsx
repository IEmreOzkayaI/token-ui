import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ItemAvatar from "@/ui/components/item-avatar"
import ItemDemo from "@/ui/components/item-demo"
import ItemDropdown from "@/ui/components/item-dropdown"
import ItemGroupExample from "@/ui/components/item-group"
import ItemHeaderDemo from "@/ui/components/item-header"
import ItemIcon from "@/ui/components/item-icon"
import ItemImage from "@/ui/components/item-image"
import ItemLink from "@/ui/components/item-link"
import ItemSizeDemo from "@/ui/components/item-size"
import ItemVariant from "@/ui/components/item-variant"

const examples = [
  {
    id: "avatar",
    title: "Avatar",
    component: ItemAvatar,
    sourcePath: "ui/components/item-avatar.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: ItemDemo,
    sourcePath: "ui/components/item-demo.tsx",
  },
  {
    id: "dropdown",
    title: "Dropdown",
    component: ItemDropdown,
    sourcePath: "ui/components/item-dropdown.tsx",
  },
  {
    id: "group",
    title: "Group",
    component: ItemGroupExample,
    sourcePath: "ui/components/item-group.tsx",
  },
  {
    id: "header",
    title: "Header",
    component: ItemHeaderDemo,
    sourcePath: "ui/components/item-header.tsx",
  },
  {
    id: "icon",
    title: "Icon",
    component: ItemIcon,
    sourcePath: "ui/components/item-icon.tsx",
  },
  {
    id: "image",
    title: "Image",
    component: ItemImage,
    sourcePath: "ui/components/item-image.tsx",
  },
  {
    id: "link",
    title: "Link",
    component: ItemLink,
    sourcePath: "ui/components/item-link.tsx",
  },
  {
    id: "size",
    title: "Size",
    component: ItemSizeDemo,
    sourcePath: "ui/components/item-size.tsx",
  },
  {
    id: "variant",
    title: "Variant",
    component: ItemVariant,
    sourcePath: "ui/components/item-variant.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "avatar", title: "Avatar" },
    { id: "demo", title: "Demo" },
    { id: "dropdown", title: "Dropdown" },
    { id: "group", title: "Group" },
    { id: "header", title: "Header" },
    { id: "icon", title: "Icon" },
    { id: "image", title: "Image" },
    { id: "link", title: "Link" },
    { id: "size", title: "Size" },
    { id: "variant", title: "Variant" },
]

export default function ItemPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Item"
        description="Item component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the item primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add item" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Item component."
      >
        <CodeBlock
          code={`import { Item } from "@/primitives/item"`}
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
