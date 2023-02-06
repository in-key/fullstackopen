import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateVote } from './requests'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: `you voted for '${anecdote.content}'` })
    setTimeout(() => {
      notificationDispatch({ type: 'RESET_NOTIFICATION' })
    }, 5000);
  }

  const res = useQuery('anecdotes', getAnecdotes, {
    retry: false
  })

  if (res.isLoading){
    return <div>Loading...</div>
  }

  if (res.isError){
    return (
    <div>
      anecdote service not available due to problems in server
    </div>
  )}

  const anecdotes = res.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification}/>
      <AnecdoteForm dispatch={notificationDispatch}/>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
