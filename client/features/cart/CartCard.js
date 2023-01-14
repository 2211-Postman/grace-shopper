import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Grid, Typography } from "@mui/material";

import EditCartItemForm from "./EditCartItemForm";
import { dollar } from "../../helpers";

const createQtyOptions = (stockCount) => {
  const options = {};
  for (let i = 1; i <= stockCount; i++) {
    options[i] = `${i}`;
  }
  return options;
};

export default function CartCard({
  item,
  stockCount,
  goToProductOnClick,
  removeFromCartOnClick,
  changeSizeOnClick,
  changeQtyOnClick,
}) {
  const {
    id,
    productName,
    size,
    color,
    numberOfItems,
    unitPrice,
    totalPrice,
    imageURL,
  } = item;

  return (
    <Card sx={{ display: "flex" }}>
      <CardActionArea onClick={(e) => goToProductOnClick(id)}>
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image={imageURL[0]}
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
              {`${dollar(totalPrice)}`}
            </Typography>
          </Grid>
        </Grid>
        <Typography component="div" variant="p" fontSize="8px" color="grey">
          {color}
        </Typography>
        <Typography component="div" variant="p" fontSize="8px" color="grey">
          {`Size: ${size}`}
        </Typography>
        <Typography component="div" variant="p" fontSize="8px">
          {`Unit Price: ${dollar(unitPrice)}`}
        </Typography>

        <Typography component="div" variant="p" fontSize="8px">
          {`Quantity: ${numberOfItems}`}
        </Typography>

        <Grid container spacing={1} columns={9}>
          <Grid item md={3}>
            <CardActionArea onClick={(e) => changeSizeOnClick(id)}>
              <Typography component="div" variant="p" fontSize="8px">
                {"Edit Size"}
              </Typography>
            </CardActionArea>
          </Grid>
          <Grid item md={3}>
            <EditCartItemForm
              buttonLabel={"Edit Qty"}
              item={item}
              defaultValue={item.numberOfItems}
              options={createQtyOptions(stockCount)}
              onSubmit={changeQtyOnClick}
            />
          </Grid>
          <Grid item md={3}>
            <CardActionArea onClick={(e) => removeFromCartOnClick(id)}>
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
