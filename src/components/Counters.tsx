"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { counters } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Comprendre", "Modéliser", "Construire", "Livrer", "Mesurer", "Recommencer"];

export default function Counters() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".counter b span").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__inner">
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i} style={{ display: "inline-flex", gap: 48 }}>
              {w} <b>✳</b>
            </span>
          ))}
        </div>
      </div>
      <div className="counters">
        {counters.map((c) => (
          <div className="counter" key={c.label}>
            <b>
              <span data-value={c.value}>0</span>
              <small>{c.suffix}</small>
            </b>
            <p className="mono">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
