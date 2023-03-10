import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
    }
  }, [result.data, setToken])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login({ variables: { username, password } })
    setUsername("")
    setPassword("")
    setPage("authors")
  }

  if (!show) return null

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>submit</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
