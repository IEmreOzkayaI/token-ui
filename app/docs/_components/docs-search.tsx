"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { getSearchItems } from "@/app/docs/_lib/nav"
import { Button } from "@/primitives/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/primitives/command"

const searchItems = getSearchItems()

type DocsSearchProps = {
  variant?: "default" | "compact"
}

export function DocsSearch({ variant = "default" }: DocsSearchProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const navigate = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  const groups = searchItems.reduce<
    Record<string, typeof searchItems>
  >((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = []
    }
    acc[item.section].push(item)
    return acc
  }, {})

  const isCompact = variant === "compact"

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          isCompact
            ? "hidden h-8 items-center gap-2 rounded-md border border-[#e4e4e0] bg-[#f5f5f3] px-2.5 text-[#888884] transition-colors hover:bg-[#efefed] md:flex"
            : "hidden h-8 w-80 items-center gap-2 rounded-sm border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/60 md:flex"
        }
      >
        <Search className="size-3.5 shrink-0 opacity-60" />
        {!isCompact ? (
          <span className="flex-1 text-left">Search documentation...</span>
        ) : null}
        <kbd className="pointer-events-none hidden select-none items-center gap-0.5 rounded border border-[#e4e4e0] bg-white px-1 font-mono text-[10px] font-medium lg:flex">
          <span>⌘</span>K
        </kbd>
      </button>

      <Button
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        aria-label="Search documentation"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search for a page in the Token UI docs"
      >
        <Command>
          <CommandInput placeholder="Search documentation..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(groups).map(([section, items]) => (
              <CommandGroup key={section} heading={section}>
                {items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${section} ${item.label}`}
                    onSelect={() => navigate(item.href)}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
