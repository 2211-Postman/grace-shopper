import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

function displayCase(text) {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

export default function MuiAuthForm({
  name,
  displayName,
  handleSubmit,
  formInputs,
  helperText,
  error,
}) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {displayName}
        </Typography>
        <Box
          component="form"
          name={name}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {formInputs.map((name) => (
            <TextField
              key={name}
              margin="normal"
              required
              fullWidth
              id={name}
              label={displayCase(name)}
              name={name}
              type={name === "password" ? name : "text"}
              autoFocus
            />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {displayName}
          </Button>
          {name === "login" ? (
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          ) : null}
        </Box>
        {helperText && (
          <div>
            <Alert severity="info">{helperText}</Alert>
          </div>
        )}

        {error && (
          <div>
            <Alert severity="error">{error}</Alert>
          </div>
        )}
      </Box>
    </Container>
  );
}
