import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')
  const [notification, setNotification] = useState({message: '', type: ''})

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setUser(user)
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
        message: `Incorrect username or password`,
        type: 'error'
      })
      setTimeout(() => {
        setNotification({message: '', type: ''})
      }, 5000);
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
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={blogTitle}
          name="Blogtitle"
          onChange={({target}) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={blogAuthor}
          name="Blogauthor"
          onChange={({target}) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={blogURL}
          name="BlogURL"
          onChange={({target}) => setBlogURL(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    }
    const savedBlog = await blogService.create(newBlog)
    setNotification({
      message: `Successfully added a new blog ${blogTitle} by ${blogAuthor}`,
      type: 'notification'
    })
    setTimeout(() => {
      setNotification({message: '', type: ''})
    }, 5000);
    setBlogs(blogs.concat(savedBlog))
    setBlogAuthor('')
    setBlogTitle('')
    setBlogURL('')
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
          <h2>new blog</h2>
          {blogForm()}
        </>
      }
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
