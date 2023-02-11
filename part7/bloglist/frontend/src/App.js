import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import { setNotification } from "./reducers/notificationSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  initializeBlogs,
  createNewBlog,
  likeBlog,
  removeBlog,
  resetBlogs,
} from "./reducers/blogsSlice"
import { setUser, resetUser } from "./reducers/userSlice"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
    dispatch(initializeBlogs())
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
          type: "error",
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
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const createBlog = async (newBlog) => {
    dispatch(createNewBlog(newBlog))
    dispatch(
      setNotification({
        message: `Successfully added a new blog ${newBlog.title} by ${newBlog.author}`,
        type: "notification",
      })
    )
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <>
          <div>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <div>
            {blogs &&
              blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  handleLike={handleLike}
                  handleRemoveBlog={handleRemoveBlog}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
