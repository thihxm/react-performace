import dynamic from "next/dynamic" // or import { lazy } from 'react'
import { memo, useState } from "react"
import { AddProductToWishlistProps } from "./AddProductToWishlist"
import lodash from 'lodash'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(async () => {
  const mod = await import("./AddProductToWishlist")
  return mod.AddProductToWishlist
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number
    price: number
    formattedPrice: string
    title: string
  }
  onAddToWishlist: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>

      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
})

/**
 * When to use memo
 * 1. Pure Functional Components
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size components
 */