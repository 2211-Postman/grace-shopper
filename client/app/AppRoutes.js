import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Container } from "@mui/material";

import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import Products from "../features/products/Products";
import Users from "../features/users/Users";
import Cart from "../features/cart/Cart";
import Checkout from "../features/checkout/Checkout";
import { me } from "./store";
import SingleProduct from "../features/singleProduct/SingleProduct";
import {
  selectCart,
  fetchUserCart,
  addToUserCartDB,
} from "../features/cart/cartSlice";
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const currentUserId = useSelector((state) => state.auth.me.id);

  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      if (currentUserId) {
        // create or load user cart
        await dispatch(fetchUserCart(currentUserId));
        // add any guest cart items to the db
        cartState.products.map(async (item) => {
          const _item = { ...item };
          _item["userId"] = currentUserId;
          await dispatch(addToUserCartDB(_item));
        });

        // finally load user cart again with guest items included
        await dispatch(fetchUserCart(currentUserId));
      }
    };
    fetchCart();
  }, [dispatch, currentUserId, cartState]);

  const cartState = useSelector(selectCart);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <Container
      sx={{
        marginTop: "40px",
      }}
    >
      {isLoggedIn && isAdmin ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      ) : isLoggedIn && !isAdmin ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<Products />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      )}
    </Container>
  );
};

export default AppRoutes;
