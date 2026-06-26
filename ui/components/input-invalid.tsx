import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/primitives/field"
import { Input } from "@/primitives/input"

export default function InputInvalid() {
  return (
    <Field data-invalid>
      <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
      <Input id="input-invalid" placeholder="Error" aria-invalid />
      <FieldDescription>
        This field contains validation errors.
      </FieldDescription>
    </Field>
  )
}
