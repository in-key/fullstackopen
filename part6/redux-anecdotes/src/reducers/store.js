import { configureStore } from "@reduxjs/toolkit"
import filterReducer from './filterSlice'
import anecdotesReducer from "./anecdotesSlice"

const store = configureStore({
    reducer: {
        anecdotes: anecdotesReducer,
        filter: filterReducer
    }
})

export default store
