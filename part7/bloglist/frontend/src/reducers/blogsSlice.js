import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    initializeBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    createBlog(state, action) {
      state.push(action.payload)
      state.sort((a, b) => b.likes - a.likes)
    },
    likeBlog(state, action) {
      const blogToUpdate = action.payload
      const foundBlog = state.find((b) => b.id === blogToUpdate.id)
      foundBlog.likes++
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload
      return state.filter((b) => b.id !== blogToRemove.id)
    },
    resetBlogs(state, action) {
      return []
    },
  },
})

export default blogsSlice.reducer
export const { resetBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(blogsSlice.actions.initializeBlogs(blogs))
  }
}

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(newBlog)
    dispatch(blogsSlice.actions.createBlog(savedBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newLikes = {
      likes: blog.likes + 1,
    }
    const blogToUpdate = await blogService.addLike(blog.id, newLikes)
    dispatch(blogsSlice.actions.likeBlog(blogToUpdate))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id)
    dispatch(blogsSlice.actions.removeBlog(blog))
  }
}
