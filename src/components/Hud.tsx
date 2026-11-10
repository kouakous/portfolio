"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger);

// Interface fixe : logo, chapitre courant, règle de progression en bas.
export default function Hud() {
  const bar = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState({ id: "00", name: "Démarrage" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      });

      document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 50%",
          end: "bottom 50%",
          refreshPriority: -1, // calculé après les sections épinglées
          onToggle: (self) => {
            if (self.isActive) {
              const [id, name] = (sec.dataset.chapter ?? "").split("|");
              setChapter({ id, name });
            }
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="hud">
      <div className="hud__top">
        <a href="#top" className="hud__logo" data-cursor="RETOUR EN HAUT">
          <b>MA/K</b>
          <span className="mono">Ingénieur logiciel</span>
        </a>
        <div className="hud__chapter mono">
          <span>CH.{chapter.id}</span>
          <span>{chapter.name}</span>
        </div>
        <a className="hud__mail mono" href={`mailto:${profile.email}`} data-cursor="ÉCRIRE">
          Disponible — me contacter
        </a>
      </div>
      <div className="hud__progress">
        <div className="hud__ticks" />
        <div className="hud__bar" ref={bar} />
      </div>
    </div>
  );
}
