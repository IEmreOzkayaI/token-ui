"use client"

import { Button } from "@/components/primitives/button"
import { Card } from "@/components/primitives/card"
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
        className="absolute top-2 right-2 p-2 rounded-lg hover:bg-muted transition-colors"
        title="Copy code"
      >
        {copied ? (
          <Check className="size-4 text-green-600" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <Card className="p-4">
        <pre className="text-sm overflow-x-auto font-mono pr-12">
          {children}
        </pre>
      </Card>
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-8 border-dashed flex items-center justify-center min-h-32">
      <div className="flex flex-wrap gap-4 items-center justify-center w-full">
        {children}
      </div>
    </Card>
  )
}

export default function ButtonPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Button</h1>
        <p className="text-lg text-muted-foreground">
          Interactive element for actions, form submission, and navigation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import { Button } from "@/components/primitives/button"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <Preview>
            <Button>Click me</Button>
          </Preview>
          <CodeBlock>{`<Button>Click me</Button>`}</CodeBlock>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Variants</h2>
        <Preview>
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </Preview>
        <CodeBlock>{`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <Preview>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">+</Button>
        </Preview>
        <CodeBlock>{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">+</Button>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">States</h2>
        <Preview>
          <Button disabled>Disabled</Button>
        </Preview>
        <CodeBlock>{`<Button disabled>Disabled</Button>`}</CodeBlock>
      </section>
    </div>
  )
}
