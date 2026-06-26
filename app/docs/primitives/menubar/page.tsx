import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import MenubarCheckbox from "@/ui/components/menubar-checkbox"
import MenubarDemo from "@/ui/components/menubar-demo"
import MenubarIcons from "@/ui/components/menubar-icons"
import MenubarRadio from "@/ui/components/menubar-radio"
import MenubarSubmenu from "@/ui/components/menubar-submenu"

const examples = [
  {
    id: "checkbox",
    title: "Checkbox",
    component: MenubarCheckbox,
    sourcePath: "ui/components/menubar-checkbox.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: MenubarDemo,
    sourcePath: "ui/components/menubar-demo.tsx",
  },
  {
    id: "icons",
    title: "Icons",
    component: MenubarIcons,
    sourcePath: "ui/components/menubar-icons.tsx",
  },
  {
    id: "radio",
    title: "Radio",
    component: MenubarRadio,
    sourcePath: "ui/components/menubar-radio.tsx",
  },
  {
    id: "submenu",
    title: "Submenu",
    component: MenubarSubmenu,
    sourcePath: "ui/components/menubar-submenu.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "checkbox", title: "Checkbox" },
    { id: "demo", title: "Demo" },
    { id: "icons", title: "Icons" },
    { id: "radio", title: "Radio" },
    { id: "submenu", title: "Submenu" },
]

export default function MenubarPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Menubar"
        description="Menubar component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the menubar primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add menubar" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Menubar component."
      >
        <CodeBlock
          code={`import { Menubar } from "@/primitives/menubar"`}
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
