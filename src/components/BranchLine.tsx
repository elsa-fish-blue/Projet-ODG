// Composant SVG pour tracer la branche courbée entre deux nœuds du mind map

import React from "react";

interface BranchLineProps {
  x1: number;      // coordonnée X du point de départ
  y1: number;      // coordonnée Y du point de départ
  x2: number;      // coordonnée X du point d'arrivée
  y2: number;      // coordonnée Y du point d'arrivée
  color: string;   // couleur de la branche
  strokeWidth?: number;
  animate?: boolean;
  delay?: number;
}

/**
 * Trace une ligne courbée (courbe de Bézier quadratique) entre deux points.
 * Le point de contrôle est calculé au milieu avec une légère déviation.
 */
const BranchLine: React.FC<BranchLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  color,
  strokeWidth = 2.5,
  animate = false,
  delay = 0,
}) => {
  // Point de contrôle de la courbe de Bézier (légèrement décalé vers le centre)
  const cpx = (x1 + x2) / 2;
  const cpy = (y1 + y2) / 2 - 20;

  const pathData = `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`;

  const animStyle = animate
    ? {
        animation: `fadeInCloud 0.5s ease forwards`,
        animationDelay: `${delay}ms`,
        opacity: 0,
      }
    : {};

  return (
    <path
      d={pathData}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      opacity={0.75}
      style={animStyle}
    />
  );
};

export default BranchLine;
