// Utilitaires géométriques pour le positionnement des éléments sur le canvas SVG

/**
 * Convertit un angle en degrés et un rayon en coordonnées cartésiennes (x, y).
 * L'origine est au centre du conteneur.
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // -90 pour partir du haut
  return {
    x: centerX + radius * Math.cos(rad),
    y: centerY + radius * Math.sin(rad),
  };
}

/**
 * Génère le chemin SVG d'une courbe de Bézier quadratique entre deux points.
 * Le point de contrôle est calculé automatiquement pour une courbe élégante.
 */
export function buildCurvedPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cx: number,
  cy: number
): string {
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/**
 * Génère le chemin SVG d'un nuage stylisé à partir d'un centre (cx, cy).
 * Le nuage est dessiné comme une série d'arcs formant une silhouette de nuage.
 */
export function cloudPath(cx: number, cy: number, w: number, h: number): string {
  // Dimensions du nuage basées sur w (largeur) et h (hauteur)
  const x = cx - w / 2;
  const y = cy - h / 2;
  const r1 = h * 0.38; // rayon du dôme principal
  const r2 = h * 0.28; // rayon des dômes secondaires
  const r3 = h * 0.22; // rayon des petits dômes
  const baseY = y + h * 0.72; // ligne de base du nuage

  // Chemin SVG composé d'arcs pour simuler la forme de nuage
  return [
    `M ${x + w * 0.12} ${baseY}`,
    // Bas du nuage (arrondi gauche)
    `A ${r3} ${r3} 0 0 1 ${x + w * 0.12} ${baseY}`,
    // Montée gauche
    `A ${r3} ${r3} 0 0 1 ${x + w * 0.2} ${y + h * 0.52}`,
    // Dôme gauche
    `A ${r2} ${r2} 0 0 1 ${x + w * 0.38} ${y + h * 0.28}`,
    // Dôme central (le plus haut)
    `A ${r1} ${r1} 0 0 1 ${x + w * 0.68} ${y + h * 0.25}`,
    // Dôme droit
    `A ${r2} ${r2} 0 0 1 ${x + w * 0.85} ${y + h * 0.48}`,
    // Descente droite
    `A ${r3} ${r3} 0 0 1 ${x + w * 0.92} ${baseY}`,
    // Base plate
    `Z`,
  ].join(" ");
}
