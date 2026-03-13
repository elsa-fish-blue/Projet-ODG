// Point d'entrée principal : configure le routeur et les routes de l'application

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BranchPage from "./pages/BranchPage";

export function App() {
  return (
    // Routeur principal basé sur l'URL du navigateur
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil : mind map principal */}
        <Route path="/" element={<HomePage />} />
        {/* Page de détail d'une branche, identifiée par son ID */}
        <Route path="/branch/:branchId" element={<BranchPage />} />
        {/* Redirection par défaut vers l'accueil si route inconnue */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
