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
