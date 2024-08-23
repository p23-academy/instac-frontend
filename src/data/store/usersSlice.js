import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

const usersAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `user.id`
  selectId: (user) => user.id,
  // Keep the "all IDs" array sorted based on user titles
  sortComparer: (a, b) => a.username.localeCompare(b.username),
})

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addUsers: usersAdapter.addMany,
    addUser: usersAdapter.addOne,
    setUser: usersAdapter.setOne,
  },
})

export const {addUsers, addUser, setUser} = usersSlice.actions;

export const usersSelector = usersAdapter.getSelectors((state) => state.users)

export default usersSlice