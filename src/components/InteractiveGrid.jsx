"use client";

import { useEffect, useRef } from "react";

export default function InteractiveGrid({ children, className = "" }) {
  const frame = useRef(0);
  const target = useRef({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  const current = useRef({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  const element = useRef(null);

  useEffect(() => {
    const node = element.current;
    if (!node) return undefined;

    const render = () => {
      const next = current.current;
      const goal = target.current;
      next.x += (goal.x - next.x) * 0.08;
      next.y += (goal.y - next.y) * 0.08;
      next.rotateX += (goal.rotateX - next.rotateX) * 0.08;
      next.rotateY += (goal.rotateY - next.rotateY) * 0.08;
      node.style.setProperty("--grid-x", `${next.x}%`);
      node.style.setProperty("--grid-y", `${next.y}%`);
      node.style.setProperty("--grid-rotate-x", `${next.rotateX}deg`);
      node.style.setProperty("--grid-rotate-y", `${next.rotateY}deg`);
      frame.current = requestAnimationFrame(render);
    };

    frame.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const handleMove = (event) => {
    const rect = element.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.current = {
      x,
      y,
      rotateX: (50 - y) * 0.06,
      rotateY: (x - 50) * 0.06,
    };
  };

  const handleLeave = () => {
    target.current = { x: 50, y: 50, rotateX: 0, rotateY: 0 };
  };

  return (
    <div
      ref={element}
      className={`interactive-grid ${className}`}
      onPointerMove={handleMove}
      onPointerEnter={handleMove}
      onPointerLeave={handleLeave}
    >
      <span className="interactive-grid__surface" aria-hidden="true" />
      <div className="interactive-grid__content">{children}</div>
    </div>
  );
}
