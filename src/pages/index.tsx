import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault()

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    setResults(data)
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
        results={results}
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
