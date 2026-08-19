function StatCard({ title, value, description }) {
  return (
    <div className="stat-card">
      <div>
        <p className="stat-title">{title}</p>
        <h2>{value}</h2>
        <span>{description}</span>
      </div>
    </div>
  );
}

export default StatCard;