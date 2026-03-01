import "./TaskItem.css";

export default function TaskItem({
  task,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onOpenEdit,
  isEditing = false,
}) {
  const statusClass =
    {
      Todo: "status-todo",
      "In Progress": "status-in-progress",
      Done: "status-done",
    }[task.status] ?? "";

  const priorityClass = task.priority;

  return (
    <>
      <div
        className={`card ${statusClass} ${task.completed ? "completed" : ""}`}
      >
        <div className={`priority-dot ${priorityClass}`} />

        <p className={`card-title ${task.completed ? "completed" : ""}`}>
          {task.title}
        </p>

        {task.description && (
          <p className="card-description">{task.description}</p>
        )}

        <div className="card-meta">
          <span className="card-status">{task.status}</span>
          <span className={`card-priority ${priorityClass}`}>
            {task.priority}
          </span>
        </div>

        <div className="card-actions">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            Done
          </label>

          <div className="card-buttons">
            <button
              className="btn btn-edit"
              onClick={() => !isEditing && onOpenEdit(task)}
              disabled={isEditing}
            >
              Edit
            </button>
            <button
              className="btn btn-delete"
              onClick={() => onDeleteTask(task)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
