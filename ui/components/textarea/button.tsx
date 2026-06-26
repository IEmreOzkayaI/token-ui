import { Button } from "@/primitives/button"
import { Textarea } from "@/primitives/textarea"

export default function TextareaButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}
