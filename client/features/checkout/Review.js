import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { usdFormatter, getShippingCost } from "../../helpers";

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
  const { classes, addresses, name, payment } = props;

  const payments1 = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: payment[0] },
    { name: "Card number", detail: payment[1] },
    { name: "Expiry date", detail: payment[2] },
  ];

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
            {name}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {addresses.filter((x) => x != "").join(", ")}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments1.map((payments) => (
              <React.Fragment key={payments.name}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {payments.name}:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {payments.detail}
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
