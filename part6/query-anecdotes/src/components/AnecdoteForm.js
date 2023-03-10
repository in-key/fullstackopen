import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = ({dispatch}) => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 }, {
      onError: () => {
        dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote must be at least 5 characters long` })
        setTimeout(() => {
          dispatch({ type: 'RESET_NOTIFICATION' })
        }, 5000);
      },
      onSuccess: () => {
        dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${content}' created` })
        setTimeout(() => {
          dispatch({ type: 'RESET_NOTIFICATION' })
        }, 5000);
      }
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
