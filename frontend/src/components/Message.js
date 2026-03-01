export default function Message({ message, error = false }) {
  const messageStyle = {
    ...baseMessageStyle,
    background: error
      ? "#ffe8e8"
      : "linear-gradient(135deg, #f0f0ff 0%, #e8fff5 100%)",
    border: error ? "2px solid #ff4d4d" : "2px solid #1dd1a1",
    color: error ? "#8b0000" : "#0a0909",
  };

  return <p style={messageStyle}>{message}</p>;
}

const baseMessageStyle = {
  padding: "24px",
  margin: "20px 60px",
  borderRadius: "12px",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "500",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};
