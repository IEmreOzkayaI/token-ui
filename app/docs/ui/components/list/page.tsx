import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { readSource } from "@/app/docs/_lib/read-source"
import CreditCardList from "@/ui/components/List/creditCard"

const examples = [
  {
    id: "credit-card",
    title: "Credit Card",
    description: "List of credit cards with anonymized display, reveal toggle, and flip animation.",
    component: CreditCardList,
    sourcePath: "ui/components/List/creditCard.tsx",
  },
] as const

const toc = [
  { id: "overview", title: "Overview" },
  { id: "features", title: "Features" },
  { id: "examples", title: "Examples" },
  ...examples.map((ex) => ({ id: ex.id, title: ex.title, depth: 3 })),
]

export default function ListPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="List"
        description="Customizable list components for displaying structured data."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          List components provide flexible layouts for displaying collections of items. Support for
          expandable content, state management, and rich interactions.
        </p>
      </DocsSection>

      <DocsSection id="features" title="Features">
        <ul className="space-y-2 text-sm text-muted-foreground ml-4">
          <li>• Expandable/collapsible items</li>
          <li>• Anonymized data display with reveal toggle</li>
          <li>• 3D card flip animation</li>
          <li>• Network-specific styling (Visa, Mastercard, Amex)</li>
          <li>• Delete actions with confirmation</li>
          <li>• Keyboard navigation (Enter, Space)</li>
          <li>• Full accessibility support (ARIA labels)</li>
          <li>• Responsive design</li>
        </ul>
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <DocsSection key={example.id} id={example.id} title={example.title}>
                <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
                <ComponentExample source={readSource(example.sourcePath)}>
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
            <h4 className="font-semibold mb-2">CreditCardListProps</h4>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li>
                <code className="bg-muted px-2 py-1 rounded">cards</code>
                <span className="ml-2">CreditCardData[] (default: mock data)</span>
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">onDelete</code>
                <span className="ml-2">(id: string) =&gt; void (optional)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">CreditCardData</h4>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li>
                <code className="bg-muted px-2 py-1 rounded">id</code>
                <span className="ml-2">string</span>
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">cardNumber</code>
                <span className="ml-2">string (16 digits)</span>
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">cardholderName</code>
                <span className="ml-2">string</span>
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">expiryDate</code>
                <span className="ml-2">string (MM/YY)</span>
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">cvv</code>
                <span className="ml-2">string (3-4 digits)</span>
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">network</code>
                <span className="ml-2">"visa" | "mastercard" | "amex"</span>
              </li>
            </ul>
          </div>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
