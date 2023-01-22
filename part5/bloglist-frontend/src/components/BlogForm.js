const BlogForm = ({addBlog, blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogURL, setBlogURL}) => {
    return (
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
      <button type="submit">create</button>
    </form>
)}

export default BlogForm
