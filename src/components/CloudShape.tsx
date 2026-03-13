// Composant SVG : nœud du mind map en forme de cercle aux bords ondulés (vagues sinusoïdales)

import React from "react";

interface CloudShapeProps {
  cx: number;           // centre X du nœud dans le SVG
  cy: number;           // centre Y du nœud dans le SVG
  rx: number;           // rayon horizontal de base
  ry: number;           // rayon vertical de base
  fillColor: string;    // couleur de fond du nœud
  strokeColor: string;  // couleur de la bordure et de l'ombre
  textColor?: string;   // couleur du texte (par défaut : strokeColor)
  label: string;        // texte affiché dans le nœud
  fontSize?: number;    // taille de la police en px
  onClick?: () => void; // callback déclenché au clic
  isMain?: boolean;     // true → nœud central (plus grand, plus gras)
  animate?: boolean;    // active l'animation d'entrée (scale + fade)
  delay?: number;       // délai de l'animation en millisecondes
}

/**
 * Génère le chemin SVG d'un cercle aux bords ondulés.
 * On parcourt 360° en petits pas angulaires et on modifie le rayon
 * avec une fonction sinus pour obtenir des vagues régulières.
 *
 * @param cx     Centre horizontal
 * @param cy     Centre vertical
 * @param rx     Rayon horizontal moyen
 * @param ry     Rayon vertical moyen
 * @param waves  Nombre de vagues sur le tour complet
 * @param amp    Amplitude des vagues (en pixels)
 */
function getWavyCirclePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  waves: number = 7,
  amp: number = 5
): string {
  const steps = 150; // résolution : plus c'est élevé, plus la courbe est lisse
  const pts: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    // Perturbation sinusoïdale sur le rayon
    const delta = amp * Math.sin(waves * angle + Math.PI / 4);
    const px = cx + (rx + delta) * Math.cos(angle);
    const py = cy + (ry + delta) * Math.sin(angle);
    pts.push([px, py]);
  }

  // Assemblage du chemin SVG avec des segments droits (densité suffisante pour
  // que le résultat visuel soit une courbe parfaitement fluide)
  const d =
    `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} ` +
    pts
      .slice(1)
      .map(([x, y]) => `L ${x.toFixed(2)} ${y.toFixed(2)}`)
      .join(" ") +
    " Z";

  return d;
}

/**
 * Découpe une chaîne de caractères en plusieurs lignes pour tenir dans le nœud.
 * @param text            Texte source
 * @param maxCharsPerLine Nombre maximum de caractères par ligne
 */
function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current !== "") {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const CloudShape: React.FC<CloudShapeProps> = ({
  cx,
  cy,
  rx,
  ry,
  fillColor,
  strokeColor,
  textColor,
  label,
  fontSize = 12,
  onClick,
  isMain = false,
  animate = false,
  delay = 0,
}) => {
  // La couleur du texte est celle de strokeColor si non précisée
  const resolvedTextColor = textColor ?? strokeColor;

  // Paramètres des vagues adaptés à la taille du nœud
  const waveCount = isMain ? 9 : 7;
  const amplitude = Math.min(rx, ry) * (isMain ? 0.09 : 0.11);

  // Chemin du corps principal du nœud
  const mainPath   = getWavyCirclePath(cx, cy, rx, ry, waveCount, amplitude);
  // Chemin de l'ombre (décalée vers le bas)
  const shadowPath = getWavyCirclePath(cx + 2, cy + 4, rx, ry, waveCount, amplitude);
  // Chemin du reflet lumineux (petit ellipsoïde en haut du nœud)
  const glowPath   = getWavyCirclePath(
    cx - rx * 0.10,
    cy - ry * 0.20,
    rx * 0.50,
    ry * 0.35,
    waveCount,
    amplitude * 0.45
  );

  // Calcul du retour à la ligne : on estime ~0.52 px par caractère à fontSize donné
  const maxChars = Math.floor((rx * 1.6) / (fontSize * 0.52));
  const lines = wrapText(label, maxChars);
  const lineHeight = fontSize * 1.38;
  // Décalage vertical pour centrer le bloc de texte verticalement dans le nœud
  const textStartY = cy - ((lines.length - 1) * lineHeight) / 2;

  // Style d'animation d'entrée décalée (scale + opacité)
  const animStyle: React.CSSProperties = animate
    ? {
        animation: `fadeInCloud 0.5s cubic-bezier(0.22,1,0.36,1) forwards`,
        animationDelay: `${delay}ms`,
        opacity: 0,
      }
    : {};

  return (
    <g
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default", ...animStyle }}
      className="cloud-group"
    >
      {/* Ombre portée — légèrement floutée pour un rendu naturel */}
      <path
        d={shadowPath}
        fill="rgba(92, 61, 30, 0.10)"
        style={{ filter: "blur(4px)" }}
      />

      {/* Corps principal du nœud aux bords ondulés */}
      <path
        d={mainPath}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isMain ? 2.5 : 1.8}
      />

      {/* Reflet lumineux semi-transparent — donne du volume */}
      <path
        d={glowPath}
        fill="rgba(255, 255, 255, 0.30)"
        style={{ pointerEvents: "none" }}
      />

      {/* Texte multiligne centré dans le nœud */}
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={textStartY + i * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight={isMain ? "700" : "600"}
          fill={resolvedTextColor}
          fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

export default CloudShape;
