"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Révélation circulaire qui s'ouvre au scroll
      gsap.to(root.current, {
        clipPath: "circle(150% at 50% 50%)",
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 15%", scrub: true },
      });
      gsap.from(".contact h2 > span", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 40%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <section className="contact" ref={root} id="contact" data-chapter="05|Contact">
      <span className="mono">Chapitre 05 · Contact</span>
      <h2 className="display">
        <span className="serif">Un problème à résoudre ?</span>
        <span style={{ display: "block" }}>Parlons-en.</span>
      </h2>
      <a className="contact__mail" href={`mailto:${profile.email}`} data-cursor="ÉCRIRE">
        {profile.email}
      </a>
      <div className="contact__links mono">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
        <a href="https://selo.ci" target="_blank" rel="noreferrer">Selo ↗</a>
      </div>
      <div className="contact__foot mono">
        <span>© {year} {profile.fullName}</span>
        <span>Conçu et codé à {profile.location}</span>
        <span>{profile.coords}</span>
      </div>
    </section>
  );
}
