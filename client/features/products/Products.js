import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { fetchAllProductsAsync, selectUniqueProducts } from "./productsSlice";
import ProductsCard from "./ProductsCard";

const Products = () => {
  const products = useSelector(selectUniqueProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProductsAsync());
    };
    fetchData();
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={3} columns={8}>
        {products && products.length
          ? products.map((product) => (
              <Grid item xs={8} sm={4} md={2} key={product.productId}>
                <ProductsCard product={product} />
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
};

export default Products;
