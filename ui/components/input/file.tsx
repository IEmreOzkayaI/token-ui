import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/primitives/field"
import { Input } from "@/primitives/input"

export default function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}
