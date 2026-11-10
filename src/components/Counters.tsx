"use client";

// Bande défilante avant le contact (le bloc de chiffres a été retiré :
// ces chiffres sont déjà dans les sections projets).
const WORDS = ["Comprendre", "Modéliser", "Construire", "Livrer", "Mesurer", "Recommencer"];

export default function Counters() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__inner">
        {[...WORDS, ...WORDS].map((w, i) => (
          <span key={i} style={{ display: "inline-flex", gap: 48 }}>
            {w} <b>✳</b>
          </span>
        ))}
      </div>
    </div>
  );
}
