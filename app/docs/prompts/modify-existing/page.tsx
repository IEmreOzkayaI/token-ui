"use client"

import { useState, useMemo } from "react"
import { CheckIcon, CopyIcon, PlusIcon, XIcon } from "lucide-react"
import { Button } from "@/primitives/button"

const COMPONENTS = [
  "Accordion", "Alert", "Alert Dialog", "Aspect Ratio", "Avatar", "Badge",
  "Breadcrumb", "Button", "Button Group", "Calendar", "Card", "Carousel",
  "Chart", "Checkbox", "Collapsible", "Combobox", "Command", "Context Menu",
  "Dialog", "Direction", "Drawer", "Dropdown Menu", "Empty", "Field",
  "Hover Card", "Input", "Input Group", "Input OTP", "Kbd", "Label",
  "Menubar", "Native Select", "Navigation Menu", "Pagination", "Popover",
  "Progress", "Radio Group", "Range Slider", "Scroll Area", "Select",
  "Separator", "Sheet", "Skeleton", "Slider", "Sonner", "Spinner",
  "Switch", "Table", "Tabs", "Textarea", "Tooltip", "Tree"
]

const COMMON_VARIANTS = ["demo", "custom", "advanced", "compact", "minimal"]

function useCopy() {
  const [copied, setCopied] = useState(false)
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return { copied, copy }
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex h-9 w-full rounded-sm border bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground/20 focus:ring-1 focus:ring-ring"
      />
    </div>
  )
}

function ComboboxField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value)

  const filtered = useMemo(() => {
    if (!query) return options
    return options.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()))
  }, [query, options])

  const handleSelect = (opt: string) => {
    onChange(opt)
    setQuery(opt)
    setOpen(false)
  }

  return (
    <div className="space-y-1.5 relative">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="flex h-9 w-full rounded-sm border bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground/20 focus:ring-1 focus:ring-ring"
        />
        {open && filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-sm border bg-background shadow-md z-50 max-h-40 overflow-y-auto">
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ListField({
  label,
  items,
  setItems,
  placeholder,
}: {
  label: string
  items: string[]
  setItems: (v: string[]) => void
  placeholder: string
}) {
  const update = (i: number, v: string) => {
    const next = [...items]
    next[i] = v
    setItems(next)
  }
  const remove = (i: number) => {
    if (items.length <= 1) return
    setItems(items.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="group flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex h-9 w-full rounded-sm border bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground/20 focus:ring-1 focus:ring-ring"
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="shrink-0 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 gap-1 text-xs text-muted-foreground"
        onClick={() => setItems([...items, ""])}
      >
        <PlusIcon className="size-3" />
        Add
      </Button>
    </div>
  )
}

function PromptOutput({ prompt }: { prompt: string }) {
  const { copied, copy } = useCopy()

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Output</label>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={() => copy(prompt)}
        >
          {copied ? (
            <>
              <CheckIcon className="size-3 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="size-3" />
              Copy prompt
            </>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-sm border bg-muted/50 p-4 text-[13px] leading-relaxed">
        {prompt}
      </pre>
    </div>
  )
}

export default function ModifyExistingPage() {
  const [component, setComponent] = useState("")
  const [variant, setVariant] = useState("")
  const [changes, setChanges] = useState([""])

  const list = changes.filter(Boolean).map((c) => `* ${c}`).join("\n") || "* {değişiklik_1}\n* {değişiklik_2}"
  const comp = component || "{bileşen}"
  const v = variant || "demo"
  const path = `ui/components/${comp}/${v}.tsx`
  const variantOptions = component ? COMMON_VARIANTS : []

  const prompt = `Token UI design system projesinde çalışıyorum.
GitHub: https://github.com/IEmreOzkayaI/token-ui

## Görev
**Bileşen:** ${comp}
**Dosya:** \`${path}\`

Mevcut dosyayı güncelle:

${list}

## Kurallar
1. Mevcut yapıyı ve styling'i koru
2. \`globals.css\` token'larını kullan
3. Gereksiz state ekleme
4. Primitive API'sine (\`ui/primitives/\`) dokunma

Dosyayı yerinde güncelle, preview göster.`

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modify existing</h1>
        <p className="mt-1 text-muted-foreground">
          Enhance an existing component with new features.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <ComboboxField
            label="Component"
            value={component}
            onChange={setComponent}
            options={COMPONENTS}
            placeholder="Select or type..."
          />
          <ComboboxField
            label="Variant"
            value={variant}
            onChange={setVariant}
            options={variantOptions}
            placeholder={component ? "Select or type..." : "Choose component first"}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          File: <code>{path}</code>
        </div>
        <ListField label="Changes" items={changes} setItems={setChanges} placeholder="Add loading state" />
        <PromptOutput prompt={prompt} />
      </div>
    </div>
  )
}
