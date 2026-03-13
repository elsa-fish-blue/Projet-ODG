// MindMapBranch.tsx
// Carte mentale de détail affichée sur la page d'une branche.
// La sous-question principale est au centre (grand ovale, 2× plus grand).
// Les sous-sous-questions sont disposées en ligne horizontale en dessous,
// de gauche à droite dans l'ordre du tableau subQuestions (= ordre logique de lecture).
// Un clic sur un ovale secondaire déclenche le callback onSubClick(id)
// qui fait défiler la page vers le développement associé.

import React, { useState, useEffect } from "react";
import { Branch } from "../data/mindmap";
import BranchLine from "./BranchLine";

interface MindMapBranchProps {
  branch: Branch;
  // Appelé au clic sur une sous-sous-question : fait défiler vers son développement
  onSubClick?: (id: string) => void;
}

// ── Dimensions du canvas SVG ───────────────────────────────────────────────
const W  = 960;
const H  = 500;
const CX = W / 2;

// Position verticale de la sous-question centrale
const CENTER_Y = 165;

// Position verticale de la ligne des sous-sous-questions
const SUB_Y = 390;

// Fond uniforme de la carte
const CARD_BG  = "rgba(255,255,255,0.60)";
const CARD_BOR = "1px solid #D4BFA0";

// ── Utilitaires de texte ───────────────────────────────────────────────────
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

function estimateWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.54;
}

// ── Ovale SVG adaptatif ────────────────────────────────────────────────────
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
  maxChars?: number;
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
}

const OvalNode: React.FC<OvalNodeProps> = ({
  cx, cy, label, fontSize, pad,
  fillColor, strokeColor, textColor,
  strokeWidth = 2, maxChars = 16,
  animate = false, delay = 0, onClick,
}) => {
  const lineH  = fontSize * 1.45;
  const lines  = wrapText(label, maxChars);
  const maxW   = Math.max(...lines.map((l) => estimateWidth(l, fontSize)));
  const rx     = maxW / 2 + pad.x;
  const ry     = (lines.length * lineH) / 2 + pad.y;
  const startY = cy - ((lines.length - 1) * lineH) / 2;

  // Animation d'apparition
  const animStyle: React.CSSProperties = animate
    ? { animation: `fadeInCloud 0.5s cubic-bezier(0.22,1,0.36,1) forwards`, animationDelay: `${delay}ms`, opacity: 0 }
    : {};

  return (
    <g style={{ cursor: onClick ? "pointer" : "default", ...animStyle }} onClick={onClick}>
      {/* Ombre */}
      <ellipse cx={cx + 2} cy={cy + 5} rx={rx} ry={ry}
        fill="rgba(92,61,30,0.07)" style={{ filter: "blur(5px)" }} />
      {/* Corps */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
        fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      {/* Reflet */}
      <ellipse cx={cx - rx * 0.15} cy={cy - ry * 0.25} rx={rx * 0.38} ry={ry * 0.26}
        fill="rgba(255,255,255,0.30)" style={{ pointerEvents: "none" }} />
      {/* Texte */}
      {lines.map((line, i) => (
        <text key={i}
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

// ── Composant principal ────────────────────────────────────────────────────
const MindMapBranch: React.FC<MindMapBranchProps> = ({ branch, onSubClick }) => {
  const [ready, setReady] = useState(false);

  // Réinitialise l'animation à chaque changement de branche
  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, [branch.id]);

  const n = branch.subQuestions.length;

  // Positions horizontales uniformément réparties de gauche à droite
  // La largeur utilisable est de 90% du canvas (5% de marge de chaque côté)
  const margin = W * 0.06;
  const usableW = W - 2 * margin;
  const subXPositions = branch.subQuestions.map((_, i) =>
    n === 1
      ? CX
      : margin + (i / (n - 1)) * usableW
  );

  return (
    <div
      className="w-full flex justify-center items-center"
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
        style={{ display: "block", maxHeight: "52vh" }}
        preserveAspectRatio="xMidYMid meet"
        aria-label={`Carte mentale : ${branch.label}`}
      >
        {/* Fond uniforme de la carte */}
        <rect x={0} y={0} width={W} height={H} fill="rgba(255,255,255,0.60)" rx={18} />

        {/* Lignes du centre vers chaque sous-sous-question */}
        {branch.subQuestions.map((sq, i) => (
          <BranchLine
            key={`line-${sq.id}`}
            x1={CX} y1={CENTER_Y}
            x2={subXPositions[i]} y2={SUB_Y}
            color={branch.color} strokeWidth={2.2}
            animate={ready} delay={i * 70}
          />
        ))}

        {/* Ovales des sous-sous-questions — gauche → droite, cliquables */}
        {branch.subQuestions.map((sq, i) => (
          <OvalNode
            key={sq.id}
            cx={subXPositions[i]} cy={SUB_Y}
            label={sq.label}
            fontSize={12}
            pad={{ x: 14, y: 11 }}
            maxChars={14}
            fillColor="#FFFDF9"
            strokeColor={branch.color}
            textColor={branch.colorDark}
            strokeWidth={1.8}
            animate={ready}
            delay={80 + i * 70}
            onClick={() => onSubClick && onSubClick(sq.id)}
          />
        ))}

        {/* Grand ovale central : la sous-question (2× plus grand, non cliquable) */}
        <OvalNode
          cx={CX} cy={CENTER_Y}
          label={branch.label}
          fontSize={15.5}
          pad={{ x: 38, y: 26 }}
          maxChars={26}
          fillColor={branch.colorLight}
          strokeColor={branch.color}
          textColor={branch.colorDark}
          strokeWidth={2.8}
          animate={ready}
          delay={0}
        />
      </svg>
    </div>
  );
};

export default MindMapBranch;
