import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productInCart = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (productInCart) {
        productInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const product = state.cart.find(
        (product) => product.id === action.payload
      );
      product.quantity++;
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find(
        (product) => product.id === action.payload
      );
      if (product.quantity === 1) {
        product.quantity = 1;
      } else {
        product.quantity--;
      }
    },
    removeproduct: (state, action) => {
      const removeproduct = state.cart.filter(
        (product) => product.id !== action.payload
      );
      state.cart = removeproduct;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeproduct,
} = cartSlice.actions;
