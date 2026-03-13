// MindMapMain.tsx
// Carte mentale principale affichée sur la page d'accueil.
// Affiche la question centrale (grand ovale) et les 3 sous-questions
// disposées en ligne horizontale en dessous, de gauche à droite
// dans l'ordre logique de lecture (caractéristiques → déviation → explosion).
// Les boutons sous la carte naviguent vers la page de chaque branche.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BRANCHES, MAIN_QUESTION } from "../data/mindmap";
import BranchLine from "./BranchLine";

// ── Dimensions logiques du canvas SVG ──────────────────────────────────────
const W  = 960;
const H  = 560;
const CX = W / 2;  // centre horizontal

// Position verticale de la question centrale
const CENTER_Y = 185;

// Position verticale de la ligne des sous-questions
const SUB_Y = 430;

// Couleur de fond uniforme de la carte (identique à l'encadré "Conseils de lecture")
const CARD_BG  = "rgba(255,255,255,0.60)";
const CARD_BOR = "1px solid #D4BFA0";

// ── Ordre logique des branches : caractéristiques, déviation, explosion ─────
// L'index dans ce tableau détermine la position gauche → droite dans la carte.
const ORDERED_IDS = ["caracteristiques", "deviation", "explosion"];

// ── Utilitaire : découpe un texte en lignes selon un nombre max de caractères
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current !== "") {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// ── Utilitaire : estime la largeur d'un texte en pixels selon la taille de police
function estimateWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.54;
}

// ── Composant : ovale SVG adaptatif au texte ──────────────────────────────
interface OvalNodeProps {
  cx: number;
  cy: number;
  label: string;
  fontSize: number;
  pad: { x: number; y: number };
  fillColor: string;
  strokeColor: string;
  textColor: string;
  strokeWidth?: number;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
  maxChars?: number;
}

const OvalNode: React.FC<OvalNodeProps> = ({
  cx, cy, label, fontSize, pad,
  fillColor, strokeColor, textColor,
  strokeWidth = 2, onClick, animate = false, delay = 0, maxChars = 22,
}) => {
  const lineH  = fontSize * 1.45;
  const lines  = wrapText(label, maxChars);
  const maxW   = Math.max(...lines.map((l) => estimateWidth(l, fontSize)));
  const rx     = maxW / 2 + pad.x;
  const ry     = (lines.length * lineH) / 2 + pad.y;
  const startY = cy - ((lines.length - 1) * lineH) / 2;

  // Animation d'apparition progressive
  const animStyle: React.CSSProperties = animate
    ? { animation: `fadeInCloud 0.5s cubic-bezier(0.22,1,0.36,1) forwards`, animationDelay: `${delay}ms`, opacity: 0 }
    : {};

  return (
    <g onClick={onClick} style={{ cursor: onClick ? "pointer" : "default", ...animStyle }}>
      {/* Ombre portée douce */}
      <ellipse cx={cx + 2} cy={cy + 5} rx={rx} ry={ry}
        fill="rgba(92,61,30,0.07)" style={{ filter: "blur(6px)" }} />
      {/* Corps de l'ovale */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
        fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      {/* Reflet lumineux */}
      <ellipse cx={cx - rx * 0.15} cy={cy - ry * 0.25} rx={rx * 0.38} ry={ry * 0.26}
        fill="rgba(255,255,255,0.30)" style={{ pointerEvents: "none" }} />
      {/* Texte multiligne centré */}
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx} y={startY + i * lineH}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={fontSize} fontWeight={onClick ? "700" : "600"} fill={textColor}
          fontFamily="'Inter','Segoe UI',system-ui,sans-serif"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

// ── Carte mentale principale ───────────────────────────────────────────────
const MindMapMain: React.FC = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  // Déclenche les animations à l'apparition du composant
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Branches dans l'ordre logique de lecture (gauche → droite)
  const orderedBranches = ORDERED_IDS.map(
    (id) => BRANCHES.find((b) => b.id === id)!
  );

  // Positions horizontales des 3 sous-questions réparties uniformément
  const subXPositions = [W * 0.18, W * 0.50, W * 0.82];

  return (
    <div className="w-full flex flex-col items-center gap-3">

      {/* ── Canvas SVG adaptatif à l'écran ── */}
      <div
        className="w-full overflow-hidden"
        style={{
          backgroundColor: CARD_BG,
          border: CARD_BOR,
          borderRadius: 20,
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          style={{ display: "block", maxHeight: "65vh" }}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Carte mentale principale"
        >
          {/* Fond uniforme de la carte */}
          <rect x={0} y={0} width={W} height={H} fill="rgba(255,255,255,0.60)" rx={20} />

          {/* Lignes du centre vers chaque sous-question */}
          {orderedBranches.map((branch, i) => (
            <BranchLine
              key={`line-${branch.id}`}
              x1={CX} y1={CENTER_Y}
              x2={subXPositions[i]} y2={SUB_Y}
              color={branch.color} strokeWidth={3}
              animate={ready} delay={i * 100}
            />
          ))}

          {/* Ovales des sous-questions — en dessous, gauche → droite */}
          {orderedBranches.map((branch, i) => (
            <OvalNode
              key={branch.id}
              cx={subXPositions[i]} cy={SUB_Y}
              label={branch.label}
              fontSize={14}
              pad={{ x: 20, y: 16 }}
              maxChars={18}
              fillColor={branch.colorLight}
              strokeColor={branch.color}
              textColor={branch.colorDark}
              strokeWidth={2.2}
              onClick={() => navigate(`/branch/${branch.id}`)}
              animate={ready}
              delay={150 + i * 110}
            />
          ))}

          {/* Grand ovale central — question principale (2× plus grande que les sous-questions) */}
          <OvalNode
            cx={CX} cy={CENTER_Y}
            label={MAIN_QUESTION}
            fontSize={15.5}
            pad={{ x: 40, y: 28 }}
            maxChars={28}
            fillColor="#F5EFE6"
            strokeColor="#8B5E3C"
            textColor="#3E2A10"
            strokeWidth={3}
            animate={ready}
            delay={0}
          />
        </svg>
      </div>

      {/* ── Boutons de navigation vers les branches — sous la carte ──
          Chaque bouton renvoie à la page de la branche correspondante. */}
      <div className="flex flex-wrap justify-center gap-3 mt-1">
        {orderedBranches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => navigate(`/branch/${branch.id}`)}
            style={{
              padding: "7px 20px",
              borderRadius: 999,
              border: `1.5px solid ${branch.color}`,
              backgroundColor: branch.colorLight,
              color: branch.colorDark,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
              cursor: "pointer",
              transition: "opacity 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.72")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {branch.label.length > 40
              ? branch.label.slice(0, 38) + "…"
              : branch.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MindMapMain;
