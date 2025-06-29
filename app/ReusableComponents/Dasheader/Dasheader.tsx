import React from "react";
import { Menu } from "lucide-react";

interface DasheaderProps {
  active: boolean;
  setactive: (active: boolean) => void;
}

const Dasheader: React.FC<DasheaderProps> = ({ active, setactive }) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm sticky top-0 z-40">
      {/* Left Section: Menu button */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={() => setactive(!active)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right Section: Placeholder for user menu or settings */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm hidden sm:block">
          Welcome back, Admin
        </span>
        <div className="w-9 h-9 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
};

export default Dasheader;
