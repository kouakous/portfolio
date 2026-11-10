"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Écran de démarrage façon "boot système".
const LINES = [
  "> init marc-aurel.sys",
  "> chargement des modules : backend, frontend, mobile, embarqué",
  "> connexion aux projets : selo · cofinance · disad",
  "> compilation de la méthode : comprendre → modéliser → construire",
  "> système prêt.",
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        onDone();
      },
    });

    tl.to(obj, {
      v: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(obj.v));
        setShown(Math.min(LINES.length, Math.floor(obj.v / 19) + 1));
      },
    })
      .to(".loader__bar i", { scaleX: 1, duration: 2.4, ease: "power2.inOut" }, 0)
      .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "+=0.25");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [onDone]);

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__lines">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={l}>
            {l} {i < shown - 1 || shown === LINES.length ? <span className="ok">[OK]</span> : null}
          </div>
        ))}
      </div>
      <div className="loader__count">{String(count).padStart(3, "0")}</div>
      <div className="loader__bar"><i /></div>
    </div>
  );
}
