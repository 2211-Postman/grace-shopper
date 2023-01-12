import React from "react";
import { Grid, Typography, Divider, Button, Box } from "@material-ui/core";
import { usdFormatter } from "../../helpers";

const Info = ({ product }) => {
  const { productName, description, brand, price } = product;

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
      <Button variant="contained" color="primary" style={{ marginTop: "auto" }}>
        Purchase
      </Button>
    </Grid>
  );
};

export default Info;
