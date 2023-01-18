import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="grey" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/2211-Postman">
        Desgined by PostMen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      style={{ position: "fixed", bottom: 0, width: "100%" }}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 1,
          mt: "auto",
          backgroundColor: "black",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" color="white" align="center">
            Limited stock, endless style: Shop the most exclusive sneakers here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
