import { cn } from "@/lib/utils"

type ColorSwatchProps = {
  token: string
  tailwindClass: string
  description: string
  light: string
  dark: string
}

export function ColorSwatch({
  token,
  tailwindClass,
  description,
  light,
  dark,
}: ColorSwatchProps) {
  const isTextToken = tailwindClass.startsWith("text-")
  const isBorderToken = tailwindClass.startsWith("border-") && !tailwindClass.includes("border-border")
  const isRingToken = tailwindClass.startsWith("ring-")

  return (
    <div className="overflow-hidden rounded-xl border">
      <div
        className={cn(
          "flex h-20 items-end p-4",
          isTextToken && "bg-background",
          isBorderToken && "border-b-4 bg-muted/30",
          isRingToken && "bg-background",
          !isTextToken &&
            !isBorderToken &&
            !isRingToken &&
            tailwindClass
        )}
        style={
          isBorderToken
            ? { borderBottomColor: `var(--${token})` }
            : isRingToken
              ? ({
                  boxShadow: `0 0 0 3px var(--${token})`,
                } as React.CSSProperties)
              : undefined
        }
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
