import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { usdFormatter } from "../../helpers";
import { Grid, Typography, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  myCustomClass: { marginTop: theme.spacing.unit },
}));

function CheckoutSummary({ goToProductOnClick, item }) {
  const classes = useStyles();

  const { id, productName, size, color, totalPrice, imageURL } = item;

  return (
    <Card className={classes.myCustomClass} sx={{ display: "flex" }}>
      <CardActionArea
        sx={{ width: "15%" }}
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
              {`${usdFormatter.format(totalPrice)}`}
            </Typography>
          </Grid>
        </Grid>
        <Typography component="div" variant="p" fontSize="12px" color="grey">
          {color}
        </Typography>
        <Typography component="div" variant="p" fontSize="12px" color="grey">
          {`Size: ${size}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CheckoutSummary;
