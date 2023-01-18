import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Grid, Typography } from "@mui/material";

import EditCartItemForm from "./EditCartItemForm";
import { dollar } from "../../helpers";
import { makeStyles } from "@material-ui/core";

const createQtyOptions = (stockCount) => {
  const options = {};
  for (let i = 1; i <= stockCount; i++) {
    options[i] = `${i}`;
  }
  return options;
};
const useStyles = makeStyles((theme) => ({
  myCustomClass: { marginTop: theme.spacing.unit * 2 },
}));

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

  const classes = useStyles();

  return (
    <Card className={classes.myCustomClass} sx={{ display: "flex" }}>
      <CardActionArea
        sx={{ width: "25%" }}
        onClick={(e) => goToProductOnClick(id)}
      >
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
            <Typography component="div" variant="p" fontSize="14px">
              {productName}
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography component="div" variant="p" fontSize="14px">
              {`${dollar(totalPrice)}`}
            </Typography>
          </Grid>
        </Grid>
        <Typography component="div" variant="p" fontSize="12px" color="grey">
          {color}
        </Typography>
        <Typography component="div" variant="p" fontSize="12px" color="grey">
          {`Size: ${size}`}
        </Typography>
        <Typography component="div" variant="p" fontSize="12px">
          {`Unit Price: ${dollar(unitPrice)}`}
        </Typography>

        <Typography component="div" variant="p" fontSize="12px">
          {`Quantity: ${numberOfItems}`}
        </Typography>
        <Grid container spacing={1} columns={9}>
          <Grid item md={3}>
            <CardActionArea onClick={(e) => changeSizeOnClick(id)}>
              <Typography component="div" variant="p" fontSize="12px">
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
              <Typography component="div" variant="p" fontSize="12px">
                {"X Remove"}
              </Typography>
            </CardActionArea>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
