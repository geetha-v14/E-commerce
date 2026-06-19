import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {},
  paymentMethod: "cod",
};

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {

    saveShippingAddress: (
      state,
      action
    ) => {

      state.shippingAddress =
        action.payload;

    },

    savePaymentMethod: (
      state,
      action
    ) => {

      state.paymentMethod =
        action.payload;

    },

  },

});

export const {
  saveShippingAddress,
  savePaymentMethod,
} = orderSlice.actions;

export default orderSlice.reducer;