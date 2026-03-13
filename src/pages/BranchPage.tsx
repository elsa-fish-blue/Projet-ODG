// BranchPage.tsx
// Page de détail d'une branche du projet.
// Structure :
//   1. En-tête avec le titre de la branche
//   2. Boutons de navigation entre les 3 branches (au-dessus de la carte)
//   3. Carte mentale de la branche (MindMapBranch)
//   4. Bouton retour à la carte principale (sous la carte)
//   5. Développement de chaque sous-sous-question dans l'ordre de lecture (gauche → droite)
//   6. Pied de page avec membres du groupe et mentions

import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BRANCHES, GROUP_MEMBERS } from "../data/mindmap";
import MindMapBranch from "../components/MindMapBranch";
import MathFormula from "../components/MathFormula";

// Ordre logique de lecture des branches
const ORDERED_IDS = ["caracteristiques", "deviation", "explosion"];

const BranchPage: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const navigate     = useNavigate();

  // Références vers chaque section de développement pour le scroll automatique
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const branch = BRANCHES.find((b) => b.id === branchId);

  // Scroll vers une ancre de l'URL au chargement (ex: /branch/caracteristiques#masse)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [branchId]);

  // Cas d'URL invalide
  if (!branch) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "#F5EFE6" }}
      >
        <p className="text-xl" style={{ color: "#5C3D1E" }}>Branche introuvable.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-xl text-white text-sm font-medium shadow-sm"
          style={{ backgroundColor: "#8B5E3C" }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  // Scroll vers la section de développement d'une sous-sous-question
  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  // Labels courts pour les boutons de navigation entre branches
  const labels: Record<string, string> = {
    caracteristiques: "Caractéristiques",
    deviation:        "La déviation",
    explosion:        "L'explosion",
  };

  // Branches dans l'ordre logique de lecture pour les boutons de navigation
  const orderedBranches = ORDERED_IDS.map(
    (id) => BRANCHES.find((b) => b.id === id)!
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(150deg, ${branch.colorLight} 0%, #F5EFE6 55%, #EDE4D8 100%)`,
      }}
    >

      {/* ── En-tête ── */}
      <header className="w-full px-6 pt-7 pb-3 text-center">

        {/* Titre de la branche */}
        <h1
          className="text-xl md:text-2xl font-bold leading-tight max-w-3xl mx-auto mb-4"
          style={{ fontFamily: "'Lora', Georgia, serif", color: branch.colorDark }}
        >
          {branch.label}
        </h1>

        {/* Ligne décorative */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div style={{ height: 1, width: 48, borderRadius: 1, backgroundColor: branch.color }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: branch.color }} />
          <div style={{ height: 1, width: 48, borderRadius: 1, backgroundColor: branch.color }} />
        </div>
      </header>

      <main className="flex-1 px-4 py-2">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">

          {/* ── Boutons de navigation entre les branches — AU-DESSUS de la carte ──
              Le bouton de la branche active est mis en surbrillance. */}
          <div className="flex flex-wrap justify-center gap-3">
            {orderedBranches.map((b) => {
              const isActive = b.id === branch.id;
              return (
                <button
                  key={b.id}
                  onClick={() => navigate(`/branch/${b.id}`)}
                  style={{
                    padding: "6px 18px",
                    borderRadius: 999,
                    border: `1.5px solid ${b.color}`,
                    backgroundColor: isActive ? b.color : "rgba(255,255,255,0.78)",
                    color: isActive ? "white" : b.colorDark,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
                    cursor: "pointer",
                    transition: "opacity 0.18s",
                    opacity: isActive ? 1 : 0.85,
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.opacity = "0.85"; }}
                >
                  {labels[b.id]}
                </button>
              );
            })}
          </div>

          {/* ── Carte mentale de la branche ──
              onSubClick déclenche le scroll automatique vers la section correspondante. */}
          <MindMapBranch branch={branch} onSubClick={scrollToSection} />

          {/* ── Bouton retour — juste sous la carte ── */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, borderRadius: 999, padding: "7px 20px",
                backgroundColor: "rgba(255,255,255,0.75)",
                border: "1px solid #D4BFA0",
                color: "#5C3D1E",
                cursor: "pointer",
                transition: "opacity 0.18s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.72")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              ← Retour à la carte principale
            </button>
          </div>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════════
          DÉVELOPPEMENT DE CHAQUE SOUS-SOUS-QUESTION
          Les sections sont affichées dans l'ordre du tableau subQuestions,
          qui correspond à l'ordre gauche → droite dans la carte mentale.
         ══════════════════════════════════════════════════════════════════ */}
      <section className="px-4 py-6">
        <div className="max-w-3xl mx-auto">

          {/* Titre de la section */}
          <h2
            className="text-base font-bold mb-6 text-center"
            style={{ fontFamily: "'Lora', Georgia, serif", color: branch.colorDark }}
          >
            Développement des sous-questions
          </h2>

          {/* Une carte par sous-sous-question, dans l'ordre du tableau (gauche → droite) */}
          {branch.subQuestions.map((sq) => (
            <div
              key={sq.id}
              ref={(el) => { sectionRefs.current[sq.id] = el; }}
              id={sq.id}
              className="mb-7 rounded-2xl px-6 py-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.65)",
                border: `1.5px solid ${branch.color}55`,
                scrollMarginTop: "1.5rem",
              }}
            >
              {/* Titre de la sous-sous-question avec pastille colorée */}
              <div className="flex items-center gap-2 mb-4">
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  backgroundColor: branch.color, flexShrink: 0,
                }} />
                <h3
                  className="text-base font-bold"
                  style={{ color: branch.colorDark, fontFamily: "'Lora', Georgia, serif" }}
                >
                  {sq.label}
                </h3>
              </div>

              {/* Contenu : blocs de texte ou formules LaTeX */}
              {sq.content && sq.content.length > 0 ? (
                sq.content.map((block, bi) => {
                  if (block.type === "text") {
                    // Paragraphe de texte standard
                    return (
                      <p
                        key={bi}
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: "#4A3018", fontFamily: "'Lora', Georgia, serif" }}
                      >
                        {block.value}
                      </p>
                    );
                  }
                  if (block.type === "latex") {
                    // Formule mathématique inline
                    return (
                      <span key={bi} className="mx-1">
                        <MathFormula formula={block.value} display={false} color={branch.colorDark} />
                      </span>
                    );
                  }
                  if (block.type === "latex-block") {
                    // Formule mathématique centrée sur sa propre ligne
                    return (
                      <div
                        key={bi}
                        className="my-4 text-center overflow-x-auto"
                        style={{
                          padding: "0.6em 1em",
                          backgroundColor: branch.colorLight,
                          borderRadius: 10,
                          border: `1px solid ${branch.color}30`,
                        }}
                      >
                        <MathFormula formula={block.value} display={true} color={branch.colorDark} />
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                // Placeholder si aucun contenu n'a encore été rédigé
                <p
                  className="text-sm italic"
                  style={{ color: "#A07850", fontFamily: "'Lora', Georgia, serif" }}
                >
                  Contenu à compléter.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Pied de page : membres du groupe + mentions ── */}
      <footer
        className="w-full px-6 py-5"
        style={{ borderTop: "1px solid #D4BFA0" }}
      >
        <div className="max-w-2xl mx-auto text-center">

          {/* Noms des membres sans icône */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {GROUP_MEMBERS.map((member, i) => (
              <span
                key={i}
                className="text-xs rounded-full px-3 py-1"
                style={{
                  backgroundColor: "rgba(255,255,255,0.65)",
                  border: "1px solid #D4BFA0",
                  color: "#5C3D1E",
                }}
              >
                {member.name}
              </span>
            ))}
          </div>

          {/* Mentions */}
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

export default BranchPage;
