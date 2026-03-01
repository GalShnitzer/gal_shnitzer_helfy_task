import Modal from "./Modal";

export default function ConfirmDeleteDialog({ open, onConfirm, onCancel }) {
  return (
    <Modal open={open} title="⚠️ Confirm Delete" onClose={onCancel}>
      <p>
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Delete Permanently</button>
    </Modal>
  );
}
