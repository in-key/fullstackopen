const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


export const anecdotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map( a => a.id === action.payload.id ? {...a, votes: a.votes + 1} : a)
    case 'CREATE':
      return [...state, asObject(action.payload.content)]
    default:
      return state
  }
}

export const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.filter
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    payload: {
      content: content
    }
  }
}

export const createVote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id: id
    }
  }
}

export const createFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: {
      filter: filter
    }
  }
}
