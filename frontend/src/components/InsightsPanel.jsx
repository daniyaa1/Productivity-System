import { useSelector } from "react-redux";

const InsightsPanel = () => {
  const { data } = useSelector((state) => state.insights);

  if (!data) {
    return (
      <section className="panel">
        <p className="muted">Insights will appear after your data loads.</p>
      </section>
    );
  }

  const cards = [
    { label: "Total Tasks", value: data.totalTasks },
    { label: "Completed", value: data.completedTasks },
    { label: "Pending", value: data.pendingTasks },
    { label: "In Progress", value: data.inProgressTasks },
  ];

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Module 4</p>
          <h2>Productivity insights</h2>
        </div>
      </div>
      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.label} className="stat-card">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
        ))}
      </div>
      <div className="insight-copy">
        <p>
          You completed <strong>{data.completedToday}</strong> tasks today.
        </p>
        <p>
          Most active category: <strong>{data.mostActiveCategory}</strong>
        </p>
        <p>
          Daily activity count: <strong>{data.dailyActivity}</strong>
        </p>
      </div>
    </section>
  );
};

export default InsightsPanel;

