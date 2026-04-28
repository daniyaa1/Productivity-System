import { ActivityLog } from "../models/ActivityLog.js";
import { Task } from "../models/Task.js";
import { emitTasksChanged } from "../socket.js";
import { enrichAndSortTasks } from "../utils/priority.js";

const logActivity = async ({ userId, action, category, taskId }) => {
  await ActivityLog.create({
    user: userId,
    action,
    category,
    taskId,
  });
};

export const getTasks = async (_req, res) => {
  const tasks = await Task.find({})
    .populate("owner", "name email")
    .sort({ createdAt: 1 });

  return res.json(enrichAndSortTasks(tasks));
};

export const createTask = async (req, res) => {
  const { title, description, category, status, deadline } = req.body;

  if (!title || !category || !deadline) {
    return res
      .status(400)
      .json({ message: "Title, category, and deadline are required" });
  }

  const task = await Task.create({
    title,
    description,
    category,
    status: status || "Pending",
    deadline,
    owner: req.user._id,
    completedAt: status === "Completed" ? new Date() : null,
  });

  await logActivity({
    userId: req.user._id,
    action: task.status === "Completed" ? "COMPLETED" : "CREATED",
    category: task.category,
    taskId: task._id,
  });

  emitTasksChanged();
  const populatedTask = await Task.findById(task._id).populate("owner", "name email");
  return res.status(201).json(populatedTask);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only edit your own tasks" });
  }

  const previousStatus = task.status;

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.category = req.body.category ?? task.category;
  task.status = req.body.status ?? task.status;
  task.deadline = req.body.deadline ?? task.deadline;
  task.completedAt =
    task.status === "Completed" ? task.completedAt || new Date() : null;

  await task.save();

  await logActivity({
    userId: req.user._id,
    action:
      previousStatus !== "Completed" && task.status === "Completed"
        ? "COMPLETED"
        : "UPDATED",
    category: task.category,
    taskId: task._id,
  });

  emitTasksChanged();
  const populatedTask = await Task.findById(task._id).populate("owner", "name email");
  return res.json(populatedTask);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only delete your own tasks" });
  }

  await logActivity({
    userId: req.user._id,
    action: "DELETED",
    category: task.category,
    taskId: task._id,
  });

  await task.deleteOne();
  emitTasksChanged();
  return res.json({ message: "Task deleted" });
};
