import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSingleProductAsync(productId));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {product && Object.keys(product).length ? (
        <div>
          <Grid
            container
            spacing={5}
            style={{ maxWidth: 1100, margin: "0 auto" }}
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
          </Grid>
        </div>
      ) : null}
      ;
    </>
  );
};

export default SingleProduct;
