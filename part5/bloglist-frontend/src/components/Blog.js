import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemoveBlog }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const handleLike = async () => {
  //   const newLikes = {
  //     likes: blog.likes + 1
  //   }
  //   const res = await blogService.addLike(blog.id, newLikes)
  //   setBlogs(blogs.map(b => b.id === res.id ? { ...b, likes: res.likes } : b))
  // }

  // const handleRemoveBlog = async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
  //     await blogService.deleteBlog(blog.id)
  //     setBlogs(blogs.filter(b => b.id !== blog.id))
  //   }
  // }

  return (
    <div style={blogStyle}>
      <div className='blogheading'>
        {blog.title} {blog.author}
        <button className='visibilityButton' onClick={() => setDetailVisible(!detailVisible)}>{detailVisible ? 'hide' : 'view'}</button>
      </div>
      { detailVisible &&
        <>
          <div className='blogurl'>{blog.url}</div>
          <div className='bloglikes'>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            <button onClick={() => handleRemoveBlog(blog)}>remove</button>
          </div>
        </>
      }
    </div>
  )}

export default Blog
