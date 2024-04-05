"use client";

import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/common/common";

export type RootState = ReturnType<typeof store.getState>; // Define root state type
export type AppDispatch = typeof store.dispatch; // App dispatch type

export const store = configureStore({
  reducer: {
    // Import your reducers
    commonSlice: commonSlice,
  },
});
