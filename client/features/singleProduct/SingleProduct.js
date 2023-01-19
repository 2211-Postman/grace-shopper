import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditSingleProduct from "./EditSingleProduct.js";

import {
  fetchSingleProductAsync,
  selectProduct,
} from "./singleProductSlice.js";

import { Grid } from "@material-ui/core";
import ImageGrid from "./ImageGrid";
import MainImage from "./MainImage";
import Info from "./Info";

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectProduct);

  const [selectedImage, setSelectedImage] = useState(0);

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSingleProductAsync(productId));
    };
    fetchData();
  }, [dispatch, selectProduct]);

  return (
    <>
      {product && Object.keys(product).length ? (
        <Grid
          container
          spacing={5}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
        >
          <Grid item sm={1}>
            <ImageGrid
              images={product.imageURL}
              onSelect={setSelectedImage}
              selectedImage={selectedImage}
            />
          </Grid>
          <Grid item sm={5}>
            <MainImage src={product.imageURL[selectedImage]} />
          </Grid>
          <Grid item sm={6}>
            <Info product={product} />
          </Grid>
          <Grid item sm={12}>
            {isLoggedIn && isAdmin ? (
              <EditSingleProduct productId={productId} />
            ) : null}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default SingleProduct;
