import { ActivityLog } from "../models/ActivityLog.js";
import { Task } from "../models/Task.js";

const getDayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
};

export const getInsights = async (req, res) => {
  const userId = req.user._id;
  const { start, end } = getDayRange();

  const [tasks, completedToday, dailyActivity, categoryDistribution] = await Promise.all([
    Task.find({ owner: userId }),
    Task.countDocuments({
      owner: userId,
      completedAt: { $gte: start, $lt: end },
    }),
    ActivityLog.countDocuments({
      user: userId,
      createdAt: { $gte: start, $lt: end },
    }),
    Task.aggregate([
      { $match: { owner: userId } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ]),
  ]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;
  const mostActiveCategory = categoryDistribution[0]?._id || "No category yet";

  return res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    completedToday,
    dailyActivity,
    mostActiveCategory,
    categoryDistribution,
  });
};

