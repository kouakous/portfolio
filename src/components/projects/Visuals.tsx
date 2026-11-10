"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// Un visuel animé sur mesure par projet.
// ─────────────────────────────────────────────────────────────

/* SELO : des boutiques qui se construisent + compteur */
const SHOP_COLORS = ["#ff5b1f", "#5ce1e6", "#b8f15a", "#f2c14e", "#e86fd3", "#e8e6df", "#7c8cff", "#ff8a65"];

export function SeloVisual() {
  const root = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [colors, setColors] = useState<string[]>(() => Array.from({ length: 16 }, (_, i) => SHOP_COLORS[i % 8]));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } })
        .from(".selo-shop", { scale: 0, opacity: 0, duration: 0.5, stagger: { each: 0.05, from: "random" }, ease: "back.out(2)" })
        .to(obj, { v: 500, duration: 2, ease: "power3.out", onUpdate: () => setN(Math.round(obj.v)) }, 0);
    }, root);

    // Les boutiques changent de thème en boucle : c'est la personnalisation
    const id = setInterval(() => {
      setColors((c) => c.map((col) => (Math.random() < 0.2 ? SHOP_COLORS[Math.floor(Math.random() * 8)] : col)));
    }, 900);
    return () => {
      ctx.revert();
      clearInterval(id);
    };
  }, []);

  return (
    <div className="selo-v" ref={root}>
      <span className="mono" style={{ color: "var(--ink-dim)" }}>Boutiques créées</span>
      <div className="selo-v__count">{n}{n >= 500 ? "+" : ""}</div>
      <div className="selo-v__grid">
        {colors.map((c, i) => (
          <div className="selo-shop" key={i}>
            <i />
            <i style={{ background: c, transition: "background .6s" }} />
            <i />
          </div>
        ))}
      </div>
    </div>
  );
}

/* COFINANCE : la vraie suite de tests qui défile */
const TEST_LINES = [
  "$ pytest",
  // Nombre réel de tests par fichier (relevé avec pytest -v)
  "tests/test_accounts.py ..........",
  "tests/test_credits.py ........",
  "tests/test_repayments.py ........",
  "tests/test_insurance.py .......",
  "tests/test_finance.py .......",
  "tests/test_notifications.py ......",
  "tests/test_support_chat.py ......",
  "tests/test_dashboard.py ....",
  "tests/test_chat_consumer.py ...",
];

export function CofinanceVisual() {
  const root = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } })
        .to(obj, {
          v: TEST_LINES.length,
          duration: 2.2,
          ease: "none",
          onUpdate: () => setLines(Math.floor(obj.v)),
          onComplete: () => setDone(true),
        })
        .from(".term__chart i", { scaleY: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  const bars = [32, 48, 41, 60, 55, 72, 66, 84, 78, 95];

  return (
    <div className="term" ref={root}>
      <div className="term__bar">
        <i /><i /><i />
        <span className="mono">cofinance_ci — zsh</span>
      </div>
      <div className="term__body">
        {TEST_LINES.slice(0, lines).map((l, i) => (
          <div key={l} className={i === 0 ? "hl" : ""}>
            {l} {i > 0 && <span className="pass">PASSED</span>}
          </div>
        ))}
        {done && <div className="pass">===== 59 passed in 1.35s =====</div>}
      </div>
      <div className="term__chart" aria-hidden="true">
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

/* DISAD : le parcours d'une demande d'assistance entre les rôles */
const NODES = [
  { x: 20, y: 30, t: "Agent", s: "déclare la demande" },
  { x: 200, y: 30, t: "Chef de service", s: "valide" },
  { x: 200, y: 200, t: "Technicien", s: "intervient" },
  { x: 20, y: 200, t: "Administrateur", s: "suit & archive" },
];

export function DisadVisual() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pts = NODES.map((n) => ({ x: n.x + 70, y: n.y + 28 }));
      const tl = gsap.timeline({ repeat: -1, paused: true });
      pts.forEach((p, i) => {
        const next = pts[(i + 1) % pts.length];
        tl.call(() => setActive(i))
          .to(".packet", { attr: { cx: p.x, cy: p.y }, duration: 0.01 })
          .to({}, { duration: 0.7 })
          .to(".packet", { attr: { cx: next.x, cy: next.y }, duration: 1, ease: "power2.inOut" });
      });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 85%",
        end: "bottom 15%",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
      gsap.from(".flow .node", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flow" ref={root}>
      <svg viewBox="0 0 360 290">
        <path className="wire" d="M160 58 H200 M270 86 V200 M200 228 H160 M90 200 V86" />
        {NODES.map((n, i) => (
          <g key={n.t} className={`node ${active === i ? "active" : ""}`}>
            <rect x={n.x} y={n.y} width="140" height="56" rx="4" />
            <text x={n.x + 12} y={n.y + 24}>{n.t}</text>
            <text className="sub" x={n.x + 12} y={n.y + 42}>{n.s}</text>
          </g>
        ))}
        <circle className="packet" cx="90" cy="58" r="6" />
        <text x="96" y="148" style={{ fontFamily: "var(--font-mono)", fontSize: 9, fill: "var(--ink-faint)", letterSpacing: ".12em" }}>
          DEMANDE #0427
        </text>
        <text x="20" y="282" style={{ fontFamily: "var(--font-mono)", fontSize: 8, fill: "var(--ink-faint)", letterSpacing: ".12em" }}>
          NOTIFICATIONS EN TEMPS RÉEL À CHAQUE ÉTAPE
        </text>
      </svg>
    </div>
  );
}
