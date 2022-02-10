import { List, ListRowRenderer } from 'react-virtualized'

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
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Total Price: {formattedTotalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  )
}

/**
 * When to use useMemo
 * 1. Heavy calculations
 * 2. Referential equality (when passing the info to a child component)
 */
