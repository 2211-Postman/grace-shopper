import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
// import { selectProducts } from "productsSlice";

import ProductsCard from "./ProductsCard";

/////////////
// Temporary sample data until data flows thru
function getSampleProducts() {
  const sampleProduct = {
    productId: null,
    productName: "AIR JORDAN 7 RETRO 'BLACK OLIVE'",
    brand: "Air Jordan",
    imageUrl: "https://cdn.flightclub.com/2600/TEMPLATE/347629/1.jpg",
  };
  let products = Array(8)
    .fill(sampleProduct)
    .map((x, i) => {
      x.productId = i + 1;
      return x;
    });
  return products;
}
////////////

const Products = () => {
  const navigate = useNavigate();
  const products = getSampleProducts();
  // const products = useSelector(selectProducts);

  function onClick(id) {
    navigate(`/products/${id}/`);
  }

  return (
    <Container>
      <Grid container spacing={3} columns={8}>
        {products && products.length
          ? products.map((product) => (
              <Grid item xs={8} sm={4} md={2} key={product.productId}>
                <ProductsCard product={product} onClick={onClick} />
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
};

export default Products;
