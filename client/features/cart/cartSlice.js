import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN } from "../auth/authSlice";

export const fetchUserCart = createAsyncThunk(
  "get user cart",
  async (userId) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get(`/api/orders/getCart/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        return data;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const addToUserCartDB = createAsyncThunk(
  "post user cart",
  async ({ userId, ...orderDetails }) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.post(
          `/api/orders/user/${userId}/${orderDetails.id}`,
          orderDetails,
          {
            headers: {
              authorization: token,
            },
          }
        );
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeFromCartDBAsync = createAsyncThunk(
  "delete user product from cart and DB",
  async (orderDetailsId) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      console.log("token in slice", token);
      if (token) {
        await axios.delete(`/api/orders/orderDetails/${orderDetailsId}`, {
          headers: {
            authorization: token,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const edtQtyInCartDBAsync = createAsyncThunk(
  "edit qty product from cart and DB",
  async ({ numberOfItems, orderDetailsId }) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        await axios.put(
          `/api/orders/orderDetails/${orderDetailsId}`,
          { numberOfItems },
          {
            headers: {
              authorization: token,
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const placeOrderInDBAsync = createAsyncThunk(
  "convert cart item to order history item",
  async (orderId) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        await axios.put(
          `/api/orders/${orderId}`,
          { purchased: true },
          {
            headers: {
              authorization: token,
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const cartFromLocalStorage = JSON.parse(
  window.localStorage.getItem("cart") ||
    '{"products": [],"quantity": 0, "orderId": null}'
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
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.orderId = action.payload.orderId;
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
