const HOUR = 1000 * 60 * 60;

export const calculatePriorityScore = (task) => {
  if (task.status === "Completed") {
    return 0;
  }

  const now = Date.now();
  const deadline = new Date(task.deadline).getTime();
  const diff = deadline - now;

  if (diff <= 0) {
    return 100;
  }

  const hoursRemaining = diff / HOUR;

  if (hoursRemaining <= 6) {
    return 95;
  }

  if (hoursRemaining <= 24) {
    return 85;
  }

  if (hoursRemaining <= 48) {
    return 70;
  }

  if (hoursRemaining <= 72) {
    return 55;
  }

  if (hoursRemaining <= 168) {
    return 35;
  }

  return 15;
};

export const enrichAndSortTasks = (tasks) =>
  tasks
    .map((task) => {
      const priorityScore = calculatePriorityScore(task);
      const deadlineTime = new Date(task.deadline).getTime();
      const isOverdue = deadlineTime < Date.now() && task.status !== "Completed";

      return {
        ...task.toObject(),
        priorityScore,
        isOverdue,
      };
    })
    .sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }

      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

