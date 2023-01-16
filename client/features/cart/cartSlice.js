import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartFromLocalStorage = JSON.parse(
  window.localStorage.getItem("cart") || '{"products": [],"quantity": 0}'
);

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

const fetchUserCart = createAsyncThunk("user cart", async ({ userId }) => {
  const { data } = await axios.get(`./api/users/${userId}`);
});

const createOrderAsync = createAsyncThunk(
  "create order from cart",
  async ({ userId }) => {
    const { data } = await axios.post("./api/orders", { userId });
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: cartFromLocalStorage,
  reducers: {
    addToCart: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
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
