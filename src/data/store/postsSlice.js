import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

const postsAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `post.id`
  selectId: (post) => post.id,
  // Keep the "all IDs" array sorted based on post titles
  sortComparer: (a, b) => a.date.toDate() < b.date.toDate() ? 1 : -1,
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    setPost: postsAdapter.setOne,
    setPosts: postsAdapter.setMany,
    clearPosts: postsAdapter.removeAll,
  },
})

export const {setPost, setPosts, clearPosts} = postsSlice.actions;

export const postsSelector = postsAdapter.getSelectors((state) => state.posts)

export default postsSlice