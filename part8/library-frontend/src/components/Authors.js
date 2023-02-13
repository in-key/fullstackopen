import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useState } from "react"

const Authors = (props) => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const handleSubmit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { name, year: Number(year) } })
    setName("")
    setYear("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option value={a.name} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          year:
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <div>
          <button>update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
