import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    userInfo:null,
    error:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) =>{
        state.loading = true;
        state.error = null;
    },
    loginSuccess: (state, action) =>{
        state.loading = false;
        state.userInfo = action.payload;
    },
    loginFail: (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {loginStart, loginSuccess, loginFail} = userSlice.actions

export default userSlice.reducer