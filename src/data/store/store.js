import {configureStore} from '@reduxjs/toolkit'

import authSlice from "./authSlice.js";
import postsSlice from "./postsSlice.js";
import usersSlice from "./usersSlice.js";
import friendsSlice from "./friendsSlice.js";
import suggestionsSlice from "./suggestionsSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
    friends: friendsSlice.reducer,
    suggestions: suggestionsSlice.reducer,
  }
})

export default store