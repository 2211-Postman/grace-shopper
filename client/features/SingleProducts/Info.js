import React from "react";
import { Grid, Typography, Divider, Button, Box } from "@material-ui/core";

export default function Info({ title, description, price }) {
  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Typography variant="subtitle1"></Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <Typography variant="h5">${price}</Typography>
      </Box>
      <Button variant="contained" color="primary" style={{ marginTop: "auto" }}>
        Purchase
      </Button>
    </Grid>
  );
}
