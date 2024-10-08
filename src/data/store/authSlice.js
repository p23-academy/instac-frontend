import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },
})

export const {setLoggedInUser} = authSlice.actions;
export default authSlice