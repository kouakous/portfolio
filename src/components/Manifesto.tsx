"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SENTENCE = "Je ne code pas des pages. Je résous des problèmes.";

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Chaque mot s'allume au rythme du scroll
      gsap.to(".manifesto__text .w", {
        opacity: 1,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: { trigger: ".manifesto__text", start: "top 80%", end: "bottom 45%", scrub: true },
      });
      gsap.from(".manifesto__grid p", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".manifesto__grid", start: "top 85%" },
      });
      gsap.to(".manifesto__bigbg", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const words = SENTENCE.split(" ");

  return (
    <section className="manifesto" ref={root} data-chapter="01|Manifeste">
      <div className="chapter-head mono">
        <span>Chapitre 01</span>
        <span>À propos</span>
      </div>

      <h2 className="manifesto__text display">
        {words.map((w, i) => (
          <span key={i} className={`w ${w === "problèmes." ? "serif accent" : ""}`}>
            {w}
          </span>
        ))}
      </h2>

      <div className="manifesto__grid">
        <p>
          Je suis étudiant en Licence 3 Génie Logiciel à l&apos;IIT et fondateur de Selo. Ce qui m&apos;intéresse,
          ce n&apos;est pas la techno pour la techno : c&apos;est le moment où un commerçant, une banque ou un
          ministère arrête de perdre du temps parce qu&apos;un outil fait le travail.
        </p>
        <p>
          Backend, web, mobile, embarqué : je choisis l&apos;outil selon le problème. Chaque projet commence par
          le terrain (entretiens, cahier des charges, modélisation) et se termine en production, utilisé par de
          vraies personnes.
        </p>
      </div>
      <div className="manifesto__bigbg display" aria-hidden="true">SYSTÈME</div>
    </section>
  );
}
