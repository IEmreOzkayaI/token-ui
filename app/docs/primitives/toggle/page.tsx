import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ToggleDemo from "@/ui/components/toggle-demo"
import ToggleDisabled from "@/ui/components/toggle-disabled"
import ToggleGroupDemo from "@/ui/components/toggle-group-demo"
import ToggleGroupDisabled from "@/ui/components/toggle-group-disabled"
import ToggleGroupFontWeightSelector from "@/ui/components/toggle-group-font-weight-selector"
import ToggleGroupOutline from "@/ui/components/toggle-group-outline"
import ToggleGroupSizes from "@/ui/components/toggle-group-sizes"
import ToggleGroupSpacing from "@/ui/components/toggle-group-spacing"
import ToggleGroupVertical from "@/ui/components/toggle-group-vertical"
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
    id: "group-demo",
    title: "Group Demo",
    component: ToggleGroupDemo,
    sourcePath: "ui/components/toggle-group-demo.tsx",
  },
  {
    id: "group-disabled",
    title: "Group Disabled",
    component: ToggleGroupDisabled,
    sourcePath: "ui/components/toggle-group-disabled.tsx",
  },
  {
    id: "group-font-weight-selector",
    title: "Group Font Weight Selector",
    component: ToggleGroupFontWeightSelector,
    sourcePath: "ui/components/toggle-group-font-weight-selector.tsx",
  },
  {
    id: "group-outline",
    title: "Group Outline",
    component: ToggleGroupOutline,
    sourcePath: "ui/components/toggle-group-outline.tsx",
  },
  {
    id: "group-sizes",
    title: "Group Sizes",
    component: ToggleGroupSizes,
    sourcePath: "ui/components/toggle-group-sizes.tsx",
  },
  {
    id: "group-spacing",
    title: "Group Spacing",
    component: ToggleGroupSpacing,
    sourcePath: "ui/components/toggle-group-spacing.tsx",
  },
  {
    id: "group-vertical",
    title: "Group Vertical",
    component: ToggleGroupVertical,
    sourcePath: "ui/components/toggle-group-vertical.tsx",
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
    { id: "demo", title: "Demo" },
    { id: "disabled", title: "Disabled" },
    { id: "group-demo", title: "Group Demo" },
    { id: "group-disabled", title: "Group Disabled" },
    { id: "group-font-weight-selector", title: "Group Font Weight Selector" },
    { id: "group-outline", title: "Group Outline" },
    { id: "group-sizes", title: "Group Sizes" },
    { id: "group-spacing", title: "Group Spacing" },
    { id: "group-vertical", title: "Group Vertical" },
    { id: "outline", title: "Outline" },
    { id: "sizes", title: "Sizes" },
    { id: "text", title: "Text" },
]

export default function TogglePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Toggle"
        description="Toggle component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the toggle primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add toggle" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Toggle component."
      >
        <CodeBlock
          code={`import { Toggle } from "@/primitives/toggle"`}
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
