import { createSlice } from "@reduxjs/toolkit";

const cartFromLocalStorage = JSON.parse(
  window.localStorage.getItem("cart") || '{"products": [],"quantity": 0}'
);

const cartSlice = createSlice({
  name: "cart",
  initialState: cartFromLocalStorage,
  reducers: {
    addToCart: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
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
