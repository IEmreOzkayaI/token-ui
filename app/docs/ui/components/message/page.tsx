import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import MessageDefault from "@/ui/components/Message/default"

const examples = [
  {
    id: "balloon",
    title: "Balloon",
    description: "Compact chat bubble in bottom-right corner.",
    component: () => <MessageDefault variant="balloon" isDemo />,
    sourcePath: "ui/components/message/default.tsx",
  },
  {
    id: "fullscreen",
    title: "Fullscreen",
    description: "Full-screen modal chat interface.",
    component: () => <MessageDefault variant="fullscreen" isDemo />,
    sourcePath: "ui/components/message/default.tsx",
  },
] as const

const toc = [
  { id: "overview", title: "Overview" },
  { id: "features", title: "Features" },
  { id: "examples", title: "Examples" },
  ...examples.map((ex) => ({ id: ex.id, title: ex.title, depth: 3 })),
]

export default function MessagePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Message"
        description="Interactive text-based chat component with image upload support."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Message component provides a conversational interface with FAB trigger, full chat history, real-time typing indicators, and error handling. Supports both compact (balloon) and fullscreen layouts.
        </p>
      </DocsSection>

      <DocsSection id="features" title="Features">
        <ul className="space-y-2 text-sm text-muted-foreground ml-4">
          <li>• FAB (Floating Action Button) trigger</li>
          <li>• Two layout variants: balloon & fullscreen</li>
          <li>• Image upload with preview in messages</li>
          <li>• Loading states with spinner</li>
          <li>• Error handling with retry capability</li>
          <li>• Smooth animations (fade-in, slide-in)</li>
          <li>• Keyboard shortcuts (Enter send, Escape close)</li>
          <li>• Timestamp on each message</li>
          <li>• Responsive and accessible (ARIA labels)</li>
        </ul>
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <DocsSection key={example.id} id={example.id} title={example.title}>
                <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
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

      <DocsSection title="Props" id="props">
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">MessageDefaultProps</h4>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li>
                <code className="bg-muted px-2 py-1 rounded">variant</code>
                <span className="ml-2">
                  "balloon" | "fullscreen" (default: "balloon")
                </span>
              </li>
            </ul>
          </div>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
