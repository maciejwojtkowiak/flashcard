import { configureStore } from '@reduxjs/toolkit';
import { listReducer } from './list-slice';
import { notificationReducer } from './notification-slice';

const Store = configureStore({
  reducer: {
    listSlice: listReducer,
    notificationSlice: notificationReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;
