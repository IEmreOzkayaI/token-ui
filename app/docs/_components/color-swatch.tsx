import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type ColorSwatchProps = {
  token: string
  tailwindClass: string
  description: string
  light: string
  dark: string
}

function getSwatchStyle(
  token: string,
  isBorderToken: boolean,
  isRingToken: boolean
): CSSProperties | undefined {
  if (isBorderToken) {
    return { borderBottomColor: `var(--${token})` }
  }
  if (isRingToken) {
    return { boxShadow: `0 0 0 3px var(--${token})` }
  }
  return undefined
}

export function ColorSwatch({
  token,
  tailwindClass,
  description,
  light,
  dark,
}: ColorSwatchProps) {
  const isTextToken = tailwindClass.startsWith("text-")
  const isBorderColorToken = tailwindClass === "border-border"
  const isBorderToken =
    tailwindClass.startsWith("border-") && !isBorderColorToken
  const isRingToken = tailwindClass.startsWith("ring-")

  return (
    <div className="overflow-hidden rounded-xl border">
      <div
        className={cn(
          "flex h-20 items-end p-4",
          isTextToken && "bg-background",
          isBorderColorToken && "border-4 border-border bg-background",
          isBorderToken && "border-b-4 bg-muted/30",
          isRingToken && "bg-background",
          !isTextToken &&
            !isBorderToken &&
            !isBorderColorToken &&
            !isRingToken &&
            tailwindClass
        )}
        style={getSwatchStyle(token, isBorderToken, isRingToken)}
      >
        {isTextToken && (
          <span className={cn("text-lg font-medium", tailwindClass)}>Aa</span>
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <code className="font-mono text-sm font-medium">{token}</code>
          <code className="font-mono text-xs text-muted-foreground">
            {tailwindClass}
          </code>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="grid gap-1 font-mono text-xs text-muted-foreground sm:grid-cols-2">
          <span>Light: {light}</span>
          <span>Dark: {dark}</span>
        </div>
      </div>
    </div>
  )
}
