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
import { dollar } from "../../helpers";

const ProductsCard = ({
  product,
  onClick,
  handleDelete,
  isLoggedIn,
  isAdmin,
}) => {
  const { id, productName, brand, price, imageURL } = product;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
      }}
    >
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
          {`${dollar(price)}`}
        </Typography>
      </CardContent>
      <CardActions>
        {!isAdmin ? (
          <Button size="small" onClick={(e) => onClick(id)}>
            View
          </Button>
        ) : isLoggedIn && isAdmin ? (
          <div>
            <Button size="small" onClickCapture={(e) => onClick(id)}>
              Edit
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDelete(product.id)}
            ></Button>
          </div>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default ProductsCard;
