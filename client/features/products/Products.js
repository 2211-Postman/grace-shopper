import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import { fetchAllProductsAsync, selectUniqueProducts } from "./productsSlice";
import ProductsCard from "./ProductsCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProductAsync } from "./productsSlice";
import CreateProduct from "./CreateProduct";
import Typography from "@mui/material/Typography";

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
      {isLoggedIn && isAdmin ? (
        <Grid container spacing={2} columns={10}>
          <Grid item xs={10} sm={10} md={2}>
            <CreateProduct />
          </Grid>
          <Grid item xs={10} sm={10} md={8}>
            <Grid container spacing={2} columns={8}>
              {products && products.length ? (
                products.map((product) => (
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
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Please restock products!
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} columns={8}>
          {products && products.length ? (
            products.map((product) => (
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
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Sorry, we need to restock our products. Please come back soon!
                :(
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Products;
