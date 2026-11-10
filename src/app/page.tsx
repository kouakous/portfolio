"use client";

import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Hud from "@/components/Hud";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Method from "@/components/Method";
import Projects from "@/components/projects/Projects";
import Stack from "@/components/Stack";
import Counters from "@/components/Counters";
import Contact from "@/components/Contact";

export default function Home() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  // Une fois le loader parti et les polices chargées, on recalcule les positions
  useEffect(() => {
    if (!ready) return;
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [ready]);

  return (
    <>
      {!ready && <Loader onDone={done} />}
      <SmoothScroll />
      <Cursor />
      <Hud />
      <div className="grain" aria-hidden="true" />
      <main>
        <Hero ready={ready} />
        <Manifesto />
        <Method />
        <Projects />
        <Stack />
        <Counters />
        <Contact />
      </main>
    </>
  );
}
