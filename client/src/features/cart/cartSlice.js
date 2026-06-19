import {
  createSlice,
} from "@reduxjs/toolkit";
const initialState = {
  cartItems:
    JSON.parse(
      localStorage.getItem("cartItems")
    ) || [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action
    ) => {
      const existingProduct =
        state.cartItems.find(
          (item) =>
            item._id ===
            action.payload._id
        );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.cartItems
        )
      );
    },
    decreaseQuantity: (
      state,
      action
    ) => {
      const existingProduct =
        state.cartItems.find(
          (item) =>
            item._id === action.payload
        );
      if (
        existingProduct &&
        existingProduct.quantity > 1
      ) {
        existingProduct.quantity -= 1;
      } else {
        
        state.cartItems =
          state.cartItems.filter(
            (item) =>
              item._id !==
              action.payload
          );
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.cartItems
        )
      );
    },
    removeFromCart: (
      state,
      action
    ) => {
      state.cartItems =
        state.cartItems.filter(
          (item) =>
            item._id !== action.payload
        );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.cartItems
        )
      );
    },
  },
});
export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;


export default
  cartSlice.reducer;