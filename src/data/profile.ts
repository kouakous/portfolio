// ─────────────────────────────────────────────────────────────
// Ton identité. Ce fichier servira aussi plus tard à l'assistant IA :
// il ne doit contenir QUE des infos vraies.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: "Marc-Aurel",
  lastName: "Kouakou",
  fullName: "Kouakou Aka Marc-Aurel William",
  role: "Ingénieur logiciel",
  tagline: "Je ne code pas des pages. Je résous des problèmes.",
  location: "Abidjan, Côte d'Ivoire",
  coords: "5.3600° N · 4.0083° W",
  school: "Licence 3 Génie Logiciel — Institut Ivoirien de Technologie (IIT)",
  internship: "Stage développeur — Ministère des Eaux et Forêts (DISAD)",
  startup: "Fondateur de Selo",
  email: "kouakouakamarcaurel@gmail.com",
  github: "https://github.com/kouakous",
  // À compléter : ton lien LinkedIn
  linkedin: "",
};

export const stack = [
  { group: "Backend", items: ["Python", "Django", "Django REST", "Channels / WebSocket", "Java", "Odoo"] },
  { group: "Frontend", items: ["Next.js", "React", "Angular", "TypeScript"] },
  { group: "Mobile & desktop", items: ["Flutter", "PySide6", "PyQt5"] },
  { group: "Données", items: ["PostgreSQL", "MySQL", "SQLite", "Redis"] },
  { group: "Embarqué", items: ["Arduino", "ESP32"] },
  { group: "Conception", items: ["UML", "Merise", "Cahier des charges"] },
  { group: "Automatisation", items: ["Selenium", "Pytest"] },
];

export const method = [
  {
    id: "01",
    title: "Comprendre le terrain",
    text: "Avant une ligne de code : entretiens, observation, cahier des charges. Le vrai problème est rarement celui qu'on m'annonce.",
  },
  {
    id: "02",
    title: "Modéliser",
    text: "Cas d'utilisation, classes, MCD / MLD. Je dessine le système avant de le construire, pour que tout le monde parle de la même chose.",
  },
  {
    id: "03",
    title: "Architecturer",
    text: "Choisir la bonne stack, découper en modules, prévoir les rôles et la sécurité. Simple d'abord, évolutif ensuite.",
  },
  {
    id: "04",
    title: "Construire & tester",
    text: "Livraison par itérations, tests automatisés, revues. Une fonctionnalité n'existe que si elle marche à chaque fois.",
  },
  {
    id: "05",
    title: "Livrer & mesurer",
    text: "Mise en ligne, documentation, retours des vrais utilisateurs. Le projet est réussi quand il est utilisé.",
  },
];
