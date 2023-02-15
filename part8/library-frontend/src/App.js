import { useApolloClient, useSubscription } from "@apollo/client"
import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import LoginForm from "./components/LoginForm"
import NewBook from "./components/NewBook"
import Recommend from "./components/Recommend"
import { BOOK_ADDED, ALL_BOOKS } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book '${addedBook.title}' added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button
            onClick={() => {
              setPage("recommend")
            }}
          >
            recommend
          </button>
        )}
        {token && <button onClick={() => logout()}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
