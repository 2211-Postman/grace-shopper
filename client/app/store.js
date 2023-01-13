import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import { cartReducer } from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
