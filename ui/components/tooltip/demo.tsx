import { Button } from "@/primitives/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/primitives/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}
