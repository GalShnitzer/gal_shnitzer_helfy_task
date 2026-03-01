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
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Your description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={selectStyle}
        >
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

        <button style={buttonSubmitStyle}>{buttonText}</button>
      </form>
    </Modal>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
  outline: "none",
};

const selectStyle = {
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "inherit",
  cursor: "pointer",
  background: "#fff",
  transition: "border-color 0.2s",
  outline: "none",
};

const buttonSubmitStyle = {
  padding: "10px 16px",
  background: "linear-gradient(135deg, #54a0ff 0%, #1dd1a1 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};
