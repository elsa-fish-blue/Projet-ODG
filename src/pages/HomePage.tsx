// Page d'accueil : introduction, carte mentale principale (question + sous-questions),
// conseils de lecture, membres du groupe.

import React, { useEffect, useState } from "react";
import MindMapMain from "../components/MindMapMain";
import { MAIN_QUESTION, READING_ORDER, GROUP_MEMBERS } from "../data/mindmap";

const HomePage: React.FC = () => {
  // Animation d'apparition progressive au chargement de la page
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Génère un style d'animation décalée pour chaque élément
  const fadeIn = (delayMs: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.7s ease ${delayMs}ms, transform 0.7s ease ${delayMs}ms`,
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #F5EFE6 0%, #EDE4D8 60%, #E8DDD0 100%)" }}
    >

      {/* ── En-tête ── */}
      <header className="w-full px-6 pt-10 pb-4 text-center">

        {/* Sous-titre discret */}
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-4"
          style={{ ...fadeIn(0), color: "#A07850" }}
        >
          Projet de Physique — Carte Mentale Interactive
        </p>

        {/* Question principale */}
        <h1
          className="text-2xl md:text-3xl font-bold leading-snug max-w-4xl mx-auto mb-6"
          style={{ ...fadeIn(100), fontFamily: "'Lora', Georgia, serif", color: "#3E2A10" }}
        >
          {MAIN_QUESTION}
        </h1>

        {/* Séparateur décoratif */}
        <div className="flex items-center justify-center gap-3 mb-7" style={fadeIn(180)}>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, #B07D3A)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#B07D3A" }} />
          <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, #B07D3A)" }} />
        </div>

        {/* ── Introduction naturelle ── */}
        <div className="max-w-2xl mx-auto mb-7 text-left" style={fadeIn(260)}>
          <p
            className="leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", color: "#4A3018" }}
          >
            En 1998, le film <em>Armageddon</em> popularisait l'idée d'envoyer une équipe de
            foreurs sur un astéroïde géant pour le faire sauter depuis l'intérieur. L'image est
            restée. Mais derrière le spectacle, une vraie question de physique se pose : les
            ordres de grandeur sont-ils seulement compatibles avec les moyens dont nous disposons ?
          </p>
          <p
            className="leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", color: "#4A3018" }}
          >
            Nous avons choisi de prendre cette question au sérieux, en partant d'un scénario
            concret : un astéroïde de la taille du Texas se dirige vers la Terre. Peut-on le
            dévier ? Peut-on le détruire avec une bombe nucléaire ? Dès que l'on commence à
            poser les chiffres, les réponses réservent des surprises — et pas toujours celles
            que l'on attend.
          </p>
          <p
            className="leading-relaxed"
            style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", color: "#4A3018" }}
          >
            Cette carte mentale retrace notre raisonnement, des caractéristiques physiques de
            l'objet jusqu'aux limites de chaque stratégie d'intervention. Chaque branche peut
            se lire indépendamment, mais l'ordre que nous proposons ci-dessous suit le fil
            naturel de notre analyse.
          </p>
        </div>

        {/* ── Conseils de lecture — encadré sobre, texte seul sans pastilles ── */}
        <div
          className="max-w-2xl mx-auto mb-5 text-left rounded-xl px-5 py-4"
          style={{
            ...fadeIn(380),
            backgroundColor: "rgba(255,255,255,0.60)",
            border: "1px solid #D4BFA0",
          }}
        >
          {/* Titre de l'encadré */}
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#8B6340" }}
          >
            Conseils de lecture
          </p>
          {/* Texte de l'ordre de lecture — sans pastilles ni couleurs */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#5C3D1E", fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {READING_ORDER}
          </p>
        </div>

        {/* Instruction d'interaction avec icône ampoule */}
        <p className="text-xs italic flex items-center justify-center gap-1" style={{ ...fadeIn(460), color: "#A07850" }}>
          <span role="img" aria-label="conseil">💡</span>
          Cliquez sur une bulle pour explorer ses sous-questions
        </p>
      </header>

      {/* ── Carte mentale principale ──
          MindMapMain gère son propre fond (identique à l'encadré conseils de lecture)
          et ses boutons de navigation vers les branches. */}
      <main className="flex-1 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <MindMapMain />
        </div>
      </main>

      {/* ── Pied de page : membres du groupe + mentions ── */}
      <footer className="w-full px-6 py-8 mt-4">
        <div className="max-w-3xl mx-auto text-center">

          {/* Séparateur */}
          <div className="flex items-center gap-4 mb-5">
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #C9A87C)" }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#8B6340" }}
            >
              Membres du groupe
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #C9A87C)" }} />
          </div>

          {/* Liste des membres — noms seuls, sans icône */}
          <div className="flex flex-wrap justify-center gap-3 mb-5">
            {GROUP_MEMBERS.map((member, i) => (
              <div
                key={i}
                className="rounded-2xl px-5 py-3 text-center shadow-sm"
                style={{
                  backgroundColor: "rgba(255,255,255,0.65)",
                  border: "1px solid #D4BFA0",
                  minWidth: 140,
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "#3E2A10" }}>
                  {member.name}
                </p>
              </div>
            ))}
          </div>

          {/* Mentions légales */}
          <p className="text-xs mb-1" style={{ color: "#A07850" }}>
            Projet de Physique · 2026
          </p>
          <p className="text-xs" style={{ color: "#C0A882" }}>
            Site internet conçu avec l'assistance de l'intelligence artificielle
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
