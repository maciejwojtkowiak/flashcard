import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlashCard } from "../../shared/types";

const initial = {
  listOfFlashCards: [] as FlashCard[],
};

const listSlice = createSlice({
  name: "listSlice",
  initialState: initial,
  reducers: {
    addFlashCardToList(state, action: PayloadAction<FlashCard>) {
      state.listOfFlashCards.push(action.payload);
    },
    setFetchedItems(state, action) {
      state.listOfFlashCards = action.payload;
    },
  },
});

export const listAction = listSlice.actions;
export const listReducer = listSlice.reducer;
