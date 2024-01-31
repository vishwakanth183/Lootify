// counterSlice.tsx

import { getMenuIndexBasedonRoute } from "@/src/components/drawer/accordionMenuList/menuList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// menuInterface
interface menuInterface {
  path: String;
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
    changeSelectedMenu: (state, action: PayloadAction<commmonSliceInterfece>) => {
      state.mainMenuIndex = action.payload.mainMenuIndex;
      state.subMenuIndex = action.payload.subMenuIndex;
    },
    // While going to a route directly instead of navigating from drawer this function need to be called
    routeMenuCheck: (state, action: PayloadAction<menuInterface>) => {
      const wholePath = action.payload.path;
      const pathArray = wholePath.split("/");
      let targetPathName = "drawermenu";
      let targetIndex = pathArray.indexOf(targetPathName);
      // console.log("Patharray", pathArray, targetIndex);
      if (targetIndex != -1) {
        let targetPathArray = pathArray.slice(targetIndex + 1);
        let routeMenuName = targetPathArray[0];
        let routeSubMenuName;
        if (targetPathArray.length > 1) routeSubMenuName = targetPathArray[1];

        // console.log("routeMenuName ,routeMenuName", routeMenuName, routeSubMenuName);

        const { mainMenuIndex, subMenuIndex } = getMenuIndexBasedonRoute({ routeMenuName: routeMenuName, routeSubMenuName: routeSubMenuName });
        state.mainMenuIndex = mainMenuIndex;
        state.subMenuIndex = subMenuIndex;
      }
    },
  },
});

// Extract and export actions
export const { changeSelectedMenu, routeMenuCheck } = commonSlice.actions;
export type commonSliceState = ReturnType<typeof commonSlice.reducer>;

// Export the reducer for use in the store
export default commonSlice.reducer;
