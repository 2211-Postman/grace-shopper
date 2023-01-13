import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const fetchAllUsersAsync = createAsyncThunk("allUsers", async () => {
  try {
    const { data } = await axios.get("/api/users/");
    return data;
  } catch (error) {
    console.log(error);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: { all: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

export const selectUsers = (state) => {
  return state.users;
};

export default usersSlice.reducer;
