import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { Stack } from "@mui/material";

import {
  selectCart,
  removeProductFromCart,
  removeFromCartDBAsync,
} from "./cartSlice";
import CartCard from "./CartCard";
import CartSummary from "./CartSummary";

import {
  fetchAllProductsAsync,
  selectUniqueProducts,
} from "../products/productsSlice";
import { editQuantityInCart } from "../cart/cartSlice";

const getStockCounts = (products) => {
  const stockCounts = {};
  products.map((x) => {
    stockCounts[x.id] = x.stockCount;
  });
  return stockCounts;
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  function checkoutOnClick() {
    navigate(`/checkout`);
  }

  function goToProductOnClick(productId) {
    navigate(`/products/${productId}/`);
  }

  function removeFromCartOnClick(productId, orderDetailsId) {
    dispatch(removeProductFromCart(productId));
    dispatch(removeFromCartDBAsync(orderDetailsId));
  }

  function changeSizeOnClick(productId) {
    console.log("Change Size TODO");
  }

  function changeQtyOnClick(value, id) {
    const numberOfItems = Number(value);
    dispatch(editQuantityInCart({ numberOfItems, id }));
  }

  const itemsInCart = cart.quantity;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProductsAsync());
    };
    fetchData();
  }, [dispatch]);
  const products = useSelector(selectUniqueProducts);
  const stockCounts = getStockCounts(products);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <Typography
        component="div"
        sx={{ fontWeight: "bold" }}
        variant="h5"
        align="center"
      >
        {`Shopping Cart (${itemsInCart})`}
      </Typography>
      <Grid container spacing={3} columns={2}>
        <Grid item xs={2} sm={2} md={1}>
          <Stack spacing={2}>
            {cart && cart.products && cart.products.length
              ? cart.products.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    stockCount={stockCounts[item.id]}
                    goToProductOnClick={goToProductOnClick}
                    removeFromCartOnClick={removeFromCartOnClick}
                    changeSizeOnClick={changeSizeOnClick}
                    changeQtyOnClick={changeQtyOnClick}
                  />
                ))
              : null}
          </Stack>
        </Grid>
        <Grid item xs={2} sm={2} md={1}>
          <CartSummary cart={cart} checkoutOnClick={checkoutOnClick} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
