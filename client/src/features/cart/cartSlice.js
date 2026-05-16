import {
  createSlice,
} from "@reduxjs/toolkit";


const initialState = {

  cartItems: [],

};


const cartSlice =
  createSlice({

    name: "cart",

    initialState,

    reducers: {

      setCartItems:
        (state, action) => {

          state.cartItems =
            action.payload;

      },

      clearCart:
        (state) => {

          state.cartItems = [];

      },

    },

});


export const {

  setCartItems,
  clearCart,

} = cartSlice.actions;


export default
cartSlice.reducer;