import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import { fetchAllProductsAsync, selectUniqueProducts } from "./productsSlice";
import ProductsCard from "./ProductsCard";

const Products = () => {
  const navigate = useNavigate();
  const products = useSelector(selectUniqueProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProductsAsync());
    };
    fetchData();
  }, [dispatch]);

  function onClick(id) {
    navigate(`/products/${id}/`);
  }
  return (
    <Container>
      <Grid container spacing={3} columns={8}>
        {products && products.length
          ? products.map((product) => (
              <Grid item xs={8} sm={4} md={2} key={product.id}>
                <ProductsCard product={product} onClick={onClick} />
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
};

export default Products;
