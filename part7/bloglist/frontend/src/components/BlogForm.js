import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const BlogForm = ({ createBlog, toggleVisibility }) => {
  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogURL, setBlogURL] = useState("")

  const addBlog = async (event) => {
    event.preventDefault()
    toggleVisibility()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
    }
    createBlog(newBlog)
    setBlogAuthor("")
    setBlogTitle("")
    setBlogURL("")
  }

  return (
    <Form onSubmit={addBlog} className="w-50">
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          value={blogTitle}
          name="Blogtitle"
          id="title-input"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          type="text"
          value={blogAuthor}
          name="Blogauthor"
          id="author-input"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          type="text"
          value={blogURL}
          name="BlogURL"
          id="url-input"
          onChange={({ target }) => setBlogURL(target.value)}
        />
        <Button
          variant="outline-primary"
          size="sm"
          id="create-blog-button"
          type="submit"
        >
          create
        </Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm
