import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { usdFormatter, getShippingCost } from "../../helpers";
import { Typography, Container } from "@mui/material";

export default function CartSummary({ cart, checkoutOnClick }) {
  const totalCartCost = cart.reduce((a, x) => {
    a += x.totalPrice;
    return a;
  }, 0);
  const shippingCost = getShippingCost(cart);
  const displaySubTotal = usdFormatter.format(totalCartCost);
  const displayShipping = usdFormatter.format(getShippingCost(cart));
  const displayTotal = usdFormatter.format(totalCartCost + shippingCost);

  return (
    <Card
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
          <Typography variant="body2" color="text.secondary" fontSize="10px">
            Subtotal:
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="10px">
            {displaySubTotal}
          </Typography>
        </Container>

        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary" fontSize="10px">
            Estimated Shipping:
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="10px">
            {displayShipping}
          </Typography>
        </Container>

        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.primary" fontSize="10px">
            Total:
          </Typography>
          <Typography variant="body2" color="text.primary" fontSize="10px">
            {displayTotal}
          </Typography>
        </Container>
      </CardContent>
      <Button variant="contained" onClick={(e) => checkoutOnClick()}>
        {`Checkout: ${displayTotal}`}
      </Button>
    </Card>
  );
}
