"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { method } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger);

// Un schéma "blueprint" par étape. Les traits se dessinent au scroll.
const schematics: Record<string, React.ReactNode> = {
  "01": (
    <svg viewBox="0 0 400 220">
      <rect className="draw" x="20" y="40" width="120" height="60" rx="4" />
      <path className="draw" d="M40 100 L30 125 L65 100" />
      <text x="34" y="74">« ça ne marche pas »</text>
      <rect className="draw" x="230" y="20" width="150" height="60" rx="4" />
      <path className="draw" d="M360 80 L372 104 L338 80" />
      <text x="244" y="54">quel est le vrai besoin ?</text>
      <circle className="draw hot" cx="215" cy="150" r="38" />
      <path className="draw hot" d="M242 177 L280 212" />
      <text x="190" y="154">besoin réel</text>
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 400 220">
      <rect className="draw" x="20" y="20" width="120" height="80" />
      <path className="draw" d="M20 44 H140 M20 74 H140" />
      <text x="30" y="37">VENDEUR</text>
      <text x="30" y="62">+ id · nom</text>
      <text x="30" y="90">+ créerBoutique()</text>
      <rect className="draw" x="250" y="20" width="130" height="80" />
      <path className="draw" d="M250 44 H380 M250 74 H380" />
      <text x="260" y="37">BOUTIQUE</text>
      <text x="260" y="62">+ id · thème</text>
      <text x="260" y="90">+ publier()</text>
      <path className="draw hot" d="M140 60 H250" />
      <text x="168" y="52">1 ─── 0..*</text>
      <rect className="draw" x="135" y="150" width="130" height="56" />
      <path className="draw" d="M135 172 H265" />
      <text x="145" y="166">COMMANDE</text>
      <path className="draw hot" d="M315 100 V178 H265" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 400 220">
      <rect className="draw" x="40" y="14" width="320" height="44" />
      <text x="56" y="40">CLIENT · web / mobile / desktop</text>
      <rect className="draw hot" x="40" y="88" width="320" height="44" />
      <text x="56" y="114">API · règles métier · rôles · sécurité</text>
      <rect className="draw" x="40" y="162" width="150" height="44" />
      <text x="56" y="188">BASE DE DONNÉES</text>
      <rect className="draw" x="210" y="162" width="150" height="44" />
      <text x="226" y="188">TEMPS RÉEL · cache</text>
      <path className="draw" d="M200 58 V88 M115 132 V162 M285 132 V162" />
    </svg>
  ),
  "04": (
    <svg viewBox="0 0 400 220">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect className="draw" x="30" y={20 + i * 38} width="22" height="22" />
          <path className="draw hot" d={`M35 ${31 + i * 38} l5 6 l9 -11`} />
          <path className="draw" d={`M70 ${31 + i * 38} H${200 + i * 30}`} />
        </g>
      ))}
      <text x="270" y="200">tests : PASSED</text>
    </svg>
  ),
  "05": (
    <svg viewBox="0 0 400 220">
      <rect className="draw" x="30" y="70" width="90" height="80" />
      <path className="draw" d="M30 96 H120 M30 122 H120" />
      <text x="40" y="168">SERVEUR</text>
      <path className="draw hot" d="M120 110 H210" />
      <circle className="draw" cx="280" cy="110" r="70" />
      <ellipse className="draw" cx="280" cy="110" rx="30" ry="70" />
      <path className="draw" d="M210 110 H350 M222 75 H338 M222 145 H338" />
      {[
        [250, 60],
        [320, 90],
        [300, 160],
        [240, 140],
      ].map(([x, y], i) => (
        <circle key={i} className="draw hot" cx={x} cy={y} r="5" />
      ))}
      <text x="230" y="205">utilisateurs réels</text>
    </svg>
  ),
};

export default function Method() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGGeometryElement>(".step__svg .draw");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      const mm = gsap.matchMedia();

      // Desktop : la section est épinglée et les étapes défilent à l'horizontale
      mm.add("(min-width: 901px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".method__pin",
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".step").forEach((step) => {
          gsap.to(step.querySelectorAll(".draw"), {
            strokeDashoffset: 0,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: {
              trigger: step,
              containerAnimation: tween,
              start: "left 90%",
              end: "center 55%",
              scrub: true,
            },
          });
        });
      });

      // Mobile : défilement vertical classique
      mm.add("(max-width: 900px)", () => {
        gsap.utils.toArray<HTMLElement>(".step").forEach((step) => {
          gsap.to(step.querySelectorAll(".draw"), {
            strokeDashoffset: 0,
            duration: 1.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 75%" },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="method" ref={root} data-chapter="02|Méthode">
      <div className="method__pin">
        <div className="method__title">
          <h2 className="display">
            Ma <span className="serif accent">méthode</span>
          </h2>
          <span className="mono" style={{ color: "var(--ink-dim)" }}>Chapitre 02 · 5 étapes</span>
        </div>
        <div className="method__track blueprint" ref={track}>
          {method.map((s) => (
            <article className="step" key={s.id}>
              <span className="mono" style={{ color: "var(--accent)" }}>Étape {s.id}</span>
              <span className="step__num">{s.id}</span>
              <div className="step__svg">{schematics[s.id]}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
