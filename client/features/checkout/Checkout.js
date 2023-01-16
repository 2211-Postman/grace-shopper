import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { Stack } from "@mui/material";

// import { selectCheckout, removeItemfromCheckout } from "./checkoutSlice";
import CheckoutCard from "./CheckoutCard";
import CheckoutSummary from "./CheckoutSummary";

function getSampleCheckout() {
  const checkoutObj = {
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
  return Array(3).fill(checkoutObj);
}

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const checkout = useSelector(selectCheckout);
  const checkout = getSampleCheckout();

  function goToProductOnClick(productId) {
    navigate(`/products/${productId}/`);
  }

  function removeFromCheckoutOnClick(productId) {
    // dispatch(removeItemFromCheckout(productId));
  }

  const itemsInCheckout = checkout.length ? checkout.length : 0;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        component="div"
        variant="h5"
        sx={{ fontWeight: "bold" }}
        align="center"
      >
        {`CHECKOUT (${itemsInCheckout})`}
      </Typography>

      <Grid container spacing={3} columns={2}>
        <Grid item xs={2} sm={1} md={1} key={checkout.productId}>
          <CheckoutCard />
        </Grid>

        <Grid item xs={2} sm={1} md={1} key={checkout.productId}>
          <CheckoutSummary
            goToProductOnClick={goToProductOnClick}
            checkout={checkout}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
