import { useState, useEffect, useRef } from "react";

const CARD_WIDTH = 280;
const CARD_GAP = 20;

export default function InfiniteCarousel({
  tasks = [],
  renderItem,
  speed = 0.5,
  cardWidth = CARD_WIDTH,
}) {
  const step = cardWidth + CARD_GAP;
  const doubled = [...tasks, ...tasks]; // double for infinite loop
  const segment = tasks.length * step; // width of one copy

  const [offset, setOffset] = useState(0);
  const isPaused = useRef(false);
  const animRef = useRef(null);

  useEffect(() => {
    if (!tasks.length) return;
    let prev = performance.now();

    function tick(now) {
      if (!isPaused.current) {
        const delta = now - prev;
        setOffset((o) => {
          let next = o + speed * (delta / 16);
          if (next >= segment) next -= segment; // silent snap
          return next;
        });
      }
      prev = now;
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [segment, speed, tasks.length]);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        padding: "20px 0",
      }}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      {/* Fade edges */}
      <div style={fadeStyle("right")} />
      <div style={fadeStyle("left")} />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          gap: CARD_GAP,
          paddingLeft: 60,
          willChange: "transform",
          transform: `translateX(-${offset}px)`,
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{ minWidth: cardWidth }}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

function fadeStyle(side) {
  return {
    position: "absolute",
    top: 0,
    bottom: 0,
    [side === "left" ? "left" : "right"]: 0,
    width: 120,
    zIndex: 2,
    pointerEvents: "none",
    background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #ffffff, transparent)`,
  };
}
