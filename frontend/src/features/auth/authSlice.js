import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { connectSocket, disconnectSocket } from "../../socket";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

export const register = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const loadProfile = createAsyncThunk(
  "auth/loadProfile",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/auth/me");
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Session expired"
      );
    }
  }
);

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      disconnectSocket();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        connectSocket();
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        connectSocket();
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loadProfile.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        disconnectSocket();
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

