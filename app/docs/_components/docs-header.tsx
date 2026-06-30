"use client"

import { Menu, X } from "lucide-react"

import { DocsLogo } from "@/app/docs/_components/docs-logo"
import { DocsSearch } from "@/app/docs/_components/docs-search"
import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Button } from "@/primitives/button"

type DocsHeaderProps = {
  mobileOpen: boolean
  onToggleMobile: () => void
}

function GitHubLink() {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="text-muted-foreground"
      asChild
    >
      <a
        href="https://github.com/IEmreOzkayaI/token-ui"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <svg viewBox="0 0 15 15" className="size-4" fill="currentColor">
          <path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67687 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.70375 11.6731C5.76641 11.205 5.95564 10.8859 6.16758 10.7049C4.6553 10.516 3.067 9.95208 3.067 7.84463C3.067 7.04375 3.35523 6.38748 3.81179 5.87074C3.73517 5.68811 3.46241 4.9299 3.8721 3.99146C3.8721 3.99146 4.48329 3.76111 5.6861 4.63477C6.29008 4.44587 6.94491 4.35142 7.49933 4.35142C8.05376 4.35142 8.70859 4.44587 9.31256 4.63477C10.5154 3.76111 11.1266 3.99146 11.1266 3.99146C11.5362 4.9299 11.2635 5.68811 11.1877 5.87074C11.6443 6.38748 11.9325 7.04375 11.9325 7.84463C11.9325 9.95808 10.341 10.516 8.82511 10.7022C9.08599 10.9338 9.31856 11.3866 9.31856 12.0634C9.31856 13.0459 9.30956 13.8411 9.30956 14.0299C9.30956 14.2239 9.43976 14.4496 9.80584 14.3788C12.6856 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" />
        </svg>
      </a>
    </Button>
  )
}

export function DocsHeader({ mobileOpen, onToggleMobile }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl flex h-14 items-center gap-4 px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden text-muted-foreground hover:text-foreground"
          onClick={onToggleMobile}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>

        <DocsLogo />

        <div className="flex flex-1 justify-center px-8 lg:px-12">
          <DocsSearch />
        </div>

        <div className="flex items-center gap-1">
          <GitHubLink />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
