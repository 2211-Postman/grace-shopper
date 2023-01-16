import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { usdFormatter, getShippingCost } from "../../helpers";
import { Typography, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const dollar = (x) => {
  return usdFormatter.format(x);
};

const useStyles = makeStyles((theme) => ({
  myCustomClass: { marginTop: theme.spacing.unit * 2 },
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: "700",
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
}));

export default function CheckoutReview({ cart }) {
  const classes = useStyles();
  const totalCartCost = cart.products.reduce((a, x) => {
    a += x.totalPrice;
    return a;
  }, 0);

  const shipCost = cart.quantity > 0 ? getShippingCost(cart) : 0;
  const total = totalCartCost + shipCost;

  return (
    <main className={classes.myCustomClass} sx={{ display: "flex" }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
            ORDER SUMMARY
          </Typography>

          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Subtotal:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dollar(totalCartCost)}
            </Typography>
          </Container>

          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Estimated Shipping:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dollar(shipCost)}
            </Typography>
          </Container>

          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.primary">
              Total:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {dollar(total)}
            </Typography>
          </Container>
        </CardContent>
      </Card>
    </main>
  );
}
