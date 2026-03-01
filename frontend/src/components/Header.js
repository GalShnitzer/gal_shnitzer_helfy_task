export default function Header() {
  return (
    <header
      style={{
        padding: "20px",
        background: "linear-gradient(135deg, #54a0ff 0%, #1dd1a1 100%)",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ margin: "0 0 8px", fontSize: "32px" }}>✅ Task Manager</h1>
      <p style={{ margin: "0", fontSize: "16px", opacity: 0.95 }}>
        Have a productive day!
      </p>
    </header>
  );
}
