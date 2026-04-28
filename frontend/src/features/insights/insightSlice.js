import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchInsights = createAsyncThunk(
  "insights/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/insights");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load insights"
      );
    }
  }
);

const insightSlice = createSlice({
  name: "insights",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default insightSlice.reducer;

