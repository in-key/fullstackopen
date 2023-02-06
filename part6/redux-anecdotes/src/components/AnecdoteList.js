import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdotesSlice'
import { setNotification } from '../reducers/notificationSlice'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes).filter( a => a.content.includes(filter)).sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(updateVote(id))
        dispatch(setNotification(`you voted for '${anecdote.content}'`, 10))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList
