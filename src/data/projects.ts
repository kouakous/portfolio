// ─────────────────────────────────────────────────────────────
// Tes projets. Pour en ajouter un : copie un bloc et remplis-le.
// "visual" choisit l'animation personnalisée affichée dans la section.
// ─────────────────────────────────────────────────────────────

export type Project = {
  slug: string;
  index: string;
  name: string;
  kicker: string;
  problem: string;
  solution: string;
  role: string;
  status: string;
  stats: string[];
  stack: string[];
  links: { label: string; href: string }[];
  note?: string;
  accent: string;
  visual: "selo" | "cofinance" | "disad";
};

export const projects: Project[] = [
  {
    slug: "selo",
    index: "P.01",
    name: "Selo",
    kicker: "SaaS · E-commerce · En production",
    problem:
      "En Côte d'Ivoire, la plupart des commerçants vendent sur WhatsApp et Facebook, sans vitrine propre ni paiement en ligne.",
    solution:
      "Une plateforme qui permet à n'importe quel vendeur de créer sa boutique en ligne personnalisée en quelques minutes, avec paiement Wave intégré.",
    role: "Fondateur — produit, développement, commercial",
    status: "En ligne · en croissance",
    stats: ["500+ boutiques créées", "Paiement Wave", "Boutiques personnalisables"],
    stack: ["SaaS", "Paiement mobile", "Multi-boutiques"],
    links: [{ label: "Visiter selo.ci", href: "https://selo.ci" }],
    accent: "#ff5b1f",
    visual: "selo",
  },
  {
    slug: "cofinance",
    index: "P.02",
    name: "CoFinance CI",
    kicker: "Fintech · Microfinance · Temps réel",
    problem:
      "Les établissements de microfinance gèrent encore crédits, remboursements et support client avec des outils éparpillés.",
    solution:
      "Une plateforme complète : demandes de microcrédit avec score d'éligibilité, échéanciers et pénalités automatiques, assurance mobile, chat de support en temps réel et tableaux de bord par rôle.",
    role: "Conception et développement full-stack",
    status: "Fonctionnel · 59/59 tests verts",
    stats: ["59 / 59 tests", "3 rôles", "Chat WebSocket"],
    stack: ["Django 5", "DRF + JWT", "Channels", "PostgreSQL", "Redis", "Chart.js"],
    links: [{ label: "Code sur GitHub", href: "https://github.com/kouakous/cofinance_ci" }],
    accent: "#5ce1e6",
    visual: "cofinance",
  },
  {
    slug: "disad",
    index: "P.03",
    name: "Assistance informatique",
    kicker: "Stage · Ministère des Eaux et Forêts (DISAD)",
    problem:
      "Le traitement des demandes d'assistance informatique manquait de suivi, et les informations étaient mal conservées.",
    solution:
      "Numérisation complète du processus : déclaration, validation, affectation et traitement des demandes, avec notifications en temps réel et documentation pour chaque rôle.",
    role: "Développeur stagiaire — conception et réalisation",
    status: "Livré · documenté",
    stats: ["14 écrans", "4 rôles", "Notifications temps réel"],
    stack: ["Django", "PySide6 (client lourd)", "Temps réel"],
    links: [],
    note: "Projet institutionnel — code privé.",
    accent: "#b8f15a",
    visual: "disad",
  },
];

export const counters = [
  { value: 500, suffix: "+", label: "boutiques créées sur Selo" },
  { value: 59, suffix: "/59", label: "tests verts sur CoFinance CI" },
  { value: 14, suffix: "", label: "écrans livrés au ministère" },
  { value: 17, suffix: "", label: "dépôts GitHub" },
];
