import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { Stack } from "@mui/material";
import CheckoutCard from "./CheckoutCard";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutReview from "./CheckoutReview";

import { selectCart } from "../cart/cartSlice.js";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  function goToProductOnClick(productId) {
    navigate(`/products/${productId}/`);
  }
  const itemsInCheckout = cart.quantity;

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
        <Grid item xs={2} sm={1} md={1}>
          <CheckoutCard />
        </Grid>

        <Grid item xs={2} sm={1} md={1}>
          <CheckoutReview cart={cart} />
          <Stack>
            {cart && cart.products && cart.products.length
              ? cart.products.map((item) => (
                  <CheckoutSummary
                    key={item.id}
                    item={item}
                    goToProductOnClick={goToProductOnClick}
                  />
                ))
              : null}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
