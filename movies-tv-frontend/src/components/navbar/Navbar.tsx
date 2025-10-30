// src/components/Navbar.tsx

import React from "react";
import { Film } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 shadow-xl">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="rounded-lg">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MovieHub</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
