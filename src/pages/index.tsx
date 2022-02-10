import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

type ProductResponse = {
  id: number
  price: number
  title: string
}

type Product = ProductResponse & { formattedPrice: string }

type Results = {
  totalPrice: number
  formattedTotalPrice: string
  data: Product[]
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    formattedTotalPrice: '',
    data: [],
  })

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault()

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const formatter = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map((product: ProductResponse) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        formattedPrice: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total: number, product: ProductResponse) => total + product.price, 0)
    const formattedTotalPrice = formatter.format(totalPrice)

    setResults({ totalPrice, formattedTotalPrice, data: products })
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        formattedTotalPrice={results.formattedTotalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}

export default Home

/**
 * When to use useCallback
 * Same as useMemo, but when you are dealing with functions
 * 1. Function referential equality (when passing the info to a child component)
 */
