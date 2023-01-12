import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { usdFormatter } from "../../helpers";
import { Grid, Typography } from "@mui/material";

export default function CartCard({
  item,
  goToProductOnClick,
  removeFromCartOnClick,
}) {
  const { productId, productName, size, color, totalPrice, imageURL } = item;
  return (
    <Card sx={{ display: "flex" }}>
      <CardActionArea onClick={(e) => goToProductOnClick(productId)}>
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image={imageURL}
          alt="Sneaker Photo"
        />
      </CardActionArea>
      <CardContent
        sx={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          justifyItems: "speace-evenly",
          gap: "5px",
        }}
      >
        <Grid container spacing={1} columns={8}>
          <Grid item md={6}>
            <Typography component="div" variant="p" fontSize="8px">
              {productName}
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography component="div" variant="p" fontSize="8px">
              {`${usdFormatter.format(totalPrice)}`}
            </Typography>
          </Grid>
        </Grid>
        <Typography component="div" variant="p" fontSize="8px" color="grey">
          {color}
        </Typography>
        <Typography component="div" variant="p" fontSize="8px" color="grey">
          {`Size: ${size}`}
        </Typography>

        <Grid container spacing={1} columns={8}>
          <Grid item md={4}>
            <Typography component="div" variant="p" fontSize="8px">
              {"Edit Size"}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <CardActionArea onClick={(e) => removeFromCartOnClick(productId)}>
              <Typography component="div" variant="p" fontSize="8px">
                {"X Remove"}
              </Typography>
            </CardActionArea>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
