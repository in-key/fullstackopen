import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import UserList from "./components/UserList"
import Navigation from "./components/Navigation"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationSlice"
import {
  initializeBlogs,
  createNewBlog,
  resetBlogs,
} from "./reducers/blogsSlice"
import { setUser, resetUser } from "./reducers/userSlice"
import { initializeUsers } from "./reducers/usersSlice"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import User from "./components/User"
import BlogDetail from "./components/BlogDetail"
import { Table, Form, Button } from "react-bootstrap"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
      dispatch(setUser(user))
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(
        setNotification({
          message: "Incorrect username or password",
          type: "danger",
        })
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(resetUser())
    dispatch(resetBlogs())
  }

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button id="login-button" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  )

  const createBlog = async (newBlog) => {
    dispatch(createNewBlog(newBlog))
    dispatch(
      setNotification({
        message: `Successfully added a new blog ${newBlog.title} by ${newBlog.author}`,
        type: "success",
      })
    )
  }

  if (!user) {
    return (
      <div className="container">
        <h2>blogs</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Navigation user={user} handleLogout={handleLogout} />
        <h2>blog app</h2>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="new blog">
                  <BlogForm createBlog={createBlog} />
                </Togglable>
                <div>
                  <Table striped>
                    <tbody>
                      {blogs &&
                        blogs.map((blog) => (
                          <tr key={blog.id}>
                            <td>
                              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                            <td>{blog.author}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </>
            }
          />
          <Route path="/users" element={<UserList users={users} />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
