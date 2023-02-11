import { useState } from 'react'

const BlogForm = ({ createBlog, toggleVisibility }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    toggleVisibility()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    }
    createBlog(newBlog)
    setBlogAuthor('')
    setBlogTitle('')
    setBlogURL('')
  }

  return (
    <form onSubmit={(e) => addBlog(e)}>
      <div>
        title:
        <input
          type="text"
          value={blogTitle}
          name="Blogtitle"
          id='title-input'
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={blogAuthor}
          name="Blogauthor"
          id='author-input'
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={blogURL}
          name="BlogURL"
          id='url-input'
          onChange={({ target }) => setBlogURL(target.value)}
        />
      </div>
      <button id='create-blog-button' type="submit">create</button>
    </form>
  )}

export default BlogForm
