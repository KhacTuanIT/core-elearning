import { createSlice } from '@reduxjs/toolkit'
import {
  createAnswer,
  deleteAnswer,
  fetchAnswerAsync,
  getAnswerByIdAsync,
  getAnswersByQuestionIdAsync,
  restoreAnswer,
  updateAnswer,
} from '../thunks/answerThunk'

const initialState = {
  answers: [],
  currentAnswer: null,
  isLoading: false,
}

export const answer = createSlice({
  name: 'answer',
  initialState: initialState,
  reducers: {
    setAnswer(state, action) {
      state.currentAnswer = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnswerAsync.pending, (state, action) => {
      state.isLoading = true
    }),
      builder.addCase(fetchAnswerAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.answers = action.payload.data
      }),
      builder.addCase(fetchAnswerAsync.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(getAnswerByIdAsync.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(getAnswerByIdAsync.fulfilled, (state, action) => {
        state.currentAnswer = action.payload.data
        state.isLoading = false
      }),
      builder.addCase(getAnswerByIdAsync.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(getAnswersByQuestionIdAsync.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(
        getAnswersByQuestionIdAsync.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.answers = action.payload.data
        },
      ),
      builder.addCase(getAnswersByQuestionIdAsync.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(createAnswer.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(createAnswer.fulfilled, (state, action) => {
        state.currentAnswer = null
        state.answers.push(action.payload.data)
        state.isLoading = false
      }),
      builder.addCase(createAnswer.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(updateAnswer.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(updateAnswer.fulfilled, (state, action) => {
        state.currentAnswer = action.payload.data
        if (state.answers.length > 0) {
          state.answers = state.answers.map((item) => {
            if (item.id === action.payload.data.id) {
              item = action.payload.data
            }
            return item
          })
        }
        state.isLoading = false
      }),
      builder.addCase(updateAnswer.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(deleteAnswer.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(deleteAnswer.fulfilled, (state, action) => {
        state.currentCategory = action.payload.data
        if (state.categories.length > 0) {
          state.categories = state.categories.map((item) => {
            if (item.id === action.payload.data.id) {
              item = action.payload.data
            }
            return item
          })
        }
        state.isLoading = false
      }),
      builder.addCase(deleteAnswer.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(restoreAnswer.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(restoreAnswer.fulfilled, (state, action) => {
        state.currentCategory = action.payload.data
        if (state.categories.length > 0) {
          state.categories = state.categories.map((item) => {
            if (item.id === action.payload.data.id) {
              item = action.payload.data
            }
            return item
          })
        }
        state.isLoading = false
      }),
      builder.addCase(restoreAnswer.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const { setAnswer } = answer.actions
