import { configureStore } from "@reduxjs/toolkit"
import filterReducer from './filterSlice'
import anecdotesReducer from "./anecdotesSlice"
import notificationReducer from './notificationSlice'

const store = configureStore({
    reducer: {
        anecdotes: anecdotesReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

export default store
