import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProblems = createAsyncThunk(
  'problems/fetchProblems',
  async () => {
    const response = await axios.get('https://kep.uz/api/problems');
    // console.log(response.data);
    return response.data;
    
  }
  
);


const problemsSlice = createSlice({
  name: 'problems',
  initialState: {
    problems: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.problems = action.payload;
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default problemsSlice.reducer;
