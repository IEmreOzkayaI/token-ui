"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { CheckIcon, CopyIcon, PlusIcon, XIcon } from "lucide-react"

import { Button } from "@/primitives/button"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

export const PROMPT_COMPONENTS = [
  "Accordion", "Alert", "Alert Dialog", "Aspect Ratio", "Avatar", "Badge",
  "Breadcrumb", "Button", "Button Group", "Calendar", "Card", "Carousel",
  "Chart", "Checkbox", "Collapsible", "Combobox", "Command", "Context Menu",
  "Dialog", "Direction", "Drawer", "Dropdown Menu", "Empty", "Field",
  "Hover Card", "Input", "Input Group", "Input OTP", "Kbd", "Label",
  "Menubar", "Native Select", "Navigation Menu", "Pagination", "Popover",
  "Progress", "Radio Group", "Range Slider", "Scroll Area", "Select",
  "Separator", "Sheet", "Skeleton", "Slider", "Sonner", "Spinner",
  "Switch", "Table", "Tabs", "Textarea", "Tooltip", "Tree",
]

export const COMMON_VARIANTS = ["demo", "custom", "advanced", "compact", "minimal"]

export function useCopy() {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  const copy = async (text: string) => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setFailed(false)
      setTimeout(() => setCopied(false), 2000)
      return
    }

    setFailed(true)
    setCopied(false)
    setTimeout(() => setFailed(false), 3000)
  }

  return { copied, failed, copy }
}

export function Field({
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

export function ComboboxField({
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
    return options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, options])

  const handleSelect = (opt: string) => {
    onChange(opt)
    setQuery(opt)
    setOpen(false)
  }

  return (
    <div className="relative space-y-1.5">
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
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className="flex h-9 w-full rounded-sm border bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground/20 focus:ring-1 focus:ring-ring"
        />
        {open && filtered.length > 0 && (
          <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-40 overflow-y-auto rounded-sm border bg-background shadow-md">
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(opt)}
                className="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
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

export function ListField({
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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const pendingFocusIndex = useRef<number | null>(null)

  useEffect(() => {
    if (pendingFocusIndex.current === null) return
    inputRefs.current[pendingFocusIndex.current]?.focus()
    pendingFocusIndex.current = null
  }, [items.length])

  const update = (i: number, v: string) => {
    const next = [...items]
    next[i] = v
    setItems(next)
  }

  const remove = (i: number) => {
    if (items.length <= 1) return
    setItems(items.filter((_, idx) => idx !== i))
  }

  const addItem = () => {
    pendingFocusIndex.current = items.length
    setItems([...items, ""])
  }

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="group flex items-center gap-2">
            <input
              ref={(el) => {
                inputRefs.current[i] = el
              }}
              type="text"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addItem()
                }
              }}
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
        onClick={addItem}
      >
        <PlusIcon className="size-3" />
        Add
      </Button>
    </div>
  )
}

export function PromptOutput({
  prompt,
  disabled,
}: {
  prompt: string
  disabled?: boolean
}) {
  const { copied, failed, copy } = useCopy()

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Output</label>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={() => copy(prompt)}
          disabled={disabled}
        >
          {copied ? (
            <>
              <CheckIcon className="size-3 text-emerald-500" />
              Copied
            </>
          ) : failed ? (
            <>Copy failed</>
          ) : (
            <>
              <CopyIcon className="size-3" />
              Copy prompt
            </>
          )}
        </Button>
      </div>
      <pre
        className={`overflow-x-auto rounded-sm border p-4 text-[13px] leading-relaxed ${
          disabled
            ? "bg-muted/30 text-muted-foreground/50"
            : "bg-muted/50"
        }`}
      >
        {prompt}
      </pre>
    </div>
  )
}
