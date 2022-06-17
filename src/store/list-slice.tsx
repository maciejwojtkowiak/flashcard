import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initial = {
  listOfCards: [] as string[],
};

const listSlice = createSlice({
  name: "listSlice",
  initialState: initial,
  reducers: {
    addNameToList(state, action: PayloadAction<string>) {
      state.listOfCards.push(action.payload);
    },
  },
});

export const listAction = listSlice.actions;
export const listReducer = listSlice.reducer;
