import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTasks = createAsyncThunk("tasks/fetch", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/tasks");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to load tasks"
    );
  }
});

export const createTask = createAsyncThunk(
  "tasks/create",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/tasks", payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, values }, thunkAPI) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;

