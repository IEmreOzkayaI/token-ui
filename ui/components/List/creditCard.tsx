"use client"

import { useState } from "react"
import { ChevronDown, Eye, EyeOff, Trash2, CreditCard, Lock } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/primitives/card"
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  const toggleRevealed = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newRevealed = new Set(revealedCards)
    if (newRevealed.has(id)) {
      newRevealed.delete(id)
    } else {
      newRevealed.add(id)
    }
    setRevealedCards(newRevealed)
  }

  const toggleFlipped = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(id)) {
      newFlipped.delete(id)
    } else {
      newFlipped.add(id)
    }
    setFlippedCards(newFlipped)
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(id)
  }

  const getNetworkGradient = (network: string) => {
    switch (network) {
      case "visa":
        return "from-blue-600 to-blue-700"
      case "mastercard":
        return "from-red-600 to-orange-600"
      case "amex":
        return "from-green-700 to-teal-700"
      default:
        return "from-slate-600 to-slate-700"
    }
  }

  const getNetworkIcon = (network: string) => {
    switch (network) {
      case "visa":
        return "VI"
      case "mastercard":
        return "MC"
      case "amex":
        return "AX"
      default:
        return "CC"
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
    <div className="w-full space-y-4">
      {cards.map((card, idx) => {
        const isExpanded = expandedCards.has(card.id)
        const isRevealed = revealedCards.has(card.id)
        const isFlipped = flippedCards.has(card.id)
        const isHovered = hoveredCard === card.id

        return (
          <div
            key={card.id}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all overflow-hidden",
                "hover:shadow-lg hover:border-primary/30",
                isExpanded && "ring-2 ring-primary/20"
              )}
              onClick={() => toggleExpanded(card.id)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
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
              {/* Summary - Premium Style */}
              <CardHeader className="pb-4 relative overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
                    getNetworkGradient(card.network),
                    isHovered && "opacity-5"
                  )}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Premium Network Badge */}
                    <div
                      className={cn(
                        "w-14 h-14 rounded-lg bg-gradient-to-br shadow-md",
                        "flex items-center justify-center font-bold text-white text-sm",
                        "transition-transform duration-300",
                        isHovered && "scale-110"
                      )}
                      style={{
                        backgroundImage: `linear-gradient(135deg, var(--primary), var(--secondary))`,
                      }}
                    >
                      {getNetworkIcon(card.network)}
                    </div>

                    {/* Card Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <CardTitle className="text-base font-semibold">
                        {card.cardholderName}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm tracking-widest text-muted-foreground transition-all duration-300">
                          {isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                        </code>
                        <Lock className="size-3.5 text-muted-foreground/70" />
                      </div>
                    </div>
                  </div>

                  {/* Premium Actions */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => toggleRevealed(card.id, e)}
                      aria-label={isRevealed ? "Hide card number" : "Show card number"}
                      className={cn(
                        "transition-colors duration-300",
                        "hover:text-primary hover:bg-primary/10"
                      )}
                    >
                      {isRevealed ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => toggleExpanded(card.id, e)}
                      className={cn(
                        "transition-transform duration-500",
                        isExpanded && "rotate-180"
                      )}
                      aria-label={isExpanded ? "Collapse card details" : "Expand card details"}
                    >
                      <ChevronDown className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Expanded Content - Premium Design */}
              {isExpanded && (
                <CardContent className="space-y-6 pt-0 border-t animate-in fade-in duration-300">
                  {/* 3D Card Illustration */}
                  <div
                    className="h-56 perspective cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={(e) => toggleFlipped(card.id, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        toggleFlipped(card.id, e)
                      }
                    }}
                    aria-label="Toggle card front/back view"
                  >
                    <div
                      className={cn(
                        "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
                        isFlipped && "[transform:rotateY(180deg)]"
                      )}
                    >
                      {/* Front */}
                      <div
                        className={cn(
                          "absolute inset-0 w-full h-full rounded-2xl p-6 text-white flex flex-col justify-between [backface-visibility:hidden]",
                          "shadow-2xl border border-white/10 backdrop-blur-sm",
                          "bg-gradient-to-br",
                          getNetworkGradient(card.network)
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <CreditCard className="size-8 text-white/80" />
                          <div className="text-xs font-semibold uppercase tracking-widest opacity-80">
                            {card.network}
                          </div>
                        </div>

                        <div className="space-y-5">
                          <div>
                            <p className="text-xs opacity-70 mb-2 font-medium tracking-wide">
                              Card Number
                            </p>
                            <p className="font-mono text-xl tracking-[0.3em] font-semibold">
                              {isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                            </p>
                          </div>

                          <div className="flex justify-between items-end pt-4 border-t border-white/10">
                            <div>
                              <p className="text-xs opacity-70 mb-1 font-medium">Cardholder</p>
                              <p className="font-semibold text-sm">{card.cardholderName}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs opacity-70 mb-1 font-medium">Expires</p>
                              <p className="font-mono text-sm font-semibold">{card.expiryDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back */}
                      <div
                        className={cn(
                          "absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]",
                          "shadow-2xl border border-border bg-gradient-to-br from-muted to-muted/80"
                        )}
                      >
                        <div className="space-y-6">
                          <div className="bg-muted-foreground/20 h-12 rounded w-full" />
                          <div className="flex justify-end">
                            <div className="bg-background h-10 w-20 rounded flex items-center justify-center border border-border">
                              <span className="text-xs font-bold text-muted-foreground">
                                {card.cvv}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid - Premium Layout */}
                  <div className="grid grid-cols-2 gap-6 py-4 border-y">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Card Number
                      </p>
                      <p className="font-mono text-sm font-semibold text-foreground">
                        {isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Expires
                      </p>
                      <p className="font-semibold text-sm">{card.expiryDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Cardholder
                      </p>
                      <p className="font-semibold text-sm">{card.cardholderName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Network
                      </p>
                      <p className="font-semibold text-sm capitalize">{card.network}</p>
                    </div>
                  </div>

                  {/* Delete Button - Premium Style */}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => handleDelete(card.id, e)}
                    className="w-full transition-all duration-300 hover:scale-105 active:scale-95"
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
