import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider, Button, Box } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { dollar } from "../../helpers";
import { addToCart, addQuantityToCart } from "../cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectCart } from "../cart/cartSlice";

const getQtyInCart = (id, cart) => {
  const products = cart.products.filter((x) => x.id === id);
  if (products.length === 0) return 0;
  else if (products.length === 1) return products[0].numberOfItems;
};

const getErrMsg = (stockCount, qtyInCart) => {
  const isAre = stockCount === 1 ? "is" : "are";
  let errMsg = `There ${isAre} only ${stockCount} unit(s) of this sneaker left in stock`;
  if (qtyInCart) {
    errMsg = `You have ${qtyInCart} unit(s) in your cart. ` + errMsg;
  }
  return errMsg;
};

const Info = ({ product }) => {
  const { id, productName, description, brand, price, stockCount } = product;
  const dispatch = useDispatch();

  const [size, setSize] = useState(product.size);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [qtyInCart, setQtyInCart] = useState(null);
  const [error, setError] = useState(null);

  const cart = useSelector(selectCart);

  useEffect(() => {
    const qty = getQtyInCart(id, cart);
    setQtyInCart(qty);
    const isValid = qty < stockCount;
    if (isValid) setError(null);
    else {
      setError(getErrMsg(stockCount, qty));
    }
  }, [cart, id]);

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChangeQty = (event) => {
    const value = Number(event.target.value);
    const total = value + qtyInCart;
    const isValid = (total <= stockCount) & (value > 0);
    if (isValid) setError(null);
    else setError(getErrMsg(stockCount, qtyInCart));
    setNumberOfItems(value);
  };

  const handlePurchaseClick = () => {
    if (qtyInCart) {
      dispatch(addQuantityToCart({ id, numberOfItems }));
    } else {
      const orderDetails = {};
      orderDetails["id"] = product["id"];
      orderDetails["productName"] = product["productName"];
      orderDetails["color"] = product["color"];
      orderDetails["brand"] = product["brand"];
      orderDetails["size"] = size;
      orderDetails["imageURL"] = product["imageURL"];
      orderDetails["numberOfItems"] = numberOfItems;
      orderDetails["unitPrice"] = product["price"];
      orderDetails["totalPrice"] = numberOfItems * product["price"];
      dispatch(addToCart({ ...orderDetails }));
    }
  };

  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Typography variant="subtitle1">{brand}</Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h4">{productName}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <br />
        <Typography variant="h5">{`${dollar(price)}`}</Typography>
        <br />
      </Box>

      <br />
      <FormControl fullWidth>
        <InputLabel id="size">Size</InputLabel>
        <Select
          labelId="size"
          value={size}
          label="Size"
          onChange={handleChangeSize}
        >
          <MenuItem value={size}>{size}</MenuItem>
        </Select>
      </FormControl>

      <br />

      <TextField
        error={error ? true : false}
        helperText={error}
        label={`Quantity (in-stock: ${stockCount})`}
        value={numberOfItems}
        variant="outlined"
        onChange={(e) => handleChangeQty(e)}
      />
      <br />
      <Button
        onClick={handlePurchaseClick}
        variant="contained"
        color="primary"
        style={{ marginTop: "auto" }}
        disabled={error ? true : false}
      >
        ADD TO CART
      </Button>
    </Grid>
  );
};

export default Info;
