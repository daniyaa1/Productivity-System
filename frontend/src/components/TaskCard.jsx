import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const statusClass =
    task.status === "Completed"
      ? "done"
      : task.status === "In Progress"
        ? "progress"
        : "pending";

  const priorityClass = task.isOverdue
    ? "priority-overdue"
    : task.priorityScore >= 85
      ? "priority-high"
      : "";

  return (
    <article className={`task-card ${priorityClass}`}>
      <div className="task-card-top">
        <div>
          <span className={`status-pill ${statusClass}`}>{task.status}</span>
          <h3>{task.title}</h3>
        </div>
        <button
          className="danger-link"
          onClick={() => dispatch(deleteTask(task._id))}
        >
          Delete
        </button>
      </div>
      <p className="task-description">{task.description || "No description added."}</p>
      <div className="task-meta-grid">
        <div>
          <span className="meta-label">Category</span>
          <strong>{task.category}</strong>
        </div>
        <div>
          <span className="meta-label">Priority</span>
          <strong>{task.priorityScore}</strong>
        </div>
        <div>
          <span className="meta-label">Deadline</span>
          <strong>{new Date(task.deadline).toLocaleString()}</strong>
        </div>
        <div>
          <span className="meta-label">Owner</span>
          <strong>{task.owner?.name || "Unknown"}</strong>
        </div>
      </div>
      {task.isOverdue ? <p className="error-text">Overdue task</p> : null}
      <label className="input-group inline-group">
        <span>Update status</span>
        <select
          value={task.status}
          onChange={(event) =>
            dispatch(
              updateTask({
                id: task._id,
                values: { status: event.target.value },
              })
            )
          }
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </label>
    </article>
  );
};

export default TaskCard;

