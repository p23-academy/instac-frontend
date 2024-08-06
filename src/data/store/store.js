import {configureStore} from '@reduxjs/toolkit'

import authSlice from "./authSlice.js";
import postsSlice from "./postsSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
  }
})

export default store