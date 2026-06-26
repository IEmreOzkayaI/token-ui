import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
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
    id: "alphanumeric",
    title: "Alphanumeric",
    component: InputOTPAlphanumeric,
    sourcePath: "ui/components/input-otp-alphanumeric.tsx",
  },
  {
    id: "controlled",
    title: "Controlled",
    component: InputOTPControlled,
    sourcePath: "ui/components/input-otp-controlled.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: InputOTPDemo,
    sourcePath: "ui/components/input-otp-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: InputOTPDisabled,
    sourcePath: "ui/components/input-otp-disabled.tsx",
  },
  {
    id: "form",
    title: "Form",
    component: InputOTPForm,
    sourcePath: "ui/components/input-otp-form.tsx",
  },
  {
    id: "four-digits",
    title: "Four Digits",
    component: InputOTPFourDigits,
    sourcePath: "ui/components/input-otp-four-digits.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: InputOTPInvalid,
    sourcePath: "ui/components/input-otp-invalid.tsx",
  },
  {
    id: "pattern",
    title: "Pattern",
    component: InputOTPPattern,
    sourcePath: "ui/components/input-otp-pattern.tsx",
  },
  {
    id: "separator",
    title: "Separator",
    component: InputOTPWithSeparator,
    sourcePath: "ui/components/input-otp-separator.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "alphanumeric", title: "Alphanumeric" },
    { id: "controlled", title: "Controlled" },
    { id: "demo", title: "Demo" },
    { id: "disabled", title: "Disabled" },
    { id: "form", title: "Form" },
    { id: "four-digits", title: "Four Digits" },
    { id: "invalid", title: "Invalid" },
    { id: "pattern", title: "Pattern" },
    { id: "separator", title: "Separator" },
]

export default function InputOtpPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="InputOtp"
        description="InputOtp component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the input-otp primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add input-otp" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the InputOtp component."
      >
        <CodeBlock
          code={`import { InputOtp } from "@/primitives/input-otp"`}
        />
      </DocsSection>

      <div className="space-y-10">
        {examples.map((example) => {
          const Component = example.component

          return (
            <DocsSection
              key={example.id}
              id={example.id}
              title={example.title}
            >
              <ComponentExample
                source={readSource(example.sourcePath)}
              >
                <Component />
              </ComponentExample>
            </DocsSection>
          )
        })}
      </div>
    </DocsPage>
  )
}
