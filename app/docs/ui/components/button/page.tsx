import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import ButtonAsChild from "@/ui/components/button/aschild"
import ButtonDefault from "@/ui/components/button/default"
import ButtonDemo from "@/ui/components/button/demo"
import ButtonDestructive from "@/ui/components/button/destructive"
import ButtonGhost from "@/ui/components/button/ghost"
import ButtonIcon from "@/ui/components/button/icon"
import ButtonLink from "@/ui/components/button/link"
import ButtonOutline from "@/ui/components/button/outline"
import ButtonPremium from "@/ui/components/button/premium"
import ButtonRounded from "@/ui/components/button/rounded"
import ButtonSecondary from "@/ui/components/button/secondary"
import ButtonSize from "@/ui/components/button/size"
import ButtonSpinner from "@/ui/components/button/spinner"

const examples = [
  {
    id: "aschild",
    title: "Aschild",
    component: ButtonAsChild,
    sourcePath: "ui/components/button/aschild.tsx",
  },
  {
    id: "default",
    title: "Default",
    component: ButtonDefault,
    sourcePath: "ui/components/button/default.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: ButtonDemo,
    sourcePath: "ui/components/button/demo.tsx",
  },
  {
    id: "destructive",
    title: "Destructive",
    component: ButtonDestructive,
    sourcePath: "ui/components/button/destructive.tsx",
  },
  {
    id: "ghost",
    title: "Ghost",
    component: ButtonGhost,
    sourcePath: "ui/components/button/ghost.tsx",
  },
  {
    id: "icon",
    title: "Icon",
    component: ButtonIcon,
    sourcePath: "ui/components/button/icon.tsx",
  },
  {
    id: "link",
    title: "Link",
    component: ButtonLink,
    sourcePath: "ui/components/button/link.tsx",
  },
  {
    id: "outline",
    title: "Outline",
    component: ButtonOutline,
    sourcePath: "ui/components/button/outline.tsx",
  },
  {
    id: "premium",
    title: "Premium",
    component: ButtonPremium,
    sourcePath: "ui/components/button/premium.tsx",
  },
  {
    id: "rounded",
    title: "Rounded",
    component: ButtonRounded,
    sourcePath: "ui/components/button/rounded.tsx",
  },
  {
    id: "secondary",
    title: "Secondary",
    component: ButtonSecondary,
    sourcePath: "ui/components/button/secondary.tsx",
  },
  {
    id: "size",
    title: "Size",
    component: ButtonSize,
    sourcePath: "ui/components/button/size.tsx",
  },
  {
    id: "spinner",
    title: "Spinner",
    component: ButtonSpinner,
    sourcePath: "ui/components/button/spinner.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "aschild", title: "Aschild", depth: 3 },
  { id: "default", title: "Default", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "destructive", title: "Destructive", depth: 3 },
  { id: "ghost", title: "Ghost", depth: 3 },
  { id: "icon", title: "Icon", depth: 3 },
  { id: "link", title: "Link", depth: 3 },
  { id: "outline", title: "Outline", depth: 3 },
  { id: "premium", title: "Premium", depth: 3 },
  { id: "rounded", title: "Rounded", depth: 3 },
  { id: "secondary", title: "Secondary", depth: 3 },
  { id: "size", title: "Size", depth: 3 },
  { id: "spinner", title: "Spinner", depth: 3 },
  { id: "props", title: "Props" },
  { id: "best-practices", title: "Best Practices" },
]

export default function ButtonPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Button"
        description="Displays a button or a component that looks like a button."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add button" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Button } from "@/primitives/button"`}
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

      <DocsSection id="props" title="Props">
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="mb-2 font-semibold">Button</h4>
            <ul className="ml-4 space-y-2 text-muted-foreground">
              <li>
                <code className="rounded bg-muted px-2 py-1">variant</code>
                <span className="ml-2">
                  &quot;default&quot; | &quot;outline&quot; | &quot;secondary&quot; |
                  &quot;ghost&quot; | &quot;destructive&quot; | &quot;link&quot; |
                  &quot;premium&quot; (default: &quot;default&quot;)
                </span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">size</code>
                <span className="ml-2">
                  &quot;default&quot; | &quot;xs&quot; | &quot;sm&quot; | &quot;lg&quot; |
                  &quot;icon&quot; | &quot;icon-xs&quot; | &quot;icon-sm&quot; |
                  &quot;icon-lg&quot; (default: &quot;default&quot;)
                </span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">asChild</code>
                <span className="ml-2">boolean — render as child element via Slot</span>
              </li>
            </ul>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="best-practices" title="Best Practices">
        <DocsCallout title="Reserve premium for primary CTAs" variant="info">
          Use <code>variant=&quot;premium&quot;</code> sparingly for high-emphasis actions
          such as upgrades or trial starts. Overuse reduces visual hierarchy.
        </DocsCallout>
        <DocsCallout title="Pair with primary-foreground text" variant="info">
          The premium variant uses <code>text-primary-foreground</code> on an accent →
          primary gradient for WCAG AA contrast in both light and dark modes.
        </DocsCallout>
      </DocsSection>
    </DocsPage>
  )
}
