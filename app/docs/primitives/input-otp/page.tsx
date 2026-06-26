import { ComponentExample } from "@/app/docs/_components/component-example"
import { readSource } from "@/app/docs/_lib/read-source"
import InputOTPAlphanumeric from "@/ui/components/input-otp-alphanumeric"
import InputOTPControlled from "@/ui/components/input-otp-controlled"
import InputOTPDemo from "@/ui/components/input-otp-demo"
import InputOTPDisabled from "@/ui/components/input-otp-disabled"
import InputOTPForm from "@/ui/components/input-otp-form"
import InputOTPFourDigits from "@/ui/components/input-otp-four-digits"
import InputOTPInvalid from "@/ui/components/input-otp-invalid"
import InputOTPPattern from "@/ui/components/input-otp-pattern"
import InputOTPWithSeparator from "@/ui/components/input-otp-separator"

const examples = [
  {
    title: "InputOtp Alphanumeric",
    component: InputOTPAlphanumeric,
    sourcePath: "ui/components/input-otp-alphanumeric.tsx",
  },
  {
    title: "InputOtp Controlled",
    component: InputOTPControlled,
    sourcePath: "ui/components/input-otp-controlled.tsx",
  },
  {
    title: "InputOtp Demo",
    component: InputOTPDemo,
    sourcePath: "ui/components/input-otp-demo.tsx",
  },
  {
    title: "InputOtp Disabled",
    component: InputOTPDisabled,
    sourcePath: "ui/components/input-otp-disabled.tsx",
  },
  {
    title: "InputOtp Form",
    component: InputOTPForm,
    sourcePath: "ui/components/input-otp-form.tsx",
  },
  {
    title: "InputOtp Four Digits",
    component: InputOTPFourDigits,
    sourcePath: "ui/components/input-otp-four-digits.tsx",
  },
  {
    title: "InputOtp Invalid",
    component: InputOTPInvalid,
    sourcePath: "ui/components/input-otp-invalid.tsx",
  },
  {
    title: "InputOtp Pattern",
    component: InputOTPPattern,
    sourcePath: "ui/components/input-otp-pattern.tsx",
  },
  {
    title: "InputOtp Separator",
    component: InputOTPWithSeparator,
    sourcePath: "ui/components/input-otp-separator.tsx",
  },
] as const

export default function InputOtpPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed top-20 right-0 hidden h-screen w-64 overflow-y-auto border-l bg-background/50 p-6 lg:block">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          On This Page
        </h3>
      </div>

      <div className="max-w-2xl flex-1 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">InputOtp</h1>
        <p className="text-lg text-muted-foreground">
          InputOtp component — {examples.length} examples rendered live with source code
        </p>

        <div className="flex flex-col gap-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <ComponentExample
                key={example.sourcePath}
                title={example.title}
                source={readSource(example.sourcePath)}
              >
                <Component />
              </ComponentExample>
            )
          })}
        </div>
      </div>
    </div>
  )
}
