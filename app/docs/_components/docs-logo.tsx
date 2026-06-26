import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type DocsLogoProps = {
  showLabel?: boolean
  className?: string
}

export function DocsLogo({ showLabel = true, className }: DocsLogoProps) {
  return (
    <Link
      href="/docs"
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Token UI home"
    >
      <Image
        src="/token-logo.jpeg"
        alt=""
        width={28}
        height={28}
        className="size-7 rounded-md"
        priority
      />
      {showLabel && (
        <span className="hidden font-semibold sm:inline">Token UI</span>
      )}
    </Link>
  )
}
