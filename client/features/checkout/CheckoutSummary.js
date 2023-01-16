import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { usdFormatter, getShippingCost } from "../../helpers";
import { Grid, Typography, Container } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const products = [
  {
    productId: 1,
    numberOfItems: 1,
    price: 500,
    productName: "AIR JORDAN 1 RETRO HIGH OG CHICAGO",
    brand: " Air Jordan",
    size: 9,
    color: "WHITE/VARSITY RED-BLACK",
    imageURL:
      "https://img.stadiumgoods.com/14/28/63/00/14286300_42937338_2048.jpg",
  },
  {
    productId: 2,
    numberOfItems: 2,
    productName: "YEEZY BOOST 350 V2 ZEBRA",
    brand: "Adidas",
    size: 9.5,
    color: "WHITE/CBLACK/RED",
    price: 615,
    imageURL:
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/012/original/105568_01.jpg.jpeg?action=crop&width=2000",
  },
  {
    productId: 3,
    numberOfItems: 1,
    productName: "NMD_R1 PK",
    brand: "Adidas",
    size: 7,
    color: "FOOTWEARWHITE/FOOTWEARWHITE/FO",
    price: 200,
    imageURL:
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/929/556/original/151301_01.jpg.jpeg?action=crop&width=2000",
  },
];

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

function CheckoutSummary({ goToProductOnClick, checkout }) {
  const classes = useStyles();
  const { productId, productName, size, color, totalPrice, imageURL } =
    checkout;

  console.log(productName, "HIIII");
  const totalCheckoutCost = checkout.reduce((a, x) => {
    a += x.totalPrice;
    return a;
  }, 0);
  const shippingCost = getShippingCost(checkout);
  const displaySubTotal = usdFormatter.format(totalCheckoutCost);
  const displayShipping = usdFormatter.format(getShippingCost(checkout));
  const displayTotal = usdFormatter.format(totalCheckoutCost + shippingCost);

  return (
    <div
      // className={classes.layout}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main className={classes.myCustomClass}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="p" component="div">
              ORDER SUMMARY
            </Typography>

            <Container
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body2" color="text.secondary">
                Subtotal:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displaySubTotal}
              </Typography>
            </Container>

            <Container
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body2" color="text.secondary">
                Estimated Shipping:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displayShipping}
              </Typography>
            </Container>

            <Container
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body2" color="text.primary">
                Total:
              </Typography>
              <Typography variant="body2" color="text.primary">
                {displayTotal}
              </Typography>
            </Container>
          </CardContent>
        </Card>

        <Card sx={{ display: "flex" }}>
          <CardContent
            sx={{
              flex: "1 0 auto",
              display: "flex",
              flexDirection: "column",
              justifyItems: "speace-evenly",
              gap: "5px",
            }}
          >
            <List disablePadding>
              {products.map((product) => (
                <ListItem
                  className={classes.listItem}
                  key={product.productName}
                  onClick={(e) => goToProductOnClick(product.productId)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Sneaker Photo"
                      src={`${product.imageURL}`}
                      variant="square"
                      sx={{ height: "10%" }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={product.productName}
                    secondary={product.color}
                  />
                  <Typography variant="body2">
                    {`${usdFormatter.format(product.price)}`}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default CheckoutSummary;
