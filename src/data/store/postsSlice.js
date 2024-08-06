import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  homePosts: [],
  selectedPost: {},
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setHomePosts: (state, action) => {
      state.homePosts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
})

export const {setHomePosts, setSelectedPost} = postsSlice.actions;
export default postsSlice