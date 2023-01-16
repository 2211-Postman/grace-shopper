import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, getShippingCost } from "../../helpers";

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
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const styles = (theme) => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: "700",
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Review(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {/* <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.productName}>
            <ListItemText
              primary={product.productName}
              secondary={product.color}
            />
            <Typography variant="body2">{`${usdFormatter.format(
              product.price
            )}`}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List> */}
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);
