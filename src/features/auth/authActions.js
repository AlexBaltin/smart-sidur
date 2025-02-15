import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // here we are saving info about user
  error: null, // for errorss
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // saving user and deliting an error
    loginSuccess: (state, action) => {
      state.user = action.payload; 
      state.error = null; 
    },
    // saving an error
    loginFailure: (state, action) => {
      state.error = action.payload;
    },

    //clearing user and error
    logout: (state) => {
      state.user = null; 
      state.error = null; 
    }
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
