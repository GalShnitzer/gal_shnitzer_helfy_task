import { useState } from "react";
import Modal from "./Modal";
import PriorityBadge from "./PriorityBadge";


//Form for creating/editing tasks
export default function TaskForm({
  initialState,
  open,
  formTitle,
  buttonText,
  onSubmit,
  onClose,
}) {
  const [title, setTitle] = useState(initialState?.title || "");
  const [description, setDescription] = useState(
    initialState?.description || "",
  );
  const [priority, setPriority] = useState(initialState?.priority || "low");

  function resetForm() {
    setTitle("");
    setDescription("");
    setPriority("low");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description) return;
    const newItem = { title, description, priority };
    onSubmit(newItem);
    resetForm();
  }

  return (
    <Modal open={open} title={formTitle} onClose={onClose || resetForm}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option key="low" value="low">
            <PriorityBadge priority="low" /> low
          </option>
          <option key="medium" value="medium">
            <PriorityBadge priority="medium" /> medium
          </option>
          <option key="high" value="high">
            <PriorityBadge priority="high" /> high
          </option>
        </select>

        <button>{buttonText}</button>
      </form>
    </Modal>
  );
}