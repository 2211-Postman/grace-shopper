import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { Stack } from "@mui/material";

import { selectCart, removeProductFromCart } from "./cartSlice";
import CartCard from "./CartCard";
import CartSummary from "./CartSummary";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  useEffect(() => {}, [cart]);

  function checkoutOnClick() {
    navigate(`/checkout`);
  }

  function goToProductOnClick(productId) {
    navigate(`/products/${productId}/`);
  }

  function removeFromCartOnClick(productId) {
    dispatch(removeProductFromCart(productId));
  }

  const itemsInCart = cart.quantity;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="div" variant="p" align="center">
        {`Shopping Cart (${itemsInCart})`}
      </Typography>
      <Grid container spacing={3} columns={2}>
        <Grid item xs={2} sm={1} md={1}>
          <Stack spacing={2}>
            {cart && cart.products && cart.products.length
              ? cart.products.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    goToProductOnClick={goToProductOnClick}
                    removeFromCartOnClick={removeFromCartOnClick}
                  />
                ))
              : null}
          </Stack>
        </Grid>
        <Grid item xs={2} sm={1} md={1}>
          <CartSummary cart={cart} checkoutOnClick={checkoutOnClick} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
