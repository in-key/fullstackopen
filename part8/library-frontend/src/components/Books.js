import { useLazyQuery, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [filter, setFilter] = useState("")
  const result = useQuery(ALL_BOOKS)
  const [getFilteredBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network",
  })

  if (!props.show) {
    return null
  }

  if (result.loading || loading)
    return (
      <div>
        <h2>books</h2>
        loading...
      </div>
    )

  const handleFilter = (genre) => {
    setFilter(genre)
    if (genre.length > 0) {
      getFilteredBooks({ variables: { genre } })
    } else {
      getFilteredBooks()
    }
  }

  const books = result.data.allBooks

  const booksToShow = data && !loading ? data.allBooks : books

  let genres = new Set(books.map((b) => b.genres).flat())
  genres = Array.from(genres)

  return (
    <div>
      <h2>books</h2>
      {filter.length > 0 && <div>in genre {filter}</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button onClick={() => handleFilter(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => handleFilter("")}>all genres</button>
    </div>
  )
}

export default Books
