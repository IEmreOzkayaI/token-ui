"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/primitives/card"
import { Button } from "@/components/primitives/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/primitives/dialog"

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
      {children}
    </Card>
  )
}

export default function DialogPage() {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Dialog</h1>
        <p className="text-lg text-muted-foreground">
          Modal dialog component for user interactions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/primitives/dialog"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <Preview>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  Dialog description goes here.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>Dialog content</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Preview>
        <CodeBlock>{`<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">Content</div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Composition</h2>
        <Card className="p-4">
          <pre className="text-sm font-mono">{`Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription
    ├── (content)
    └── DialogFooter`}</pre>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Basic</h3>
            <Preview>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogDescription>
                      Are you sure?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Preview>
          </div>

          <div>
            <h3 className="font-semibold mb-3">With Form</h3>
            <Preview>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your profile information
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <input type="text" placeholder="Name" className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
                    <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Preview>
            <CodeBlock>{`<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Update info</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
    </div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Controlled</h3>
            <p className="text-sm text-muted-foreground mb-3">Using state to control open/close</p>
            <Preview>
              <Dialog open={open2} onOpenChange={setOpen2}>
                <DialogTrigger asChild>
                  <Button>Controlled Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Controlled State</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm">State managed via useState hook</p>
                  <DialogFooter>
                    <Button onClick={() => setOpen2(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Preview>
            <CodeBlock>{`const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled Dialog</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>
        Close
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">API Reference</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Dialog</h3>
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
                    <td className="py-2 px-3 text-xs">-</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-xs">onOpenChange</td>
                    <td className="py-2 px-3 text-xs">(open: boolean) =&gt; void</td>
                    <td className="py-2 px-3 text-xs">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">DialogContent</h3>
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
            <h3 className="font-semibold mb-3">Other Components</h3>
            <p className="text-sm text-muted-foreground">
              DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose accept standard HTML props.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
