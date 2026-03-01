export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
