import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action){
            state.push(action.payload)
        },
        addVote(state, action){
            const id = action.payload
            const foundAnecdote = state.find(a => a.id === id)
            foundAnecdote.votes++
        },
        setAnecdotes(state, action){
            return action.payload
        }
    }
})

export const { appendAnecdote, addVote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (anecdote) => {
    return async dispatch => {
        const returnedAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(appendAnecdote(returnedAnecdote))
    }
}

export const updateVote = (id) => {
    return async dispatch => {
        await anecdoteService.addVote(id)
        dispatch(addVote(id))
    }
}

export default anecdotesSlice.reducer
