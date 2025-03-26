import React from "react";
import { Outlet } from "react-router-dom";
import NavDashboard from "../components/NavDashboard";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (NavDashboard) */}
      <div className="w-64"> {/* Largeur fixe pour la sidebar */}
        <NavDashboard />
      </div>

      {/* Contenu principal (Outlet) */}
      <div className="flex-1 p-6 overflow-auto bg-gray-100"> {/* Prend le reste de l'espace */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;