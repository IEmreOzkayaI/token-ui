import { Button } from "@/primitives/button"
import { Field } from "@/primitives/field"
import { Input } from "@/primitives/input"

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  )
}
