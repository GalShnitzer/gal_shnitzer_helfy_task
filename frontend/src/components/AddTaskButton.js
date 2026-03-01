export default function AddTaskButton({ onClick }) {
  return (
    <button
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
      onClick={onClick}
    >
      ➕ Add Task
    </button>
  );
}
