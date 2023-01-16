import { createSlice } from "@reduxjs/toolkit";

const checkoutFromLocalStorage = JSON.parse(
  window.localStorage.getItem("Checkout") || '{"products": [],"quantity": 0}'
);

const _removeProductFromCheckout = (state, id) => {
  state.products = state.products.filter((product) => {
    if (product.id !== id) {
      state.quantity -= 1;
      return true;
    } else false;
  });
  return state;
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: checkoutFromLocalStorage,
  reducers: {
    addToCheckout: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
    },
    addQuantityToCheckout: (state, action) => {
      const id = action.payload.id;
      const numberOfItems = action.payload.numberOfItems;
      state.products = state.products.map((product) => {
        if (product.id === id) {
          product["numberOfItems"] += numberOfItems;
        }
        return product;
      });
    },
    editQuantityInCheckout: (state, action) => {
      const id = action.payload.id;
      const numberOfItems = action.payload.numberOfItems;
      if (numberOfItems === 0) {
        state = _removeProductFromCheckout(state, id);
      } else {
        state.products = state.products.map((product) => {
          if (product.id === id) {
            product["numberOfItems"] = numberOfItems;
          }
          return product;
        });
      }
    },
    removeProductFromCheckout: (state, action) => {
      const id = action.payload;
      state = _removeProductFromCheckout(state, id);
    },
  },
});

export const selectCheckout = (state) => {
  return state.checkout;
};

export const checkoutReducer = checkoutSlice.reducer;
export const {
  addToCheckout,
  addQuantityToCheckout,
  editQuantityInCheckout,
  removeProductFromCheckout,
} = checkoutSlice.actions;
