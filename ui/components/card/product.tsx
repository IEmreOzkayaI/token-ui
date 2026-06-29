import { Badge } from "@/primitives/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/primitives/card"

export default function CardProduct() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
            alt="Product"
            className="h-full w-full object-cover"
          />
        </div>
      </CardContent>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">Wireless Headphones</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            In Stock
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Premium sound quality with active noise cancellation
        </CardDescription>
      </CardHeader>

      <CardFooter className="pt-0">
        <span className="text-lg font-semibold">$199.99</span>
      </CardFooter>
    </Card>
  )
}
