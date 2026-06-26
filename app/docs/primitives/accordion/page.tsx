"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/primitives/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/accordion"

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => {
          navigator.clipboard.writeText(children)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="absolute top-2 right-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
      </button>
      <Card className="p-4">
        <pre className="text-sm overflow-x-auto font-mono pr-12">{children}</pre>
      </Card>
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-6 border-dashed max-w-xl">
      {children}
    </Card>
  )
}

export default function AccordionPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Accordion</h1>
        <p className="text-lg text-muted-foreground">
          Vertically stacked set of interactive headings revealing sections of content.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/accordion"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <Preview>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to WAI-ARIA design patterns.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Preview>
        <CodeBlock>{`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to WAI-ARIA design patterns.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Composition</h2>
        <Card className="p-4">
          <pre className="text-sm font-mono">{`Accordion
├── AccordionItem
│   ├── AccordionTrigger
│   └── AccordionContent
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionContent`}</pre>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Basic</h3>
            <p className="text-sm text-muted-foreground mb-3">Single item open at a time (first open by default)</p>
            <Preview>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>Yes. WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>Yes. With Tailwind CSS.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>Yes. Smooth expand/collapse.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </Preview>
            <CodeBlock>{`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. With Tailwind CSS.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>Yes. Smooth expand/collapse.</AccordionContent>
  </AccordionItem>
</Accordion>`}</CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Multiple</h3>
            <p className="text-sm text-muted-foreground mb-3">Multiple items open simultaneously</p>
            <Preview>
              <Accordion type="multiple">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Feature A</AccordionTrigger>
                  <AccordionContent>Multiple items can be open.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Feature B</AccordionTrigger>
                  <AccordionContent>Expand any combination.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Feature C</AccordionTrigger>
                  <AccordionContent>No auto-collapse needed.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </Preview>
            <CodeBlock>{`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>Feature A</AccordionTrigger>
    <AccordionContent>Content A</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Feature B</AccordionTrigger>
    <AccordionContent>Content B</AccordionContent>
  </AccordionItem>
</Accordion>`}</CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Disabled Item</h3>
            <p className="text-sm text-muted-foreground mb-3">Individual items can be disabled</p>
            <Preview>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Enabled</AccordionTrigger>
                  <AccordionContent>This item works normally.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" disabled>
                  <AccordionTrigger>Disabled</AccordionTrigger>
                  <AccordionContent>This item is disabled.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </Preview>
            <CodeBlock>{`<Accordion type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>Enabled</AccordionTrigger>
    <AccordionContent>Works normally</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Disabled</AccordionTrigger>
    <AccordionContent>Cannot open</AccordionContent>
  </AccordionItem>
</Accordion>`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">API Reference</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Accordion</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium">Prop</th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                    <th className="text-left py-2 px-3 font-medium">Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-mono text-xs">type</td>
                    <td className="py-2 px-3 text-xs">single | multiple</td>
                    <td className="py-2 px-3 text-xs">-</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-mono text-xs">collapsible</td>
                    <td className="py-2 px-3 text-xs">boolean</td>
                    <td className="py-2 px-3 text-xs">false</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">defaultValue</td>
                    <td className="py-2 px-3 text-xs">string | string[]</td>
                    <td className="py-2 px-3 text-xs">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">AccordionItem</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium">Prop</th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-mono text-xs">value</td>
                    <td className="py-2 px-3 text-xs">string (required)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">disabled</td>
                    <td className="py-2 px-3 text-xs">boolean</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">AccordionTrigger & AccordionContent</h3>
            <p className="text-sm text-muted-foreground">
              Accept standard HTML element props (className, etc.)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}