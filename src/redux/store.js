// store.js
import { configureStore } from '@reduxjs/toolkit'
import problemsReducer from './slices/problemsSlice';

export default configureStore({
  reducer: {
    problems: problemsReducer,
  },
});
