"use client";
import React, { useState } from "react";
import SideBar from "../ReusableComponents/SideBar/SideBar";
import Dasheader from "../ReusableComponents/Dasheader/Dasheader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [active, setactive] = useState(false);

  return (
    <div className="flex h-screen w-screen max-w-[100vw] overflow-hidden bg-blue-50">
      <SideBar active={active} setactive={setactive} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Dasheader active={active} setactive={setactive} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
