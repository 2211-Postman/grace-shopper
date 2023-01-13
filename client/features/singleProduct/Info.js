import React from "react";
import { Grid, Typography, Divider, Button, Box } from "@material-ui/core";
import { usdFormatter } from "../../helpers";
import { addToCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";

const Info = ({ product }) => {
  const { productName, description, brand, price } = product;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addToCart({ ...product }));
  };
  console.log(product, "PRODUCT");

  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Typography variant="subtitle1">{brand}</Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h4">{productName}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <Typography variant="h5">{`${usdFormatter.format(price)}`}</Typography>
      </Box>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{ marginTop: "auto" }}
      >
        Purchase
      </Button>
    </Grid>
  );
};

export default Info;
