import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductsCard({ product, onClick }) {
  const { productId, productName, brand, price, imageUrl } = product;
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => onClick(productId)}
      >
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={imageUrl}
          alt="Campus Photo"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="p" color="grey">
            {brand}
          </Typography>
          <Typography component="div" variant="p">
            {productName}
          </Typography>
          <Typography component="div" variant="p" color="grey">
            {`${formatter.format(price)}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
