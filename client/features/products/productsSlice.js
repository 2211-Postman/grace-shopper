import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const fetchAllProductsAsync = createAsyncThunk(
  "allProducts",
  async () => {
    try {
      const { data } = await axios.get("/api/products/");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { all: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

export const selectUniqueProducts = (state) => {
  // filter out all the different size and color options
  // for the all products view
  let products = state.products.all.map((x) => {
    const { productId, productName, brand, price, imageURL, ...rest } = x;
    return { productId, productName, brand, price, imageURL };
  });
  products = [...new Set(products)];
  return products;
};

export default productsSlice.reducer;
