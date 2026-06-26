import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import NavigationMenuDemo from "@/ui/components/navigation-menu-demo"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: NavigationMenuDemo,
    sourcePath: "ui/components/navigation-menu-demo.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "demo", title: "Demo" },
]

export default function NavigationMenuPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="NavigationMenu"
        description="NavigationMenu component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the navigation-menu primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add navigation-menu" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the NavigationMenu component."
      >
        <CodeBlock
          code={`import { NavigationMenu } from "@/primitives/navigation-menu"`}
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
