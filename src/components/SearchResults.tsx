import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
  results: Array<{
    id: number
    price: number
    formattedPrice: string
    title: string
  }>
  totalPrice: number
  formattedTotalPrice: string
  onAddToWishlist: (id: number) => void
}

export function SearchResults({ results, formattedTotalPrice, onAddToWishlist }: SearchResultsProps) {
  return (
    <div>
      <h2>Total Price: {formattedTotalPrice}</h2>
      {results.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  )
}

/**
 * When to use useMemo
 * 1. Heavy calculations
 * 2. Referential equality (when passing the info to a child component)
 */
