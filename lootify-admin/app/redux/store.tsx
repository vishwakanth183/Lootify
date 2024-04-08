"use client";

import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/common/common";
import manualOrderSlice from "./slices/order/manualOrder";
import addEditProductSlice from "./slices/product/addEditProductSlice";

export type RootState = ReturnType<typeof store.getState>; // Define root state type
export type AppDispatch = typeof store.dispatch; // App dispatch type

export const store = configureStore({
  reducer: {
    // Import your reducers
    commonSlice: commonSlice,
    manualOrderSlice: manualOrderSlice,
    addEditProductSlice: addEditProductSlice,
  },
});
