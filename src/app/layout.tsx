import type { Metadata, Viewport } from "next";
// Polices embarquées localement (aucune requête externe) :
// display condensée (titres géants), serif italique (accents),
// mono (légendes "techniques"), sans pour le texte courant.
import "@fontsource/big-shoulders-display/latin-700";
import "@fontsource/big-shoulders-display/latin-900";
import "@fontsource/instrument-serif/latin-400-italic";
import "@fontsource/jetbrains-mono/latin-400";
import "@fontsource/jetbrains-mono/latin-500";
import "@fontsource/inter-tight/latin-400";
import "@fontsource/inter-tight/latin-500";
import "@fontsource/inter-tight/latin-600";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc-Aurel Kouakou — Ingénieur logiciel",
  description: "Je ne code pas des pages. Je résous des problèmes. Portfolio de Marc-Aurel Kouakou, ingénieur logiciel à Abidjan.",
};

export const viewport: Viewport = {
  themeColor: "#07080a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
