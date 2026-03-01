import Modal from "./Modal";

export default function ConfirmDeleteDialog({ open, onConfirm, onCancel }) {
  return (
    <Modal open={open} title="⚠️ Confirm Delete" onClose={onCancel}>
      <p style={messageStyle}>
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div style={buttonsContainerStyle}>
        <button onClick={onCancel} style={cancelButtonStyle}>
          Cancel
        </button>
        <button onClick={onConfirm} style={deleteButtonStyle}>
          Delete Permanently
        </button>
      </div>
    </Modal>
  );
}

const messageStyle = {
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.6",
  marginBottom: "24px",
};

const buttonsContainerStyle = {
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  background: "#f0f0f0",
  color: "#333",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.2s",
};

const deleteButtonStyle = {
  padding: "10px 20px",
  background: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.2s, transform 0.2s",
};
