import React from "react";
import { Grid } from "@material-ui/core";

export default function ImageGrid({ images, onSelect, selectedImage }) {
  return (
    <Grid container direction="column">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          height={50}
          onClick={() => onSelect(index)}
          style={{
            border:
              index === selectedImage ? "solid 2px black" : "solid 2px #eee",
            cursor: "pointer",
          }}
        />
      ))}
    </Grid>
  );
}
