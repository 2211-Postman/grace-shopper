import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN } from "../auth/authSlice";

export const fetchUserHistoryAsync = createAsyncThunk(
  "get all of a user's completed orders",
  async (userId) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get(`/api/history/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: { history: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchUserHistoryAsync.fulfilled, (state, action) => {
      state.history = action.payload;
    });
  },
});
export const selectHistory = (state) => {
  return state.history;
};
export default historySlice.reducer;
