import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ToggleDemo from "@/ui/components/toggle-demo"
import ToggleDisabled from "@/ui/components/toggle-disabled"
import ToggleOutline from "@/ui/components/toggle-outline"
import ToggleSizes from "@/ui/components/toggle-sizes"
import ToggleText from "@/ui/components/toggle-text"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: ToggleDemo,
    sourcePath: "ui/components/toggle-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: ToggleDisabled,
    sourcePath: "ui/components/toggle-disabled.tsx",
  },
  {
    id: "outline",
    title: "Outline",
    component: ToggleOutline,
    sourcePath: "ui/components/toggle-outline.tsx",
  },
  {
    id: "sizes",
    title: "Sizes",
    component: ToggleSizes,
    sourcePath: "ui/components/toggle-sizes.tsx",
  },
  {
    id: "text",
    title: "Text",
    component: ToggleText,
    sourcePath: "ui/components/toggle-text.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "outline", title: "Outline", depth: 3 },
  { id: "sizes", title: "Sizes", depth: 3 },
  { id: "text", title: "Text", depth: 3 },
]

export default function TogglePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Toggle"
        description="A two-state button that can be either on or off."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add toggle" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Toggle } from "@/primitives/toggle"`}
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
