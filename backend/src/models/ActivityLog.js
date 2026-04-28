import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["CREATED", "UPDATED", "DELETED", "COMPLETED"],
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

