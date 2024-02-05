const { createAsyncThunk } = require('@reduxjs/toolkit')

export const getQuestionsByCategoryIdAsync = createAsyncThunk(
  'question/getByCategoryId',
  async (categoryId) => {
    const res = await fetch(
      `https://localhost:7066/question/by-category/${categoryId}`,
    )
    return await res.json()
  },
)

// Question

export const fetchQuestionAsync = createAsyncThunk(
  'question/fetch',
  async () => {
    const res = await fetch('https://localhost:7066/question')
    return await res.json()
  },
)

export const getQuestionByIdAsync = createAsyncThunk(
  'question/getById',
  async (questionId) => {
    const res = await fetch(`https://localhost:7066/question/${questionId}`)
    return await res.json()
  },
)

export const createQuestion = createAsyncThunk(
  'question/create',
  async (question) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(question),
    }
    const res = await fetch(
      `https://localhost:7066/question`,
      requestOptions,
    )
    return await res.json()
  },
)

export const updateQuestion = createAsyncThunk(
  'question/update',
  async (question) => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(question),
    }
    const res = await fetch(
      `https://localhost:7066/question/${question.id}`,
      requestOptions,
    )
    return await res.json()
  },
)

export const deleteQuestion = createAsyncThunk(
  'question/delete',
  async (questionId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
    }
    const res = await fetch(
      `https://localhost:7066/question/${questionId}`,
      requestOptions,
    )
    return await res.json()
  },
)

export const restoreQuestion = createAsyncThunk(
  'question/restore',
  async (questionId) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
    }
    const res = await fetch(
      `https://localhost:7066/question/restore/${questionId}`,
      requestOptions,
    )
    return await res.json()
  },
)
