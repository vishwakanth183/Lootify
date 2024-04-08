import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { variantCombinationDetails } from "@/src/components/products/addEditProduct/addEditProduct";
import { optionItem } from "@/src/components/products/options/optionsList/optionsListComponent";

const addEditProductState: { selectedOptions: optionItem[]; selectedVariantCombinations: variantCombinationDetails[] } = {
  selectedOptions: [],
  selectedVariantCombinations: [],
};

export const addEditProductSlice = createSlice({
  name: "addEditProduct",
  initialState: addEditProductState,
  reducers: {
    // function to change selected options
    changeSelectedOption: (state, action: PayloadAction<optionItem>) => {
      let newOptionItem = action.payload;
      let removedItem = state.selectedOptions.find(item => item.id == newOptionItem.id);
      // console.log("removedItem", removedItem);
      if (removedItem) {
        let removeOptionValueds = removedItem.optionValues.map(item => item.id);
        let filteredSelecteCombination = state.selectedVariantCombinations.filter(combination => !combination.optionValueIds.find(valueId => removeOptionValueds.includes(valueId)));
        state.selectedOptions = state.selectedOptions.filter(item => item.id != newOptionItem.id);
        state.selectedVariantCombinations = filteredSelecteCombination;
      } else {
        state.selectedVariantCombinations = [];
        state.selectedOptions = [...state.selectedOptions, ...[newOptionItem]];
      }
    },
    // function to change selected combination
    changeSelectedCombination: (state, action: PayloadAction<variantCombinationDetails>) => {
      let newVariantCombination = action.payload;
      let removedItem = state.selectedVariantCombinations.find(item => JSON.stringify(item.optionValueIds) == JSON.stringify(newVariantCombination.optionValueIds));
      console.log("removedItem",removedItem?.combinationName)
      if (removedItem) {
        state.selectedVariantCombinations = state.selectedVariantCombinations.filter(item => JSON.stringify(item.optionValueIds) != JSON.stringify(newVariantCombination.optionValueIds));
      } else {
        state.selectedVariantCombinations = [...state.selectedVariantCombinations, ...[newVariantCombination]];
      }
    },

    // reset product slice
    resetProductSlice : (state)=>{
      state.selectedOptions=[];
      state.selectedVariantCombinations=[]
    }
  },
});

// Extract and export actions
export const { changeSelectedOption, changeSelectedCombination , resetProductSlice } = addEditProductSlice.actions;
export type addEditProductSliceState = ReturnType<typeof addEditProductSlice.reducer>;

// Export the reducer for use in the store
export default addEditProductSlice.reducer;
