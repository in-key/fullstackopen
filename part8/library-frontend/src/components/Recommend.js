import { useQuery } from "@apollo/client"
import { ALL_BOOKS, CURRENT_USER } from "../queries"

const Recommend = ({ show }) => {
  const userResult = useQuery(CURRENT_USER, {
    skip: !localStorage.getItem("library-user-token"),
  })
  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading || userResult.loading) return <div>loading...</div>

  console.log(userResult)

  const books = result.data.allBooks
  const user = userResult.data.me

  const filter = user.favoriteGenre

  const booksToShow = books.filter((b) =>
    filter.length > 0 ? b.genres.includes(filter) : b
  )

  return (
    <div>
      <h2>books</h2>
      <div>
        books in your favorite genre <b>{filter}</b>
      </div>
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
    </div>
  )
}

export default Recommend
