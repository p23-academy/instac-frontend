import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  ids: [],
}

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setSuggestions: (state, action) => {
      state.ids = action.payload;
    },
    removeSuggestion: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload), 1);
    }
  },
})

export const {setSuggestions, removeSuggestion} = suggestionsSlice.actions;
export default suggestionsSlice