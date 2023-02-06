import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        unsetNotification(state, action){
            return ''
        }
    }
})

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer
