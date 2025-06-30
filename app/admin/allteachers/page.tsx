"use client";
import React from "react";
import Table from "@/app/ReusableComponents/Table/Table";

const teacherData = [
  {
    id: "TEA001",
    name: "Jane Smith",
    email: "jane@university.com",
    specialization: "AI & Machine Learning",
    status: "active",
  },
  // more teachers...
];

const AllTeachers = () => {
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Full Name" },
    { key: "email", title: "Email" },
    { key: "specialization", title: "Specialization" },
    { key: "status", title: "Status" },
    {
      key: "actions",
      title: "Actions",
      render: () => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button className="text-blue-600 hover:underline">View</button>
          <button className="text-purple-600 hover:underline">Assign</button>
          <button className="text-red-600 hover:underline">Suspend</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Teachers</h2>
      <Table columns={columns} data={teacherData} />
    </div>
  );
};

export default AllTeachers;
