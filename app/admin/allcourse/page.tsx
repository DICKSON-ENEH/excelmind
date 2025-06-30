"use client";
import React from "react";
import Table from "@/app/ReusableComponents/Table/Table";

const courseData = [
  {
    code: "CSC101",
    title: "Intro to Computer Science",
    unit: 3,
    semester: "1st",
    status: "available",
  },
  // more courses...
];

const AllCourses = () => {
  const columns = [
    { key: "code", title: "Course Code" },
    { key: "title", title: "Title" },
    { key: "unit", title: "Units" },
    { key: "semester", title: "Semester" },
    { key: "status", title: "Status" },
    {
      key: "actions",
      title: "Actions",
      render: () => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button className="text-blue-600 hover:underline">View</button>
          <button className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Courses</h2>
      <Table columns={columns} data={courseData} />
    </div>
  );
};

export default AllCourses;
