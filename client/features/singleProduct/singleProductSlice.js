import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProductAsync = createAsyncThunk(
  "singleProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editSingleProductAsync = createAsyncThunk(
  "editSingleProduct",
  async ({
    productId,
    productName,
    brand,
    size,
    color,
    price,
    description,
    stockCount,
    imageURL,
  }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, {
        productName,
        brand,
        size,
        color,
        price,
        description,
        stockCount,
        imageURL,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
