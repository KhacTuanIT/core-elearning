const { createAsyncThunk } = require('@reduxjs/toolkit')

export const fetchCategoryAsync = createAsyncThunk(
  'category/fetch',
  async () => {
    const res = await fetch('https://localhost:7066/category')
    return await res.json()
  },
)

export const getCategoryByIdAsync = createAsyncThunk(
  'category/getById',
  async (categoryId) => {
    const res = await fetch(`https://localhost:7066/category/${categoryId}`)
    return await res.json()
  },
)

export const createCategory = createAsyncThunk(
  'category/create',
  async (category) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(category),
    }
    const res = await fetch(
      `https://localhost:7066/category`,
      requestOptions,
    )
    return await res.json()
  },
)

export const updateCategory = createAsyncThunk(
  'category/update',
  async (category) => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify(category),
    }
    const res = await fetch(
      `https://localhost:7066/category/${category.id}`,
      requestOptions,
    )
    return await res.json()
  },
)

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (categoryId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
    }
    const res = await fetch(
      `https://localhost:7066/category/${categoryId}`,
      requestOptions,
    )
    return await res.json()
  },
)

export const restoreCategory = createAsyncThunk(
  'category/restore',
  async (categoryId) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
    }
    const res = await fetch(
      `https://localhost:7066/category/restore/${categoryId}`,
      requestOptions,
    )
    return await res.json()
  },
)
