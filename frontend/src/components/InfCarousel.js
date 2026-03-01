import { useState, useEffect, useRef } from "react";

const CARD_WIDTH = 280;
const CARD_GAP = 20;

export default function InfiniteCarousel({
  items = [],
  renderItem,
  speed = 0.5,
  cardWidth = CARD_WIDTH,
  paused = false,
}) {
  const step = cardWidth + CARD_GAP;
  const totalWidth = items.length * step;
  const shouldDuplicate = totalWidth < window.innerWidth * 2;
  const displayItems = shouldDuplicate ? [...items, ...items] : items;
  const segment = items.length * step;

  const [offset, setOffset] = useState(0);
  const isPaused = useRef(false);
  const animRef = useRef(null);

  useEffect(() => {
    if (!items.length) return;
    let prev = performance.now();

    function tick(now) {
      if (!isPaused.current && !paused) {
        const delta = now - prev;
        setOffset((o) => {
          let next = o + speed * (delta / 16);
          if (next >= segment) next -= segment;
          return next;
        });
      }
      prev = now;
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [segment, speed, items.length, paused]);

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
      <div style={fadeStyle("right")} />
      <div style={fadeStyle("left")} />

      <div
        style={{
          display: "flex",
          gap: CARD_GAP,
          paddingLeft: 60,
          willChange: "transform",
          transform: `translateX(-${offset}px)`,
        }}
      >
        {displayItems.map((item, i) => (
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
