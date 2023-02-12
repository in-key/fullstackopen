import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { likeBlog, addComment } from "../reducers/blogsSlice"
import { Form, Button } from "react-bootstrap"

const BlogDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }
  const handleComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    dispatch(addComment(id, comment))
    e.target.comment.value = ""
  }
  return (
    <div>
      {blog && (
        <div>
          <h2>
            {blog.title} {blog.author}
          </h2>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {blog.likes} likes{" "}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handleLike(blog)}
            >
              like
            </Button>
          </div>
          <div>added by {blog.user.name}</div>
          <h3>Comments</h3>
          <Form onSubmit={handleComment}>
            <Form.Group>
              <Form.Control className="w-50" type="text" name="comment" />
              <Button variant="outline-primary" size="sm" type="submit">
                submit
              </Button>
            </Form.Group>
          </Form>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BlogDetail
