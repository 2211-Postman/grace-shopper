import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchSingleProductAsync,
//   selectProduct,
// } from "../features/SingleStudentSlice";

import { Grid } from "@material-ui/core";
import ImageGrid from "./ImageGrid";
import MainImage from "./MainImage";
import Info from "./Info";

const images = [
  "https://cdn.flightclub.com/2600/TEMPLATE/347629/1.jpg",
  "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F12%2Fair-jordan-7-black-olive-dn9782-001-release-date-1.jpg?q=75&w=800&cbr=1&fit=max",
];

const product = {
  title: "AIR JORDAN 7 RETRO",
  description: "BLACK/CHERRYWOOD RED-NEUTRAL OLIVE-CHUTNEY",
  price: 216.55,
};

const SingleProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  // const { productId } = useParams();

  // const product = useSelector(selectProduct);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchSingleProductAsync(productId));
  // }, []);

  //3 grids: 1 for diff images, 1 for main image, 1 for info
  //12 column grid
  return (
    <div>
      <Grid container spacing={1} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Grid item sm={1}>
          <ImageGrid
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
        </Grid>
        <Grid item sm={5}>
          <MainImage src={images[selectedImage]} />
        </Grid>
        <Grid item sm={6}>
          <Info {...product} />
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleProduct;
