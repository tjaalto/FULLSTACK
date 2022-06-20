import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setVote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const sortedState = state.map(note => note.id !== id ?
        note : changedAnecdote
      )
      return sortedState.sort((a, b) => b.votes - a.votes)
    },
    setCreate: (state, action) => {
      const content = action.payload
      state.concat({
        content,
      })
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(setCreate(anecdote))
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    await anecdoteService.vote(id)
    dispatch(setVote(id))
  }
}

export const { setVote, setCreate, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer