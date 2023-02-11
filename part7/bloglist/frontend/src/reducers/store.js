import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationSlice"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

export default store
