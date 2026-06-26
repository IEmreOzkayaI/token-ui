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
    { id: "demo", title: "Demo" },
    { id: "disabled", title: "Disabled" },
    { id: "font-weight-selector", title: "Font Weight Selector" },
    { id: "outline", title: "Outline" },
    { id: "sizes", title: "Sizes" },
    { id: "spacing", title: "Spacing" },
    { id: "vertical", title: "Vertical" },
]

export default function ToggleGroupPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="ToggleGroup"
        description="ToggleGroup component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the toggle-group primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add toggle-group" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the ToggleGroup component."
      >
        <CodeBlock
          code={`import { ToggleGroup } from "@/primitives/toggle-group"`}
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
