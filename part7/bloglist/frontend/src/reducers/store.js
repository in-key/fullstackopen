import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationSlice"
import blogsReducer from "./blogsSlice"
import userReducer from "./userSlice"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

export default store
