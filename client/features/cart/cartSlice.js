import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserCart = createAsyncThunk(
  "get user cart",
  async (userId) => {
    try {
      const { data } = await axios.get(`./api/orders/getCart/${userId}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// export const addToUserCartDB = createAsyncThunk("post user cart", async(userId, productId) =>{
//   try {
//     const {data} = await axios.post(`./api/orders/user/${userId}/${productId}`);
//   }
// })

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
          product["totalPrice"] =
            product["numberOfItems"] * product["unitPrice"];
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
            product["totalPrice"] =
              product["numberOfItems"] * product["unitPrice"];
          }
          return product;
        });
      }
    },
    removeProductFromCart: (state, action) => {
      const id = action.payload;
      state = _removeProductFromCart(state, id);
    },
    emptyCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.products = action.payload;
      state.quantity = state.products.length;
    });
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
  emptyCart,
} = cartSlice.actions;
