"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card } from "@/primitives/card"
import { Badge } from "@/primitives/badge"

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
    <Card className="p-6 border-dashed flex items-center justify-center min-h-24">
      <div className="flex flex-wrap gap-2">{children}</div>
    </Card>
  )
}

export default function BadgePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Badge</h1>
        <p className="text-lg text-muted-foreground">
          Displays small labels and badges.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import { Badge } from "@/primitives/badge"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <Preview>
          <Badge>Badge</Badge>
        </Preview>
        <CodeBlock>{`<Badge>Badge</Badge>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Default</h3>
            <Preview>
              <Badge>Default</Badge>
            </Preview>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Secondary</h3>
            <Preview>
              <Badge variant="secondary">Secondary</Badge>
            </Preview>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Outline</h3>
            <Preview>
              <Badge variant="outline">Outline</Badge>
            </Preview>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Destructive</h3>
            <Preview>
              <Badge variant="destructive">Destructive</Badge>
            </Preview>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Multiple</h3>
            <Preview>
              <Badge>New</Badge>
              <Badge variant="secondary">Feature</Badge>
              <Badge variant="outline">Beta</Badge>
            </Preview>
            <CodeBlock>{`<Badge>New</Badge>
<Badge variant="secondary">Feature</Badge>
<Badge variant="outline">Beta</Badge>`}</CodeBlock>
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
                <td className="py-2 px-3 font-mono text-xs">variant</td>
                <td className="py-2 px-3 text-xs">default | secondary | outline | destructive</td>
                <td className="py-2 px-3 text-xs">default</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">className</td>
                <td className="py-2 px-3 text-xs">string</td>
                <td className="py-2 px-3 text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}