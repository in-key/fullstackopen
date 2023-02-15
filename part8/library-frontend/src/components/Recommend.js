import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { ALL_BOOKS, CURRENT_USER } from "../queries"

const Recommend = ({ show }) => {
  const userResult = useQuery(CURRENT_USER, {
    skip: !localStorage.getItem("library-user-token"),
  })
  const [getRecommendBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (userResult.data) {
      getRecommendBooks({
        variables: { genre: userResult.data.me.favoriteGenre },
      })
    }
  }, [userResult.data]) //eslint-disable-line

  if (!show) {
    return null
  }

  if (loading) return <div>loading...</div>

  const books = data.allBooks
  // const user = userResult.data.me

  // const filter = user.favoriteGenre

  // const booksToShow = books.filter((b) =>
  //   filter.length > 0 ? b.genres.includes(filter) : b
  // )

  return (
    <div>
      <h2>books</h2>
      <div>
        books in your favorite genre <b>{userResult.data.me.favoriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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
