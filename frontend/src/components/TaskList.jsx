import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { items, loading, error } = useSelector((state) => state.tasks);

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Module 2 + 3</p>
          <h2>Priority-sorted live tasks</h2>
        </div>
        <span className="live-badge">Live sync active</span>
      </div>
      {loading ? <p className="muted">Loading tasks...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      <div className="task-list">
        {items.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default TaskList;

