import React from "react";
import SideBar from "./SideBar/SideBar";

export default function DesktopNavBar() {
  return (
    <div className="hidden md:block">
      <SideBar />
    </div>
  );
}
