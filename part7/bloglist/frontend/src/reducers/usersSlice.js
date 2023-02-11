import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initializeUsers(state, action) {
      return action.payload
    },
  },
})

export default usersSlice.reducer

export const initializeUsers = () => {
  return async (dispatch) => {
    const res = await userService.getAll()
    dispatch(usersSlice.actions.initializeUsers(res.data))
  }
}
