import React from "react";
import MobileNavBar from "../ReusableComponents/MobileNavBar/MobileNavBar";
import DesktopNavBar from "../ReusableComponents/DesktopNavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-col md:flex-row w-full bg-white">
      <MobileNavBar />
      <DesktopNavBar />
      <div className="flex-grow">{children}</div>
    </main>
  );
}
