"use client"

import { useState } from "react"
import { ChevronDown, Eye, EyeOff, Trash2 } from "lucide-react"
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

  const getNetworkColor = (network: string) => {
    switch (network) {
      case "visa":
        return "text-blue-600 dark:text-blue-400"
      case "mastercard":
        return "text-red-600 dark:text-red-400"
      case "amex":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-muted-foreground"
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
      {cards.map((card) => {
        const isExpanded = expandedCards.has(card.id)
        const isRevealed = revealedCards.has(card.id)
        const isFlipped = flippedCards.has(card.id)

        return (
          <Card
            key={card.id}
            className="cursor-pointer transition-all hover:border-primary/50"
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Network Icon */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded bg-muted flex items-center justify-center font-semibold text-sm",
                      getNetworkColor(card.network)
                    )}
                  >
                    {getNetworkIcon(card.network)}
                  </div>

                  {/* Card Info */}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base">{card.cardholderName}</CardTitle>
                    <CardDescription className="font-mono text-sm">
                      {isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                    </CardDescription>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => toggleRevealed(card.id, e)}
                    aria-label={isRevealed ? "Hide card number" : "Show card number"}
                    className="hover:text-primary"
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
                      "transition-transform",
                      isExpanded && "rotate-180"
                    )}
                    aria-label={isExpanded ? "Collapse card details" : "Expand card details"}
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Expanded Content */}
            {isExpanded && (
              <CardContent className="space-y-4 pt-0 border-t">
                {/* Card Illustration */}
                <div
                  className="h-48 perspective cursor-pointer"
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
                      "relative w-full h-full transition-transform duration-300 [transform-style:preserve-3d]",
                      isFlipped && "[transform:rotateY(180deg)]"
                    )}
                  >
                    {/* Front */}
                    <div
                      className={cn(
                        "absolute inset-0 w-full h-full rounded-lg p-6 bg-gradient-to-br from-primary to-primary/80 text-white flex flex-col justify-between [backface-visibility:hidden]",
                        "shadow-lg border border-primary/20"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div className="text-2xl font-bold tracking-widest">
                          {getNetworkIcon(card.network)}
                        </div>
                        <div className="text-xs font-semibold uppercase opacity-75">
                          {card.network}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs opacity-75 mb-2">Card Number</p>
                          <p className="font-mono text-xl tracking-widest">
                            {isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                          </p>
                        </div>

                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs opacity-75">Cardholder</p>
                            <p className="font-semibold">{card.cardholderName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs opacity-75">Expires</p>
                            <p className="font-mono">{card.expiryDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className={cn(
                        "absolute inset-0 w-full h-full rounded-lg p-6 bg-gradient-to-br from-muted to-muted/80 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]",
                        "shadow-lg border border-border"
                      )}
                    >
                      <div className="space-y-4">
                        <div className="bg-card h-12 rounded" />
                        <div className="flex justify-end">
                          <div className="bg-muted-foreground/20 h-8 w-16 rounded flex items-center justify-center">
                            <span className="text-xs font-semibold">{card.cvv}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Card Number</p>
                    <p className="font-mono font-semibold">
                      {isRevealed ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Expires</p>
                    <p className="font-semibold">{card.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Cardholder</p>
                    <p className="font-semibold">{card.cardholderName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Network</p>
                    <p className="font-semibold capitalize">{card.network}</p>
                  </div>
                </div>

                {/* Delete Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => handleDelete(card.id, e)}
                  className="w-full"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete Card
                </Button>
              </CardContent>
            )}
          </Card>
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
