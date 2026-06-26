import { SearchIcon } from "lucide-react"

import { Button } from "@/primitives/button"
import { ButtonGroup } from "@/primitives/button-group"
import { Input } from "@/primitives/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
