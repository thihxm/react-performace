import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
  results: Array<{
    id: number
    price: number
    title: string
  }>
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => total + product.price, 0)
  }, [results])

  return (
    <div>
      <h2>Total Price: ${totalPrice}</h2>
      {results.map((product) => (
        <ProductItem key={product.id} product={product}/>
      ))}
    </div>
  )
}

/**
 * When to use useMemo
 * 1. Heavy calculations
 * 2. Referential equality (when passing the info to a child component)
 */