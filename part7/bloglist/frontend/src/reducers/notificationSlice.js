import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: null,
  type: null,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    success(state, action) {
      state = {
        message: action.payload,
        type: "notification",
      }
    },
    error(state, action) {
      state = {
        message: action.payload,
        type: "error",
      }
    },
    reset(state, action) {
      return initialState
    },
  },
})

export default notificationSlice.reducer
export const { success, error, reset } = notificationSlice.actions
