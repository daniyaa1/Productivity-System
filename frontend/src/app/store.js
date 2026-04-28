import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import insightReducer from "../features/insights/insightSlice";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    insights: insightReducer,
  },
});

