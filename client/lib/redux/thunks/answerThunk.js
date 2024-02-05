const { createAsyncThunk } = require('@reduxjs/toolkit')
// Answer

export const fetchAnswerAsync = createAsyncThunk(
  'answer/fetch',
  async () => {
    const res = await fetch('https://localhost:7066/answer')
    return await res.json()
  },
)

export const getAnswerByIdAsync = createAsyncThunk(
  'answer/getById',
  async (answerId) => {
    const res = await fetch(`https://localhost:7066/answer/${answerId}`)
    return await res.json()
  },
)

export const createAnswer = createAsyncThunk(
  'answer/create',
  async (answer) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(answer),
    }
    const res = await fetch(
      `https://localhost:7066/answer`,
      requestOptions,
    )
    return await res.json()
  },
)

export const updateAnswer = createAsyncThunk(
  'answer/update',
  async (answer) => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(answer),
    }
    const res = await fetch(
      `https://localhost:7066/answer/${answer.id}`,
      requestOptions,
    )
    return await res.json()
  },
)

export const deleteAnswer = createAsyncThunk(
  'answer/delete',
  async (answerId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
    }
    const res = await fetch(
      `https://localhost:7066/answer/${answerId}`,
      requestOptions,
    )
    return await res.json()
  },
)

export const restoreAnswer = createAsyncThunk(
  'answer/restore',
  async (answerId) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
    }
    const res = await fetch(
      `https://localhost:7066/answer/restore/${answerId}`,
      requestOptions,
    )
    return await res.json()
  },
)

export const getAnswersByQuestionIdAsync = createAsyncThunk(
    'answer/getByQuestionId',
    async (questionId) => {
      const res = await fetch(
        `https://localhost:7066/answer/by-question/${questionId}`,
      )
      return await res.json()
    },
  )