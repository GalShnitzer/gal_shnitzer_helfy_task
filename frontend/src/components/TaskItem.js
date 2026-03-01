import { useState } from "react";
import "./TaskItem.css";
import TaskForm from "./TaskForm";

export default function TaskItem({
  task,
  onEditTask,
  onDeleteTask,
  onToggleTask,
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  const statusClass =
    {
      Todo: "status-todo",
      "In Progress": "status-in-progress",
      Done: "status-done",
    }[task.status] ?? "";

  const priorityClass = task.priority;

  function handleEdit(updatedFields) {
    onEditTask({ ...task, ...updatedFields });
    setShowEditForm(false);
  }

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
              onClick={() => setShowEditForm(true)}
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

      <TaskForm
        key={showEditForm ? task.id : `${task.id}-closed`}
        open={showEditForm}
        initialState={task}
        formTitle="Edit Task"
        buttonText="Save Changes"
        onSubmit={handleEdit}
        onClose={() => setShowEditForm(false)}
      />
    </>
  );
}
