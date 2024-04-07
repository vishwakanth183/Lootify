import { variantCombinationDetails } from "@/src/components/orders/manualOrder/productModal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface selectedCustomerAction {
    id: number;
    customerName: string;
    mobileNumber: string;
    email: string;
    customerAddresses: {
        id: number,
        addressLine1: string,
        addressLine2: string,
        isDefault: boolean,
        city: string,
        state: string,
        country: string,
        zipCode: string,
        mobileNumber: string,
        landmark: string,
        addressType: string,
    }[]
}

interface productItem {
    id: number;
    productName: String;
    isVariants: boolean;
    salesPrice: number;
    mrpPrice: number;
    stock: number;
    variantId: number;
    quantity: number,
    variantCombinationDetails: variantCombinationDetails;
}

interface manualOrder {
    activeStepper: number,
    selectedCustomer: selectedCustomerAction | null,
    cartProducts: productItem[]
}

const manualOrderState: manualOrder = {
    activeStepper: 0,
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
        addToCartProducts: (state, action: PayloadAction<productItem>) => {
            let newCartData = state.cartProducts;
            newCartData.push(action.payload);
            state.cartProducts = newCartData;
            // state.cartProducts = [...state.cartProducts,...[action.payload.productDetails]];
        },

        // set selected products
        updateCartProducts: (state, action: PayloadAction<any>) => {
            // state.cartProducts = action.payload.productDetails;
            state.cartProducts = action.payload;
        },

        // function to change stepper position
        updateStepper: (state, action: PayloadAction<{ index: any }>) => {
            state.activeStepper = action.payload.index;
        },

        // resetManualOrder
        resetManualOrder: (state, action: PayloadAction<{}>) => {
            state.activeStepper = 0;
            state.cartProducts = [];
            state.selectedCustomer = null
        }
    }
})

// Extract and export actions
export const { setCustomerDetails, addToCartProducts, updateCartProducts, updateStepper , resetManualOrder } = manualOrderSlice.actions;
export type manualOrderSliceState = ReturnType<typeof manualOrderSlice.reducer>;

// Export the reducer for use in the store
export default manualOrderSlice.reducer;