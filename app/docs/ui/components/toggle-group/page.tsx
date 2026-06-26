import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ToggleGroupDemo from "@/ui/components/toggle-group-demo"
import ToggleGroupDisabled from "@/ui/components/toggle-group-disabled"
import ToggleGroupFontWeightSelector from "@/ui/components/toggle-group-font-weight-selector"
import ToggleGroupOutline from "@/ui/components/toggle-group-outline"
import ToggleGroupSizes from "@/ui/components/toggle-group-sizes"
import ToggleGroupSpacing from "@/ui/components/toggle-group-spacing"
import ToggleGroupVertical from "@/ui/components/toggle-group-vertical"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: ToggleGroupDemo,
    sourcePath: "ui/components/toggle-group-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: ToggleGroupDisabled,
    sourcePath: "ui/components/toggle-group-disabled.tsx",
  },
  {
    id: "font-weight-selector",
    title: "Font Weight Selector",
    component: ToggleGroupFontWeightSelector,
    sourcePath: "ui/components/toggle-group-font-weight-selector.tsx",
  },
  {
    id: "outline",
    title: "Outline",
    component: ToggleGroupOutline,
    sourcePath: "ui/components/toggle-group-outline.tsx",
  },
  {
    id: "sizes",
    title: "Sizes",
    component: ToggleGroupSizes,
    sourcePath: "ui/components/toggle-group-sizes.tsx",
  },
  {
    id: "spacing",
    title: "Spacing",
    component: ToggleGroupSpacing,
    sourcePath: "ui/components/toggle-group-spacing.tsx",
  },
  {
    id: "vertical",
    title: "Vertical",
    component: ToggleGroupVertical,
    sourcePath: "ui/components/toggle-group-vertical.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "font-weight-selector", title: "Font Weight Selector", depth: 3 },
  { id: "outline", title: "Outline", depth: 3 },
  { id: "sizes", title: "Sizes", depth: 3 },
  { id: "spacing", title: "Spacing", depth: 3 },
  { id: "vertical", title: "Vertical", depth: 3 },
]

export default function ToggleGroupPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="ToggleGroup"
        description="A set of two-state buttons that can be toggled on or off."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add toggle-group" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { ToggleGroup } from "@/primitives/toggle-group"`}
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
