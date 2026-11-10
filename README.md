# Portfolio — Marc-Aurel Kouakou

Portfolio immersif (Next.js 16 · React Three Fiber · GSAP ScrollTrigger · Lenis · Motion).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvre http://localhost:3000

## Modifier le contenu

Tout le texte est dans **2 fichiers** (ils serviront aussi à l'assistant IA) :

- `src/data/profile.ts` : identité, stack, méthode, liens (ajoute ton LinkedIn)
- `src/data/projects.ts` : projets et compteurs

## Structure

| Fichier | Rôle |
|---|---|
| `src/components/HeroScene.tsx` | Scène 3D : terrain de points (shader GLSL) + noyau filaire |
| `src/components/SmoothScroll.tsx` | Lenis synchronisé avec GSAP |
| `src/components/Loader.tsx` | Écran de démarrage « boot système » |
| `src/components/Hud.tsx` | Interface fixe : chapitre courant + règle de progression |
| `src/components/Method.tsx` | Scroll horizontal épinglé, schémas qui se dessinent |
| `src/components/projects/` | Cartes holographiques + visuel animé par projet |
| `src/components/Stack.tsx` | Sélection de module (Motion) |
| `src/components/Contact.tsx` | Révélation circulaire au scroll |

## Déployer (gratuit)

1. Pousse le dossier sur GitHub.
2. Sur vercel.com → « Add New Project » → choisis le dépôt → Deploy.
