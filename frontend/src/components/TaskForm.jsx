import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    status: "Pending",
  });

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(createTask(form));
    setForm({
      title: "",
      description: "",
      category: "",
      deadline: "",
      status: "Pending",
    });
  };

  return (
    <section className="panel accent-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Module 1 + 2</p>
          <h2>Create a task</h2>
        </div>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label className="input-group">
          <span>Title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Launch sprint planning"
            required
          />
        </label>
        <label className="input-group">
          <span>Category</span>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Work, Study, Personal"
            required
          />
        </label>
        <label className="input-group full-width">
          <span>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Add context for the task"
          />
        </label>
        <label className="input-group">
          <span>Status</span>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
        <label className="input-group">
          <span>Deadline</span>
          <input
            type="datetime-local"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
          />
        </label>
        <button className="primary-button full-width" type="submit">
          Add task
        </button>
      </form>
    </section>
  );
};

export default TaskForm;

