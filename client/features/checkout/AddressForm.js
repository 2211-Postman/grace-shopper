import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

import { editAddressAsync } from "./addressSlice";

const AddressForm = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editAddressAsync({
        fName,
        lName,
        addressLine1,
        addressLine2,
        city,
        state,
        zipcode,
        country,
      })
    );
    setFName("");
    setLName("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setZipcode("");
    setCountry("");
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container columns={12}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="first name"
              value={fName}
              onChange={(event) => setFName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="last name"
              value={lName}
              onChange={(event) => setLName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="addressLine1"
              name="addressLine1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
              value={addressLine1}
              onChange={(event) => setAddressLine1(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="addressLine2"
              name="addressLine2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
              value={addressLine2}
              onChange={(event) => setAddressLine2(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              value={state}
              onChange={(event) => setState(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
              value={zipcode}
              onChange={(event) => setZipcode(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="billing country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              type="submit"
              label="Save Address"
              required
            />
            {/* <Fab size="small" color="primary" aria-label="add" type="submit">
              {<AddIcon />}
            </Fab> */}
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default AddressForm;
