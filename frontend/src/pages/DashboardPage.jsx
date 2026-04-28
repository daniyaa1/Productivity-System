import { useEffect } from "react";
import { useDispatch } from "react-redux";
import InsightsPanel from "../components/InsightsPanel";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { fetchInsights } from "../features/insights/insightSlice";
import { fetchTasks } from "../features/tasks/taskSlice";
import { connectSocket, getSocket } from "../socket";

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchInsights());

    connectSocket();
    const socket = getSocket();

    const handleTasksChanged = () => {
      dispatch(fetchTasks());
      dispatch(fetchInsights());
    };

    const intervalId = window.setInterval(() => {
      dispatch(fetchTasks());
      dispatch(fetchInsights());
    }, 30000);

    socket.on("tasks:changed", handleTasksChanged);

    return () => {
      socket.off("tasks:changed", handleTasksChanged);
      window.clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <div className="dashboard-shell">
      <Navbar />
      <main className="dashboard-grid">
        <div className="left-column">
          <InsightsPanel />
          <TaskForm />
        </div>
        <TaskList />
      </main>
    </div>
  );
};

export default DashboardPage;
