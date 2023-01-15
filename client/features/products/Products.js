import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container, Button } from "@mui/material";
import { fetchAllProductsAsync, selectUniqueProducts } from "./productsSlice";
import ProductsCard from "./ProductsCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProductAsync } from "./productsSlice";
import CreateProduct from "./CreateProduct";

const Products = () => {
  const navigate = useNavigate();
  const products = useSelector(selectUniqueProducts);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProductsAsync());
    };
    fetchData();
  }, [dispatch]);

  function onClick(id) {
    navigate(`/products/${id}/`);
  }

  const handleDelete = (id) => {
    return async () => {
      await dispatch(deleteProductAsync(id));
    };
  };

  return (
    <Container>
      <Grid container spacing={2} columns={8}>
        {products && products.length
          ? products.map((product) => (
              <Grid item xs={8} sm={4} md={2} key={product.id}>
                <ProductsCard
                  product={product}
                  onClick={onClick}
                  isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))
          : null}

        {isLoggedIn && isAdmin ? <CreateProduct /> : null}
      </Grid>
    </Container>
  );
};

export default Products;
