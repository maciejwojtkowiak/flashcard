import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flashcard } from '../shared/types';

const initial = {
  listOfFlashCards: [] as Flashcard[],
};

const listSlice = createSlice({
  name: 'listSlice',
  initialState: initial,
  reducers: {
    addFlashCardToList(state, action: PayloadAction<Flashcard>) {
      state.listOfFlashCards.push(action.payload);
    },
    setFetchedItems(state, action) {
      state.listOfFlashCards = action.payload;
    },
  },
});

export const listAction = listSlice.actions;
export const listReducer = listSlice.reducer;
