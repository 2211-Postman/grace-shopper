import * as React from "react";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material/";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

const styles = (theme) => ({
  appBar: {
    position: "relative",
  },
  paper: {
    width: "auto",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step, addresses, setAddresses, name, setName) {
  switch (step) {
    case 0:
      return <AddressForm setAddresses={setAddresses} setName={setName} />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review addresses={addresses} name={name} />;
    default:
      throw new Error("Unknown step");
  }
}

class CheckoutCard extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = (orderId, placeOrder) => {
    console.log("in handleNext");
    this.setState((state) => {
      if (state.activeStep === steps.length - 1) {
        placeOrder(orderId);
      }
      return { activeStep: state.activeStep + 1 };
    });
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const {
      classes,
      orderId,
      placeOrder,
      addresses,
      setAddresses,
      name,
      setName,
    } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main
          className={classes.layout}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(
                    activeStep,
                    addresses,
                    setAddresses,
                    name,
                    setName
                  )}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleNext(orderId, placeOrder)}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

CheckoutCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckoutCard);
