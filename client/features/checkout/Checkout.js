import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { Stack } from "@mui/material";
import CheckoutCard from "./CheckoutCard";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutReview from "./CheckoutReview";

import { selectCart, emptyCart } from "../cart/cartSlice.js";
import { placeOrderInDBAsync } from "../cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  function goToProductOnClick(productId) {
    navigate(`/products/${productId}/`);
  }
  const itemsInCheckout = cart.quantity;
  const orderId = cart.orderId;

  const placeOrder = async (orderId) => {
    await dispatch(placeOrderInDBAsync(orderId));
    dispatch(emptyCart());
  };

  const [addresses, setAddresses] = useState([]);
  const [name, setName] = useState("");

  const [payment, setPayment] = useState([]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        component="div"
        variant="h6"
        sx={{ fontWeight: "bold" }}
        align="center"
      >
        {`CHECKOUT (${itemsInCheckout})`}
      </Typography>

      <Grid container spacing={3} columns={2}>
        <Grid item xs={2} sm={2} md={1}>
          <CheckoutCard
            orderId={orderId}
            placeOrder={placeOrder}
            addresses={addresses}
            setAddresses={setAddresses}
            name={name}
            setName={setName}
            payment={payment}
            setPayment={setPayment}
          />
        </Grid>

        <Grid item xs={2} sm={2} md={1}>
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
