"use client";

import { useRef } from "react";

// Carte façon "carte de collection" : elle s'incline vers la souris et
// un reflet holographique suit le curseur (variables CSS --mx / --my).
export default function HoloCard({
  children,
  tl,
  tr,
  bl,
  br,
}: {
  children: React.ReactNode;
  tl: string;
  tr: string;
  bl: string;
  br: string;
}) {
  const card = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateY(${(px - 0.5) * 16}deg) rotateX(${(0.5 - py) * 16}deg)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    if (card.current) card.current.style.transform = "rotateY(0) rotateX(0)";
  };

  return (
    <div className="holo-wrap">
      <div className="holo" ref={card} onPointerMove={onMove} onPointerLeave={onLeave} data-cursor="INSPECTER">
        <div className="holo__inner blueprint" />
        <div className="holo__frame" />
        <span className="holo__corner tl mono">{tl}</span>
        <span className="holo__corner tr mono">{tr}</span>
        <span className="holo__corner bl mono">{bl}</span>
        <span className="holo__corner br mono">{br}</span>
        <div className="holo__screen">{children}</div>
        <div className="holo__foil" />
      </div>
    </div>
  );
}
