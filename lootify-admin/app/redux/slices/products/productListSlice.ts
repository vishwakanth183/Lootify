import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Item {
  id: number;
  name: string;
  price: number;
  offer: any;
  imageUrl: string;
}

interface ItemsState {
  loading: Boolean;
  items: Item[];
}

const initialState: ItemsState = {
  loading: true,
  items: [],
};

export const getProductList = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get("https://jsonplaceholder.org/users");
  console.log("Response", response);
  return response.data;
});

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProductList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = productListSlice.actions;
export type productListSliceState = ReturnType<typeof productListSlice.reducer>;

export default productListSlice.reducer;
