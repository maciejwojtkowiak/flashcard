import { configureStore } from "@reduxjs/toolkit";
import { listReducer } from "./list-slice";

const Store = configureStore({
  reducer: {
    listReducer: listReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;
