import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "./productsSlice";
import AddIcon from "@mui/icons-material/Add";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Fab,
} from "@mui/material";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stockCount, setStockCount] = useState("");
  const [imageURL, setImageURL] = useState("");
  console.log(imageURL);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addProductAsync({
        productName,
        brand,
        size,
        color,
        price,
        description,
        stockCount,
        imageURL,
      })
    );
    setProductName("");
    setBrand("");
    setColor("");
    setPrice("");
    setDescription("");
    setStockCount("");
    setImageURL("");
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  return (
    <Grid container spacing={0} columns={8} justifyContent="center">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="productName">Product Name</InputLabel>
            <Input
              id="productName"
              aria-describedby="my-helper-text"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="brand">Brand</InputLabel>
            <Input
              id="brand"
              aria-describedby="my-helper-text"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel id="size">Size</InputLabel>
            <Select
              labelId="size"
              value={size}
              label="Size"
              onChange={handleChangeSize}
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={7.5}>7.5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={8.5}>8.5</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={9.5}>9.5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={10.5}>10.5</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={11.5}>11.5</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={12.5}>12.5</MenuItem>
              <MenuItem value={13}>13</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="color">Color</InputLabel>
            <Input
              id="color"
              aria-describedby="my-helper-text"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              aria-describedby="my-helper-text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              aria-describedby="my-helper-text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="stockCount">Stock Count</InputLabel>
            <Input
              id="stockCount"
              aria-describedby="my-helper-text"
              value={stockCount}
              onChange={(event) => setStockCount(event.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="imageURL">Image URL</InputLabel>
            <Input
              id="imageURL"
              aria-describedby="my-helper-text"
              value={imageURL}
              onChange={(event) => setImageURL(event.target.value.split(","))}
              required
            />
          </FormControl>

          <Fab size="small" color="primary" aria-label="add" type="submit">
            {<AddIcon />}
          </Fab>
        </FormGroup>
      </form>
    </Grid>
  );
};

export default CreateProduct;
