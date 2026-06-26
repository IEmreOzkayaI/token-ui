import { Button } from "@/primitives/button"
import { ButtonGroup } from "@/primitives/button-group"
import { Field, FieldLabel } from "@/primitives/field"
import { Input } from "@/primitives/input"

export default function InputButtonGroup() {
  return (
    <Field>
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup>
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  )
}
