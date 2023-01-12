import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { usdFormatter } from "../../helpers";

export default function ProductsCard({ product, onClick }) {
  const { id, productName, brand, price, imageURL } = product;
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => onClick(id)}
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
