"use client";
import React from "react";
import Table from "@/app/ReusableComponents/Table/Table";
import { useGetAllUsers } from "@/app/hooks/useUsers";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  status: string;
  role: string;
}

const AllStudents = () => {
  const { data: users = [], isLoading, error } = useGetAllUsers();

  const studentData = users.filter((user: User) => user.role === "student");

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load students.</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Students</h2>
      <Table columns={columns} data={studentData} />
    </div>
  );
};

export default AllStudents;
