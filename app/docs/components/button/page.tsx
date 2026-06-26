"use client"

import { Card } from "@/primitives/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

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
        className="absolute top-2 right-2 p-2 rounded-lg hover:bg-muted transition-colors z-10"
      >
        {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
      </button>
      <Card className="p-4 bg-slate-950 text-slate-50">
        <pre className="text-sm overflow-x-auto font-mono pr-12"><code>{children}</code></pre>
      </Card>
    </div>
  )
}

export default function ComponentPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Component Examples</h1>
        <p className="text-lg text-muted-foreground">
          Composable examples combining primitives.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Examples</h2>
        <Tabs defaultValue="code">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card className="p-8 min-h-40 text-center text-muted-foreground">
              Examples coming soon
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock>{`// Component example\n// Coming soon`}</CodeBlock>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
