import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function UsersCard({ user }) {
  const { email, firstName, lastName, isAdmin } = user;
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textAlign: "center",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6" color="primary.dark">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography
            component="div"
            variant="subtitle1"
            color="secondary.dark"
          >
            {email}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            color="secondary.dark"
            fontWeight="bold"
          >
            {isAdmin ? "Admin" : null}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
