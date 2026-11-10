"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/data/profile";

// Three.js ne tourne que dans le navigateur : on désactive le rendu serveur.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero__name .line > span", { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.08 });
      gsap.from(".hero__fade", { opacity: 0, y: 20, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.5 });
      gsap.from(".hero__canvas", { opacity: 0, duration: 2, ease: "power2.out" });

      // Le nom se dilate et s'efface en scrollant
      gsap.to(".hero__name", {
        scale: 1.25,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={root} data-chapter="00|Identité">
      <div className="hero__canvas">
        <HeroScene />
      </div>

      <div className="hero__tag mono hero__fade">
        Génie logiciel · IIT
        <em>Du terrain au code, du code au produit.</em>
      </div>
      <div className="hero__tag2 mono hero__fade">
        Fondateur de Selo
        <em>500+ boutiques en ligne, et ça continue.</em>
      </div>

      <div className="hero__name">
        <h1 className="display">
          <span className="line"><span>{profile.firstName}</span></span>
          <span className="line"><span className="outline">{profile.lastName}</span></span>
        </h1>
      </div>

      <div className="hero__meta">
        <p className="hero__fade">
          {profile.role} basé à {profile.location}. Je transforme des problèmes réels en logiciels qui tournent.
        </p>
        <div className="center hero__fade">
          <span className="hero__scroll mono">
            Scroller
            <i />
          </span>
        </div>
        <span className="right mono hero__fade">{profile.coords}</span>
      </div>
    </section>
  );
}
