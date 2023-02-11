import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser(state, action) {
      return null
    },
  },
})

export default userSlice.reducer

export const { setUser, resetUser } = userSlice.actions

export const restoreUser = (user) => {
  return (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(resetUser())
  }
}
