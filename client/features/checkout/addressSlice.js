import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddressAsync = createAsyncThunk("address", async () => {
  try {
    const { data } = await axios.get(`/api/checkout/`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const editAddressAsync = createAsyncThunk(
  "editAddress",
  async ({
    fName,
    lName,
    addressLine1,
    addressLine2,
    city,
    state,
    zipcode,
    country,
  }) => {
    try {
      const { data } = await axios.post(`/api/checkout/`, {
        fName,
        lName,
        addressLine1,
        addressLine2,
        city,
        state,
        zipcode,
        country,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editAddressAsync.fulfilled, (state, action) => {
      state.all.push(action.payload);
    });
    builder.addCase(fetchAddressAsync.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

export const selectAddress = (state) => {
  return state.address;
};

export const addressReducer = addressSlice.reducer;
