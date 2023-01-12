import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { Stack } from "@mui/material";

// import { selectCart, removeItemfromCart } from "./cartSlice";
import CartCard from "./CartCard";
import CartSummary from "./CartSummary";

function getSampleCart() {
  const cartObj = {
    productId: 1,
    numberOfItems: 1,
    totalPrice: 500,
    productName: "AIR JORDAN 1 RETRO HIGH OG CHICAGO",
    brand: " Air Jordan",
    size: 9,
    color: "WHITE/VARSITY RED-BLACK",
    imageURL:
      "https://img.stadiumgoods.com/14/28/63/00/14286300_42937338_2048.jpg",
  };
  return Array(3).fill(cartObj);
}

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const cart = useSelector(selectCart);
  const cart = getSampleCart();

  function checkoutOnClick() {
    navigate(`/checkout`);
  }

  function goToProductOnClick(productId) {
    navigate(`/products/${productId}/`);
  }

  function removeFromCartOnClick(productId) {
    // dispatch(removeItemFromCart(productId));
  }

  const itemsInCart = cart.length ? cart.length : 0;

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
        <Grid item xs={2} sm={1} md={1} key={cart.productId}>
          <Stack spacing={2}>
            {cart && cart.length
              ? cart.map((item) => (
                  <CartCard
                    item={item}
                    goToProductOnClick={goToProductOnClick}
                    removeFromCartOnClick={removeFromCartOnClick}
                  />
                ))
              : null}
          </Stack>
        </Grid>
        <Grid item xs={2} sm={1} md={1} key={cart.productId}>
          <CartSummary cart={cart} checkoutOnClick={checkoutOnClick} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
