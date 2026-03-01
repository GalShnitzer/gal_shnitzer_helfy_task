export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalBoxStyle}>
        <button
          onClick={onClose}
          style={closeButtonStyle}
          onMouseEnter={(e) =>
            (e.target.style.background = "rgba(0, 0, 0, 0.05)")
          }
          onMouseLeave={(e) => (e.target.style.background = "none")}
        >
          ✕
        </button>
        <h2 style={titleStyle}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};

const modalBoxStyle = {
  background: "#fff",
  borderRadius: "12px",
  padding: "24px",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  position: "relative",
};

const closeButtonStyle = {
  position: "absolute",
  top: "12px",
  right: "12px",
  background: "none",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  padding: "0",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  transition: "background 0.2s",
};

const titleStyle = {
  margin: "0 0 16px",
  color: "#0a0909",
};
