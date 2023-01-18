import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, getShippingCost } from "../../helpers";

import { useSelector, useDispatch } from "react-redux";
import { selectAddress, fetchAddressAsync } from "./addressSlice";
import AddressForm from "./AddressForm";

// const addresses = [
//   "1 Material-UI Drive",
//   "Reactville",
//   "Anytown",
//   "99999",
//   "USA",
// ];
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
  const dispatch = useDispatch();

  const address = useSelector(selectAddress);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAddressAsync());
    };
    fetchData();
  }, [dispatch]);

  const { classes } = props;
  const {
    fName,
    lName,
    addressLine1,
    addressLine2,
    city,
    state,
    zipcode,
    country,
  } = address;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Grid container columns={12}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {`${fName} ${lName}`}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {`${addressLine1} ${addressLine2}, ${city}, ${state}, ${zipcode}, ${country}`}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {payment.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {payment.detail}
                  </Typography>
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
