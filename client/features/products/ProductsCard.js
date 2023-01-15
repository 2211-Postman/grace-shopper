import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { usdFormatter } from "../../helpers";

export default function ProductsCard({
  product,
  onClick,
  handleDelete,
  isLoggedIn,
  isAdmin,
}) {
  const { id, productName, brand, price, imageURL } = product;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      > */}
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={imageURL[0]}
        alt="Sneaker Photo"
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="p" color="grey">
          {brand}
        </Typography>
        <Typography component="div" variant="p">
          {productName}
        </Typography>
        <Typography component="div" variant="p" color="grey">
          {`${usdFormatter.format(price)}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e) => onClick(id)}>
          View
        </Button>
        {isLoggedIn && isAdmin ? (
          <div>
            <Button size="small">Edit</Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDelete(product.id)}
            ></Button>
          </div>
        ) : null}
      </CardActions>
      {/* </CardActionArea> */}
    </Card>
  );
}
