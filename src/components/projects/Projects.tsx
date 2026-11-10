"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/projects";
import HoloCard from "./HoloCard";
import { SeloVisual, CofinanceVisual, DisadVisual } from "./Visuals";

gsap.registerPlugin(ScrollTrigger);

const visuals = { selo: SeloVisual, cofinance: CofinanceVisual, disad: DisadVisual };

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

function ProjectBlock({ p }: { p: Project }) {
  const root = useRef<HTMLElement>(null);
  const Visual = visuals[p.visual];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      gsap.from(".holo-wrap", {
        rotateY: -25,
        rotateX: 10,
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
      // Le nom géant en fond glisse en parallaxe
      gsap.fromTo(
        ".project__bgname",
        { xPercent: -40 },
        {
          xPercent: -60,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="project"
      ref={root}
      id={p.slug}
      style={{ ["--pacc" as string]: p.accent }}
      data-chapter={`03|${p.name}`}
    >
      <div className="project__bgname display" aria-hidden="true">{p.name}</div>
      <div className="project__grid">
        <div>
          <div className="project__index mono reveal">
            <span>{p.index}</span>
            <span>{p.kicker}</span>
          </div>
          <h3 className="display reveal">{p.name}</h3>
          <dl className="project__pb">
            <dt className="mono reveal">Problème</dt>
            <dd className="reveal">{p.problem}</dd>
            <dt className="mono reveal">Solution</dt>
            <dd className="reveal">{p.solution}</dd>
            <dt className="mono reveal">Mon rôle</dt>
            <dd className="reveal">{p.role}</dd>
            <dt className="mono reveal">Stack</dt>
            <dd className="reveal">{p.stack.join(" · ")}</dd>
          </dl>
          <div className="project__stats reveal">
            {p.stats.map((s, i) => (
              <span key={s} className={`chip mono ${i === 0 ? "hot" : ""}`}>{s}</span>
            ))}
          </div>
          <div className="project__links reveal">
            {p.links.map((l) => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer" data-cursor="OUVRIR">
                {l.label} <Arrow />
              </a>
            ))}
            {p.note && <span className="project__note mono">{p.note}</span>}
          </div>
        </div>

        <HoloCard tl={p.index} tr={p.status} bl={p.kicker.split("·")[0].trim()} br="MA/K">
          <Visual />
        </HoloCard>
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <div id="projets">
      <div className="projects-intro" data-chapter="03|Projets">
        <div className="ruler" style={{ top: 40 }} />
        <span className="mono" style={{ color: "var(--ink-dim)" }}>Chapitre 03 · {projects.length} problèmes résolus</span>
        <h2 className="display" style={{ marginTop: 30 }}>
          Problèmes <span className="serif">résolus</span>
        </h2>
      </div>
      {projects.map((p) => (
        <ProjectBlock key={p.slug} p={p} />
      ))}
    </div>
  );
}
