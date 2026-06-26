"use client"

import { Copy, Check, AlertCircle, XCircle, InfoIcon } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/primitives/card"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/primitives/alert"
import { Button } from "@/components/primitives/button"

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
    <Card className="p-6 border-dashed space-y-4">
      {children}
    </Card>
  )
}

export default function AlertPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Alert</h1>
        <p className="text-lg text-muted-foreground">
          Displays callout for user attention.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/components/primitives/alert"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <Preview>
          <Alert>
            <AlertCircle className="size-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your project using the CLI.
            </AlertDescription>
          </Alert>
        </Preview>
        <CodeBlock>{`<Alert>
  <AlertCircle className="size-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your project using the CLI.
  </AlertDescription>
</Alert>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Default</h3>
            <Preview>
              <Alert>
                <InfoIcon className="size-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert message.
                </AlertDescription>
              </Alert>
            </Preview>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Destructive</h3>
            <Preview>
              <Alert variant="destructive">
                <XCircle className="size-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  An error occurred while processing your request.
                </AlertDescription>
              </Alert>
            </Preview>
          </div>

          <div>
            <h3 className="font-semibold mb-3">With Action</h3>
            <Preview>
              <Alert>
                <AlertCircle className="size-4" />
                <AlertTitle>Update Available</AlertTitle>
                <AlertDescription>
                  New version available. Update now to get latest features.
                </AlertDescription>
                <AlertAction>
                  <Button size="sm" variant="outline">Update</Button>
                </AlertAction>
              </Alert>
            </Preview>
            <CodeBlock>{`<Alert>
  <AlertCircle className="size-4" />
  <AlertTitle>Update Available</AlertTitle>
  <AlertDescription>
    New version available.
  </AlertDescription>
  <AlertAction>
    <Button size="sm" variant="outline">Update</Button>
  </AlertAction>
</Alert>`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Composition</h2>
        <Card className="p-4">
          <pre className="text-sm font-mono">{`Alert
├── Icon (optional)
├── AlertTitle
├── AlertDescription
└── AlertAction (optional)`}</pre>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">API Reference</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Alert</h3>
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
                    <td className="py-2 px-3 text-xs">default | destructive</td>
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
          </div>

          <div>
            <h3 className="font-semibold mb-3">AlertTitle</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium">Prop</th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">className</td>
                    <td className="py-2 px-3 text-xs">string</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">AlertDescription</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium">Prop</th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">className</td>
                    <td className="py-2 px-3 text-xs">string</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">AlertAction</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium">Prop</th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                    <th className="text-left py-2 px-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">className</td>
                    <td className="py-2 px-3 text-xs">string</td>
                    <td className="py-2 px-3 text-xs">Positioned top-right by default</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}