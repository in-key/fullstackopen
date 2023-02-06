import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (anecdoote) =>
    axios.post(baseUrl, anecdoote).then(res => res.data)

export const updateVote = (updatedAnecdote) =>
    axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
        .then(res => res.data)
