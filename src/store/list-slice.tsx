import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initial = {
  listOfCards: [] as string[],
};

const listSlice = createSlice({
  name: "listSlice",
  initialState: initial,
  reducers: {
    addNameToList(state, action) {
      state.listOfCards.push(action.payload);
    },
    setFetchedItems(state, action) {
      state.listOfCards = action.payload;
    },
  },
});

export const listAction = listSlice.actions;
export const listReducer = listSlice.reducer;
