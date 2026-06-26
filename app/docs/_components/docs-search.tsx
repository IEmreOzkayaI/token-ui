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
import { cn } from "@/lib/utils"

const searchItems = getSearchItems()

export function DocsSearch() {
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

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "hidden h-8 w-44 justify-start gap-2 px-2.5 text-muted-foreground lg:flex xl:w-52"
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="size-3.5 shrink-0 opacity-50" />
        <span className="truncate text-sm">Search documentation...</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium xl:flex">
          <span>⌘</span>K
        </kbd>
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
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
