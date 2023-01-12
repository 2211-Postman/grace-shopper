import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { usdFormatter } from "../../helpers";
import { useNavigate } from "react-router-dom";

export default function ProductsCard({ product }) {
  const { productId, productName, brand, price, imageURL } = product;
  const navigate = useNavigate();
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => {
          navigate(`/products/${productId}`);
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={imageURL[0]}
          alt="Sneaker Photo"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="p" color="grey">
            {brand}
          </Typography>
          <Typography component="div" variant="p">
            {productName}
          </Typography>
          <Typography component="div" variant="p" color="grey">
            {`${usdFormatter.format(price)}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
