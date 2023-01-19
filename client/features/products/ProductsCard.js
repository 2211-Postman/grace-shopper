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
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <CardActionArea
        onClick={(e) => onClick(id)}
        sx={{
          display: "flex",
          flexDirection: "column",
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
          <Typography component="div" variant="p" fontWeight="bold">
            {productName}
          </Typography>
          <Typography component="div" variant="subtitle2" color="grey">
            {`${dollar(price)}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isLoggedIn && isAdmin ? (
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
