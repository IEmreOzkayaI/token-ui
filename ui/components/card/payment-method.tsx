import { CreditCard, Eye, Lock } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/primitives/card"

export default function CardPaymentMethod() {
  return (
    <Card className="w-full max-w-sm overflow-hidden bg-linear-to-br from-primary to-primary/70 text-primary-foreground ring-0">
      <CardHeader className="border-b border-white/20">
        <CardTitle className="flex items-center justify-between text-primary-foreground">
          <span>Credit Card</span>
          <CreditCard className="size-5" />
        </CardTitle>
        <p className="text-sm text-primary-foreground/70">Visa Platinum</p>
      </CardHeader>
      <CardContent className="text-primary-foreground">
        <div className="mb-8">
          <p className="mb-3 text-xs tracking-widest text-primary-foreground/70 uppercase">
            Card Number
          </p>
          <div className="flex items-center justify-between font-mono text-2xl tracking-widest">
            <span>•••• •••• •••• 9010</span>
            <button
              type="button"
              className="text-primary-foreground/70 transition-opacity hover:opacity-100"
              aria-label="Reveal card number"
            >
              <Eye className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest text-primary-foreground/70 uppercase">
              Cardholder
            </p>
            <p className="mt-2 font-semibold">John Doe</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-primary-foreground/70 uppercase">
              Expires
            </p>
            <p className="mt-2 font-semibold">12/26</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-white/20 pt-4 text-xs text-primary-foreground/70">
          <Lock className="size-3.5" />
          <span>PCI DSS Certified</span>
        </div>
      </CardContent>
    </Card>
  )
}
