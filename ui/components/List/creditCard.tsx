"use client"

import { useState } from "react"
import { ChevronDown, Eye, EyeOff, Trash2, CreditCard, Lock } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent, CardHeader } from "@/primitives/card"
import { cn } from "@/lib/utils"

interface CreditCardData {
  id: string
  cardNumber: string
  cardholderName: string
  expiryDate: string
  cvv: string
  network: "visa" | "mastercard" | "amex"
}

interface CreditCardListProps {
  cards?: CreditCardData[]
  onDelete?: (id: string) => void
}

export default function CreditCardList({
  cards = MOCK_CARDS,
  onDelete,
}: CreditCardListProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set())
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards)
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id)
    setExpandedCards(newExpanded)
  }

  const toggleRevealed = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newRevealed = new Set(revealedCards)
    newRevealed.has(id) ? newRevealed.delete(id) : newRevealed.add(id)
    setRevealedCards(newRevealed)
  }

  const toggleFlipped = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newFlipped = new Set(flippedCards)
    newFlipped.has(id) ? newFlipped.delete(id) : newFlipped.add(id)
    setFlippedCards(newFlipped)
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(id)
  }

  const getNetworkIcon = (network: string) => {
    const iconProps = "size-5 text-white"
    switch (network) {
      case "visa":
        return <CreditCard className={iconProps} />
      case "mastercard":
        return <CreditCard className={iconProps} />
      case "amex":
        return <CreditCard className={iconProps} />
      default:
        return <CreditCard className={iconProps} />
    }
  }

  const maskCardNumber = (cardNumber: string) => {
    const last4 = cardNumber.slice(-4)
    return `•••• •••• •••• ${last4}`
  }

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  return (
    <div className="w-full space-y-3">
      {cards.map((card, idx) => {
        const isExpanded = expandedCards.has(card.id)
        const isRevealed = revealedCards.has(card.id)
        const isFlipped = flippedCards.has(card.id)

        return (
          <div
            key={card.id}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all overflow-hidden",
                "hover:border-[color:var(--primary)] hover:shadow-lg"
              )}
              style={{ boxShadow: isExpanded ? "var(--shadow-lg)" : undefined }}
              onClick={() => toggleExpanded(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleExpanded(card.id)
                }
              }}
              aria-expanded={isExpanded}
              aria-label={`Credit card ending in ${card.cardNumber.slice(-4)}`}
            >
              {/* Summary */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Badge with network icon */}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                      style={{
                        backgroundColor: "var(--primary)",
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      {getNetworkIcon(card.network)}
                    </div>

                    {/* Card info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>
                        {card.cardholderName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <code className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                          {isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                        </code>
                        <Lock className="size-3 flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => toggleRevealed(card.id, e)}
                      className="h-8 w-8"
                    >
                      {isRevealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn("h-8 w-8 transition-transform duration-300", isExpanded && "rotate-180")}
                      onClick={(e) => toggleExpanded(card.id, e)}
                    >
                      <ChevronDown className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Expanded */}
              {isExpanded && (
                <CardContent className="space-y-5 pt-0 border-t animate-in fade-in duration-300">
                  {/* 3D Card */}
                  <div
                    className="h-64 cursor-pointer rounded-xl overflow-hidden"
                    onClick={(e) => toggleFlipped(card.id, e)}
                    style={{ perspective: "1000px" }}
                  >
                    <div
                      className="relative w-full h-full transition-transform duration-500"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 rounded-xl p-5 text-white flex flex-col justify-between"
                        style={{
                          backgroundImage: `linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 80%, transparent))`,
                          backfaceVisibility: "hidden",
                          boxShadow: "var(--shadow-xl)",
                          borderColor: "rgba(255,255,255,0.2)",
                          borderWidth: "1px",
                        }}
                      >
                        <div className="flex justify-between items-start">
                          {getNetworkIcon(card.network)}
                          <div className="text-xs font-bold uppercase opacity-80">{card.network}</div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs opacity-75 mb-1 font-medium">Card Number</p>
                            <p className="font-mono text-lg tracking-[0.2em] font-semibold">
                              {isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                            </p>
                          </div>
                          <div className="flex justify-between items-end pt-2 border-t border-white/20">
                            <div>
                              <p className="text-xs opacity-75 mb-0.5 font-medium">Cardholder</p>
                              <p className="text-sm font-semibold">{card.cardholderName}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs opacity-75 mb-0.5 font-medium">Expires</p>
                              <p className="text-sm font-semibold">{card.expiryDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back */}
                      <div
                        className="absolute inset-0 rounded-xl p-5 flex flex-col justify-center"
                        style={{
                          backgroundColor: "var(--muted)",
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          boxShadow: "var(--shadow-xl)",
                          borderColor: "var(--border)",
                          borderWidth: "1px",
                        }}
                      >
                        <div className="space-y-4">
                          <div className="h-10 rounded" style={{ backgroundColor: "var(--muted-foreground)", opacity: "0.3" }} />
                          <div className="flex justify-end">
                            <div
                              className="h-8 w-16 rounded flex items-center justify-center text-xs font-bold"
                              style={{ backgroundColor: "var(--background)", color: "var(--muted-foreground)" }}
                            >
                              {card.cvv}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-5 py-3 border-y text-sm">
                    {[
                      { label: "Number", value: isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber) },
                      { label: "Expires", value: card.expiryDate },
                      { label: "Cardholder", value: card.cardholderName },
                      { label: "Network", value: card.network },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--muted-foreground)" }}>
                          {item.label}
                        </p>
                        <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Delete */}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => handleDelete(card.id, e)}
                    className="w-full h-8 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Trash2 className="size-4 mr-2" />
                    Delete Card
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>
        )
      })}
    </div>
  )
}

const MOCK_CARDS: CreditCardData[] = [
  {
    id: "1",
    cardNumber: "4532123456789012",
    cardholderName: "John Doe",
    expiryDate: "12/26",
    cvv: "123",
    network: "visa",
  },
  {
    id: "2",
    cardNumber: "5425233010103010",
    cardholderName: "Jane Smith",
    expiryDate: "08/25",
    cvv: "456",
    network: "mastercard",
  },
  {
    id: "3",
    cardNumber: "371449635398431",
    cardholderName: "John Doe",
    expiryDate: "06/27",
    cvv: "1234",
    network: "amex",
  },
]
