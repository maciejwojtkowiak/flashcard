import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  message: '',
};

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: initialState,
  reducers: {
    setNotification(
      state,
      action: PayloadAction<{ isShown: boolean; message: string }>
    ) {
      state.isShown = action.payload.isShown;
      state.message = action.payload.message;
    },
  },
});

export const notificationAction = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
