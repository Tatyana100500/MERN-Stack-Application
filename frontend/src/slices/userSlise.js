import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUserId: null,
	isLogin: false,
  },
  reducers: {
    setCurrentUserId: (state, { payload }) => {

	  state.currentUserId = payload;
	},
	setisLogin: (state, { payload }) => {
	  console.log('after', state.isLogin)
	  state.isLogin = payload;
	  console.log('befor', state.isLogin)
	},
  },
});

export const {
	setCurrentUserId,
	setisLogin,
} = userSlice.actions;

export default userSlice.reducer;