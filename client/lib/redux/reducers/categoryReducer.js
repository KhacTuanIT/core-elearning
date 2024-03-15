import { createSlice } from '@reduxjs/toolkit'
import {
  createCategory,
  deleteCategory,
  fetchCategoryAsync,
  getCategoryByIdAsync,
  restoreCategory,
  updateCategory,
} from '../thunks/categoryThunk'

const initialState = {
  categories: [],
  currentCategory: null,
  isLoading: false,
}

export const category = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    setCategory(state, action) {
      return {
        ...state,
        currentCategory: action.payload,
      }
    },
    setCategoryById(state, action) {
      const catebory = state.categories.find((x) => x.id === action.payload)
      return {
        ...state,
        currentCategory: catebory,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryAsync.pending, (state, action) => {
      state.isLoading = true
    }),
      builder.addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload.data
      }),
      builder.addCase(fetchCategoryAsync.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(getCategoryByIdAsync.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(getCategoryByIdAsync.fulfilled, (state, action) => {
        state.currentCategory = action.payload.data
        state.isLoading = false
      }),
      builder.addCase(getCategoryByIdAsync.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(createCategory.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(createCategory.fulfilled, (state, action) => {
        state.currentCategory = null
        state.categories.push(action.payload.data)
        state.isLoading = false
      }),
      builder.addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(updateCategory.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(updateCategory.fulfilled, (state, action) => {
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
      builder.addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(deleteCategory.fulfilled, (state, action) => {
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
      builder.addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false
      }),
      builder.addCase(restoreCategory.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(restoreCategory.fulfilled, (state, action) => {
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
      builder.addCase(restoreCategory.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const { setCategory, setCategoryById } = category.actions
