// counterSlice.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// menuInterface
interface menuInterface {
  mainMenuIndex: number | undefined | null;
  subMenuIndex: number | undefined | null;
}

// Define the type for our counter state
export type commmonSliceInterfece = {
  mainMenuIndex: number | undefined | null;
  subMenuIndex: number | undefined | null;
};

const initialState: commmonSliceInterfece = {
  mainMenuIndex: 0,
  subMenuIndex: undefined,
};

// Create the slice with reducers and actions
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    // Increment the counter
    changeSelectedMenu: (state, action: PayloadAction<menuInterface>) => {
      state.mainMenuIndex = action.payload.mainMenuIndex;
      state.subMenuIndex = action.payload.subMenuIndex;
    },
  },
});

// Extract and export actions
export const { changeSelectedMenu } = commonSlice.actions;
export type commonSliceState = ReturnType<typeof commonSlice.reducer>;

// Export the reducer for use in the store
export default commonSlice.reducer;
