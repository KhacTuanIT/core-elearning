import { createSlice } from '@reduxjs/toolkit'
import {
  createQuestion,
  deleteQuestion,
  fetchQuestionAsync,
  getAnswersByQuestionIdAsync,
  getQuestionByIdAsync,
  getQuestionsByCategoryIdAsync,
  restoreQuestion,
  updateQuestion,
} from '../thunks/questionThunk'

const initialState = {
  questions: [],
  currentQuestion: null,
  isLoading: false,
}

export const question = createSlice({
  name: 'question',
  initialState: initialState,
  reducers: {
    setQuestion(state, action) {
      state.currentQuestion = action.payload
    },
    getQuestion(state, action) {
        
        state.currentQuestion = state.questions.filter(x => x.id === action.payload)[0]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionsByCategoryIdAsync.pending, (state, action) => {
      state.isLoading = true
    }),
      builder.addCase(
        getQuestionsByCategoryIdAsync.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.questions = action.payload.data
        },
      ),
      builder.addCase(
        getQuestionsByCategoryIdAsync.rejected,
        (state, action) => {
          state.isLoading = false
        },
      ),
      builder.addCase(fetchQuestionAsync.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(fetchQuestionAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.questions = action.payload.data
      }),
      builder.addCase(fetchQuestionAsync.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(getQuestionByIdAsync.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(getQuestionByIdAsync.fulfilled, (state, action) => {
        state.currentQuestion = action.payload.data
        state.isLoading = false
      }),
      builder.addCase(getQuestionByIdAsync.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(createQuestion.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(createQuestion.fulfilled, (state, action) => {
        state.currentQuestion = null
        state.questions.push(action.payload.data)
        state.isLoading = false
      }),
      builder.addCase(createQuestion.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(updateQuestion.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(updateQuestion.fulfilled, (state, action) => {
        state.currentQuestion = action.payload.data
        if (state.questions.length > 0) {
          state.questions = state.questions.map((item) => {
            if (item.id === action.payload.data.id) {
              item = action.payload.data
            }
            return item
          })
        }
        state.isLoading = false
      }),
      builder.addCase(updateQuestion.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(deleteQuestion.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(deleteQuestion.fulfilled, (state, action) => {
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
      builder.addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(restoreQuestion.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(restoreQuestion.fulfilled, (state, action) => {
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
      builder.addCase(restoreQuestion.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const { setQuestion, getQuestion } = question.actions
