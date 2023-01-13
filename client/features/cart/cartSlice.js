import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      // state.total += action.payload.price * action.payload.quantity;
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const selectCart = (state) => {
  return state.cart;
};

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeProduct } = cartSlice.actions;
