import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlise.js';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});