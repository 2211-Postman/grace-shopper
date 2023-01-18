import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { TOKEN } from "../auth/authSlice";

export const fetchAllUsersAsync = createAsyncThunk("allUsers", async () => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.get("/api/users/", {
        headers: { authorization: token },
      });
      return data;
    } else {
      return [];
    }
  } catch (error) {}
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
  return state.users.all;
};

export default usersSlice.reducer;
