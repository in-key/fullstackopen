import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { likeBlog } from "../reducers/blogsSlice"

const BlogDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
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
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default BlogDetail
