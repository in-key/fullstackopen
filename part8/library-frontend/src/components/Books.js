import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState("")

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks

  const booksToShow = books.filter((b) =>
    filter.length > 0 ? b.genres.includes(filter) : b
  )

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
        <button onClick={() => setFilter(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter("")}>all genres</button>
    </div>
  )
}

export default Books
