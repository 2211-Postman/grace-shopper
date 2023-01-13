import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function UsersCard({ user, onClick }) {
  const { id, email, firstName, lastName, isAdmin, isGuest } = user;
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => onClick(id)}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="p" color="primary.dark">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography component="div" variant="p" color="secondary.dark">
            {email}
          </Typography>
          <Typography component="div" variant="p" color="secondary.dark">
            {isAdmin ? "Admin" : null}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
