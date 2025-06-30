"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdAssignment, MdOutlineClear, MdDashboard } from "react-icons/md";
import { PiGraduationCapBold } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa";

import { FaUsers } from "react-icons/fa6";

interface SideBarProps {
  active: boolean;
  setactive: (active: boolean) => void;
  role: "admin" | "lecturer" | "user"; // 👈 Pass the role here
}

const SideBar: React.FC<SideBarProps> = ({ active, setactive, role }) => {
  const router = useRouter();
  const path = usePathname();

  const menus = {
    user: [
      {
        menu: "Home",
        link: "/dashboard/home",
        icon: <GrHomeRounded />,
      },
      {
        menu: "Courses",
        link: "/dashboard/course",
        icon: <PiGraduationCapBold />,
      },
      {
        menu: "Assignments",
        link: "/dashboard/assignments",
        icon: <MdAssignment />,
      },
      {
        menu: "Exams",
        link: "/dashboard/exams",
        icon: <HiOutlineAcademicCap />,
      },
    ],
    admin: [
      {
        menu: "Dashboard",
        link: "/dashboard/admin",
        icon: <MdDashboard />,
      },
      {
        menu: "Manage Students",
        link: "/admin/allstudent",
        icon: <FaUserGraduate />,
      },
      {
        menu: "Manage Courses",
        link: "/admin/allcourse",
        icon: <PiGraduationCapBold />,
      },
      {
        menu: "Manage lecturer",
        link: "/admin/allteachers",
        icon: <FaUsers />,
      },
    ],
    lecturer: [
      {
        menu: "Lecturer Panel",
        link: "/lecturer/home",
        icon: <MdDashboard />,
      },
      {
        menu: "My Courses",
        link: "/lecturer/allcourse",
        icon: <PiGraduationCapBold />,
      },
      {
        menu: "Assignments",
        link: "/lecturer/assignments",
        icon: <MdAssignment />,
      },
      {
        menu: "Results",
        link: "/lecturer/results",
        icon: <HiOutlineAcademicCap />,
      },
    ],
  };

  const menu = menus[role];

  return (
    <aside
      className={`fixed z-50 top-0 left-0 h-screen w-64 bg-white shadow-md transform transition-transform duration-300 ${
        active ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:shadow-none border-r border-gray-200`}
    >
      <div className="relative p-6 h-full flex flex-col">
        {/* Mobile Close Icon */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={() => setactive(false)}
            className="text-gray-500 hover:text-red-600 transition-colors"
            aria-label="Close sidebar"
          >
            <MdOutlineClear size={24} />
          </button>
        </div>

        {/* Brand */}
        <h2 className="text-2xl font-bold text-purple-700 mb-10">Dashboard</h2>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <button
              key={item.menu}
              onClick={() => {
                router.push(item.link);
                setactive(false);
              }}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-md transition-all ${
                path === item.link
                  ? "bg-purple-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-base font-medium">{item.menu}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 text-center hidden md:block">
          © {new Date().getFullYear()} ExelMind
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
