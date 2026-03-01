export default function PriorityBadge({ priority }) {
  const badges = {
    high: "🔴",
    medium: "🟡",
    low: "🟢",
  };
  return <span>{badges[priority]}</span>;
}
