import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

/////////////
// Temporary sample data until data flows thru
function getSampleProducts() {
  const sampleProduct = {
    productId: null,
    productName: "AIR JORDAN 7 RETRO 'BLACK OLIVE'",
    brand: "Air Jordan",
    imageUrl: "https://cdn.flightclub.com/2600/TEMPLATE/347629/1.jpg",
  };
  let products = Array(8)
    .fill(sampleProduct)
    .map((x, i) => {
      x.productId = i + 1;
      return x;
    });
  return products;
}
////////////

export const fetchAllProductsAsync = createAsyncThunk(
  "allProducts",
  async () => {
    try {
      // const { data } = await axios.get("/api/products/");
      const data = getSampleProducts();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductAsync = createAsyncThunk(
  "singleProduct",
  async (id) => {
    try {
      let { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { all: [], single: {} },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.all = action.payload;
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      state.single = action.payload;
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.products.single;
};

export const selectUniqueProducts = (state) => {
  // filter out all the different size and color options
  // for the all products view
  let products = state.products.all.map((x) => {
    const { productId, productName, brand, imageUrl, ...rest } = x;
    return { productId, productName, brand, imageUrl };
  });
  products = [...new Set(products)];
  return products;
};

export default productsSlice.reducer;
