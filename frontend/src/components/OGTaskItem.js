import { useState } from "react";
import TaskForm from "./TaskForm";
import PriorityBadge from "./PriorityBadge";

//Individual task display with actions
export default function TaskItem({
  task,
  onEditTask,
  onDeleteTask,
  onToggleTask,
}) {
  const [showEditForm, setShowEditForm] = useState(false);
  function handleEdit(updatedFields) {
    onEditTask({ ...task, ...updatedFields });
    setShowEditForm(false);
  }
  function handleDelete() {
    onDeleteTask(task);
  }
  function handleToggle() {
    onToggleTask(task.id);
  }
  return (
    <>
      <li>
        <p>{task.title}</p>
        <p>{task.description}</p>
        <p>
          <PriorityBadge priority={task.priority} /> {task.priority}
        </p>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />
        <button onClick={() => setShowEditForm(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </li>
      <TaskForm
        key={showEditForm ? task.id : `${task.id}-closed`}
        open={showEditForm}
        initialState={task}
        formTitle="Edit Task"
        buttonText="Save Changes"
        onSubmit={handleEdit}
      />
    </>
  );
}
