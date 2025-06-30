"use client";
import React from "react";
import { PiGraduationCapFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";

const stats = [
  {
    label: "Total Students",
    value: 1200,
    icon: <HiUsers size={28} className="text-blue-600" />,
    color: "bg-blue-100",
  },
  {
    label: "Total Teachers",
    value: 85,
    icon: <FaChalkboardTeacher size={26} className="text-green-600" />,
    color: "bg-green-100",
  },
  {
    label: "Courses Offered",
    value: 48,
    icon: <MdLibraryBooks size={26} className="text-purple-600" />,
    color: "bg-purple-100",
  },
  {
    label: "Ongoing Exams",
    value: 6,
    icon: <PiGraduationCapFill size={26} className="text-red-600" />,
    color: "bg-red-100",
  },
];

const AdminOverview = () => {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 ${stat.color}`}
          >
            <div className="p-2 bg-white rounded-full shadow">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>✅ New course &ldquo;Intro to Cybersecurity&ldquo; was added.</li>
          <li>👩‍🏫 Teacher &#34;Mrs. Linda Obi&ldquo; was assigned to CSC302.</li>
          <li>🎓 56 students enrolled in &ldquo;Data Structures&ldquo;.</li>
          <li>
            📌 Exam for &ldquo;Operating Systems&ldquo; scheduled next week.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminOverview;
