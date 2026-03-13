// Composant de rendu de formules mathématiques via KaTeX
// Prend une chaîne LaTeX et produit du HTML rendu côté client

import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathFormulaProps {
  formula: string;     // expression LaTeX à rendre
  display?: boolean;   // true → mode display (centré), false → inline
  color?: string;      // couleur optionnelle du texte
}

const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  display = false,
  color,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  // Rendu KaTeX dans le DOM à chaque changement de formule
  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(formula, ref.current, {
        displayMode: display,
        throwOnError: false,   // affiche l'erreur en rouge plutôt que de planter
        output: "htmlAndMathml",
      });
    } catch {
      // En cas d'erreur inattendue, afficher la formule brute
      if (ref.current) ref.current.textContent = formula;
    }
  }, [formula, display]);

  return (
    <span
      ref={ref}
      style={{
        color,
        display: display ? "block" : "inline",
        textAlign: display ? "center" : undefined,
        margin: display ? "0.8em 0" : undefined,
        overflowX: display ? "auto" : undefined,
      }}
    />
  );
};

export default MathFormula;
