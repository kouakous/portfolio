"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Curseur en croix de visée avec coordonnées X/Y en temps réel.
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el.current, "x", { duration: 0.25, ease: "power3" });
    const yTo = gsap.quickTo(el.current, "y", { duration: 0.25, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      el.current?.classList.toggle("is-hover", !!target);
      if (label.current) {
        const custom = target?.getAttribute("data-cursor");
        label.current.textContent =
          custom ?? `X:${String(e.clientX).padStart(4, "0")} Y:${String(e.clientY).padStart(4, "0")}`;
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="cursor" ref={el} aria-hidden="true">
      <div className="cursor__cross" />
      <span className="cursor__label mono" ref={label} />
    </div>
  );
}
