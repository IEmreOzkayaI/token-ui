import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type DocsLogoProps = {
  showLabel?: boolean
  className?: string
  href?: string
}

export function DocsLogo({ showLabel = true, className, href = "/" }: DocsLogoProps) {
  const content = (
    <>
      <Image
        src="/token-logo.jpeg"
        alt="Token UI"
        width={28}
        height={28}
        className="size-7 rounded-sm"
        priority
      />
      {showLabel ? (
        <span className="text-sm font-bold tracking-tight text-foreground">Token UI</span>
      ) : null}
    </>
  )

  if (!href) {
    return <div className={cn("flex items-center gap-2.5", className)}>{content}</div>
  }

  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Token UI home"
    >
      {content}
    </Link>
  )
}
