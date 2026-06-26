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
  { id: "examples", title: "Examples" },
  { id: "alphanumeric", title: "Alphanumeric", depth: 3 },
  { id: "controlled", title: "Controlled", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "form", title: "Form", depth: 3 },
  { id: "four-digits", title: "Four Digits", depth: 3 },
  { id: "invalid", title: "Invalid", depth: 3 },
  { id: "pattern", title: "Pattern", depth: 3 },
  { id: "separator", title: "Separator", depth: 3 },
]

export default function InputOtpPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="InputOtp"
        description="Accessible one-time password component with copy paste functionality."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add input-otp" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { InputOtp } from "@/primitives/input-otp"`}
        />
      </DocsSection>

      <DocsSection id="examples" title="Examples">
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
      </DocsSection>
    </DocsPage>
  )
}
