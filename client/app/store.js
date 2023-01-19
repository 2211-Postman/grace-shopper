import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import usersReducer from "../features/users/usersSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import { cartReducer } from "../features/cart/cartSlice";
import historyReducer from "../features/orderHistory/orderHistorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    users: usersReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
