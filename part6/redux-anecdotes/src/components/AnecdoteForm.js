import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdotesSlice"
import { setNotification, unsetNotification } from "../reducers/notificationSlice"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleCreate = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created a new anecdote '${content}'`))
        setTimeout(() => {
            dispatch(unsetNotification())
        }, 5000);
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
                <div>
                    <input name='anecdote'/>
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
