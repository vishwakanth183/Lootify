import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface selectedCustomerAction {
    // customerDeatils: {
        customerName : string,
        mobileNumer : string,
        email : string,
        address : any
    // }
}

interface productItem {
    id: number;
    productName: String;
    isVariants: boolean;
    salesPrice: number;
    mrpPrice: number;
    stock: number;
    variantCombinationDetails: {
      "id": number,
      "combinationName": string,
      "isDefault": boolean | null,
      "salesPrice": number,
      "mrpPrice": number,
      "stock": number
    }[];
}

interface manualOrder {
    selectedCustomer : selectedCustomerAction | null,
    cartProducts : productItem[]
}

const manualOrderState : manualOrder  = {
    selectedCustomer: null,
    cartProducts: [],
}

export const manualOrderSlice = createSlice({
    name: "manualOrder",
    initialState: manualOrderState,
    reducers: {
        //set customer detail
        setCustomerDetails: (state, action: PayloadAction<selectedCustomerAction>) => {
            state.selectedCustomer = action.payload;
        },

        // add product to cart
        addToCartProducts : (state,action : PayloadAction<productItem>)=>{
            let newCartData = state.cartProducts;
            newCartData.push(action.payload);
            state.cartProducts = newCartData;
            // state.cartProducts = [...state.cartProducts,...[action.payload.productDetails]];
        },

        // set selected products
        updateCartProducts : (state,action : PayloadAction<productItem[]>)=>{
            // state.cartProducts = action.payload.productDetails;
            state.cartProducts = action.payload;
        },


    }
})

// Extract and export actions
export const {setCustomerDetails,addToCartProducts,updateCartProducts } = manualOrderSlice.actions;
export type manualOrderSliceState = ReturnType<typeof manualOrderSlice.reducer>;

// Export the reducer for use in the store
export default manualOrderSlice.reducer;