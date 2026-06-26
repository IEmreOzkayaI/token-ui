import { SaveIcon } from "lucide-react"

import { Button } from "@/primitives/button"
import { Kbd } from "@/primitives/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/primitives/tooltip"

export function TooltipKeyboard() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <SaveIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Save Changes <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
