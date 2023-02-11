import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationSlice"
import blogsReducer from "./blogsSlice"
import userReducer from "./userSlice"
import usersReducer from "./usersSlice"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
