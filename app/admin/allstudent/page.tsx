"use client";
import React from "react";
import Table from "@/app/ReusableComponents/Table/Table";

const studentData = [
  {
    id: "STU001",
    name: "John Doe",
    email: "john@student.com",
    department: "Computer Science",
    status: "active",
  },
  // more students...
];

const AllStudents = () => {
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Full Name" },
    { key: "email", title: "Email" },
    { key: "department", title: "Department" },
    { key: "status", title: "Status" },
    {
      key: "actions",
      title: "Actions",
      render: () => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button className="text-blue-600 hover:underline">View</button>
          <button className="text-yellow-600 hover:underline">Suspend</button>
          <button className="text-red-600 hover:underline">Remove</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Students</h2>
      <Table columns={columns} data={studentData} />
    </div>
  );
};

export default AllStudents;
