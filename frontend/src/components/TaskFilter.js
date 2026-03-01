//Filter tasks by completion status
export default function TaskFilter({ filter, setFilter }) {
  return (
    <select
      style={{
        padding: "8px 16px",
        background: "none",
        color: "#54a0ff",
        fontSize: "14px",
        fontWeight: 600,
        border: "1.5px solid #54a0ff",
        borderRadius: "8px",
        cursor: "pointer",
      }}
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">🎯All</option>
      <option value="completed">✅Completed</option>
      <option value="pending">✏️Pending</option>
    </select>
  );
}
