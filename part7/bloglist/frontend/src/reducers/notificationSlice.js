import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: null,
  type: null,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificaiton(state, action) {
      return action.payload
    },
    resetNotificaiton(state, action) {
      return initialState
    },
  },
})

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch(notificationSlice.actions.setNotificaiton(notification))
    setTimeout(() => {
      dispatch(notificationSlice.actions.resetNotificaiton())
    }, 5000)
  }
}

export default notificationSlice.reducer
