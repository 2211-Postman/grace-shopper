import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { dollar, getShippingCost } from "../../helpers";
import { Typography, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  myCustomClass: { marginTop: theme.spacing.unit * 2 },
}));

export default function CartSummary({ cart, checkoutOnClick }) {
  const classes = useStyles();
  const totalCartCost = cart.products.reduce((a, x) => {
    a += x.totalPrice;
    return a;
  }, 0);

  const shipCost = cart.quantity > 0 ? getShippingCost(cart) : 0;
  const total = totalCartCost + shipCost;

  return (
    <Card
      className={classes.myCustomClass}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="p" component="div" fontSize="12px">
          ORDER SUMMARY
        </Typography>

        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary" fontSize="12px">
            Subtotal:
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="12px">
            {dollar(totalCartCost)}
          </Typography>
        </Container>

        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary" fontSize="12px">
            Estimated Shipping:
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="12px">
            {dollar(shipCost)}
          </Typography>
        </Container>

        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.primary" fontSize="12px">
            Total:
          </Typography>
          <Typography variant="body2" color="text.primary" fontSize="12px">
            {dollar(total)}
          </Typography>
        </Container>
      </CardContent>
      <Button
        variant="contained"
        disabled={cart.quantity === 0}
        onClick={(e) => checkoutOnClick()}
      >
        {`Checkout: ${dollar(total)}`}
      </Button>
    </Card>
  );
}
