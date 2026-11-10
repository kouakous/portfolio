"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { stack } from "@/data/profile";

// "Sélection de module" : on choisit un domaine, les technos apparaissent.
export default function Stack() {
  const [i, setI] = useState(0);
  const current = stack[i];

  return (
    <section className="stack" data-chapter="04|Arsenal">
      <div className="stack__head">
        <h2 className="display">
          L&apos;<span className="serif accent">arsenal</span>
        </h2>
        <p className="mono" style={{ color: "var(--ink-dim)", maxWidth: 340 }}>
          Chapitre 04 · Choisis un module. Je prends l&apos;outil qui convient au problème, pas l&apos;inverse.
        </p>
      </div>

      <div className="stack__body">
        <div className="stack__tabs" role="tablist">
          {stack.map((g, k) => (
            <button
              key={g.group}
              role="tab"
              aria-selected={k === i}
              className={`stack__tab mono ${k === i ? "on" : ""}`}
              onMouseEnter={() => setI(k)}
              onFocus={() => setI(k)}
              onClick={() => setI(k)}
              data-cursor="SÉLECTIONNER"
            >
              <span>{g.group}</span>
              <span>{String(g.items.length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="stack__panel blueprint" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.group}
              className="stack__items"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.05 } }, hidden: {} }}
            >
              {current.items.map((t) => (
                <motion.span
                  key={t}
                  className="stack__item"
                  variants={{
                    hidden: { opacity: 0, y: 30, rotateX: -60 },
                    show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.group}
              className="stack__group display"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
              aria-hidden="true"
            >
              {current.group}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
