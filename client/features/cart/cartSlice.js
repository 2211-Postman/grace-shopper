import { createSlice } from "@reduxjs/toolkit";

const _removeProductFromCart = (state, id) => {
  state.products = state.products.filter((product) => {
    if (product.id !== id) {
      return true;
    } else {
      state.quantity -= 1;
      return false;
    }
  });
  return state;
};

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
    addQuantityToCart: (state, action) => {
      const id = action.payload.id;
      const numberOfItems = action.payload.numberOfItems;
      state.products = state.products.map((product) => {
        if (product.id === id) {
          product["numberOfItems"] += numberOfItems;
        }
        return product;
      });
    },
    editQuantityInCart: (state, action) => {
      const id = action.payload.id;
      const numberOfItems = action.payload.numberOfItems;
      if (numberOfItems === 0) {
        state = _removeProductFromCart(state, id);
      } else {
        state.products = state.products.map((product) => {
          if (product.id === id) {
            product["numberOfItems"] = numberOfItems;
          }
          return product;
        });
      }
    },
    removeProductFromCart: (state, action) => {
      const id = action.payload;
      state = _removeProductFromCart(state, id);
    },
  },
});

export const selectCart = (state) => {
  return state.cart;
};

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  addQuantityToCart,
  editQuantityInCart,
  removeProductFromCart,
} = cartSlice.actions;
