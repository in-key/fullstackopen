import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setUser(user)
    } else {
      blogService
        .getAll().then(initialBlogs => {
          setBlogs(initialBlogs)
        })
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      const returnedBlog = await blogService.getAll()
      setBlogs(returnedBlog)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        message: 'Incorrect username or password',
        type: 'error'
      })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setBlogs([])
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
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const createBlog = async (newBlog) => {
    const savedBlog = await blogService.create(newBlog)
    setNotification({
      message: `Successfully added a new blog ${savedBlog.title} by ${savedBlog.author}`,
      type: 'notification'
    })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
    setBlogs(blogs.concat(savedBlog))
  }

  const handleLike = async (blog) => {
    const newLikes = {
      likes: blog.likes + 1
    }
    const res = await blogService.addLike(blog.id, newLikes)
    setBlogs(blogs.map(b => b.id === res.id ? { ...b, likes: res.likes } : b))
  }

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      {user === null ?
        loginForm() :
        <>
          <div>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          <Togglable buttonLabel='new blog'>
            <BlogForm createBlog={createBlog}/>
          </Togglable>
        </>
      }
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemoveBlog={handleRemoveBlog}/>
        )}
      </div>
    </div>
  )
}

export default App
