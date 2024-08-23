import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.ids = action.payload;
    },
    addFriend: (state, action) => {
      state.ids.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload), 1);
    }
  },
})

export const {setFriends, addFriend, removeFriend} = friendsSlice.actions;
export default friendsSlice