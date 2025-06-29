"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { LuGraduationCap } from "react-icons/lu";
import { PiGraduationCapBold, PiGraduationCapLight } from "react-icons/pi";

export default function SideBar() {
  const router = useRouter();
  const path = usePathname();
  const adminMenu = [
    {
      menu: "Home",
      link: "/dashboard/home",
      icon: {},
    },
    {
      menu: "Students",
      link: "/dashboard/students",
      icon: {},
    },
    {
      menu: "Teachers",
      link: "/dashboard/teachers",
      icon: {},
    },
  ];

  const userMenu = [
    {
      menu: "Home",
      link: "/dashboard/home",
      icon: <GrHomeRounded />,
    },
    {
      menu: "Courses",
      link: "/dashboard/courses",
      icon: <PiGraduationCapBold />,
    },
  ];

  const menu = userMenu;
  return (
    <div className="w-full md:w-56 h-lvh border-2 border-purple-50 py-10 px-4">
      {menu.map((item) => (
        <div
          className={`flex my-4 rounded px-2.5 py-3 gap-2 items-center ${
            path == item.link ? "bg-purple-800 text-white" : "text-gray-600"
          } `}
          key={item.menu}
          onClick={() => router.push(`${item.link}`)}
        >
          <div className="text-[16px]">{item.icon}</div>
          <p className="text-[18px]">{item.menu}</p>
        </div>
      ))}
    </div>
  );
}
