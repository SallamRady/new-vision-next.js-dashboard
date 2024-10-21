import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axiosInstance from '@/libs/axiosConfig'

interface LookUpsSliceType {
  data: any[]
  loading: boolean
  error: string | null
}

const initialState: LookUpsSliceType = {
  data: [],
  loading: false,
  error: null
}

export const fetchLookups = createAsyncThunk('lookups/fetchLookups', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/lookups') // Adjust the URL as needed

    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Failed to fetch lookup data')
  }
})

export const lookupSlice = createSlice({
  name: 'lookups',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLookups.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLookups.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchLookups.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

// Export the reducer
export default lookupSlice.reducer
