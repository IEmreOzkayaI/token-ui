"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card } from "@/primitives/card"
import {  } from "@/primitives/collapsible"

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
    <Card className="p-6 border-dashed flex items-center justify-center min-h-28">
      <div className="w-full">{children}</div>
    </Card>
  )
}

export default function CollapsiblePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Collapsible</h1>
        <p className="text-lg text-muted-foreground">
          Displays collapsible content
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/primitives/collapsible"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <CodeBlock>{`<Collapsible>
  <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content here
  </CollapsibleContent>
</Collapsible>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Examples</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Basic</h3>
            <CodeBlock>{`<Collapsible>
  <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
  <CollapsibleContent>
    This content is hidden by default
  </CollapsibleContent>
</Collapsible>`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">API Reference</h2>
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
                <td className="py-2 px-3 font-mono text-xs">open</td>
                <td className="py-2 px-3 text-xs">boolean</td>
                <td className="py-2 px-3 text-xs">false</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-3 font-mono text-xs">defaultOpen</td>
                <td className="py-2 px-3 text-xs">boolean</td>
                <td className="py-2 px-3 text-xs">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}