import React from "react";
import MobileNav from "./MobileNavBar/MobileNavBar";

export default function Head() {
  return (
    <div className="bg-white h-10 flex items-center border border-purple-300">
      <MobileNav />
      <h1 className="text-black">header</h1>
    </div>
  );
}
