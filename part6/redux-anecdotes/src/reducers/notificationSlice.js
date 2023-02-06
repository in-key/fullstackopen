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

// export const { setNotification, unsetNotification } = notificationSlice.actions

export const setNotification = (notification, seconds) => {
    return dispatch => {
        dispatch(notificationSlice.actions.setNotification(notification))
        setTimeout(() => {
            dispatch(notificationSlice.actions.unsetNotification())
        }, seconds * 1000);
    }
}

export default notificationSlice.reducer
