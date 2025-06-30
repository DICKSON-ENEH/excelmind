/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Table from "@/app/ReusableComponents/Table/Table";

const AllCourse = () => {
  const courseData: string | any[] = []; // Replace with actual data fetch or props

  const columns = [
    { key: "courseCode", title: "Course Code" },
    { key: "title", title: "Course Title" },
    { key: "unit", title: "Units" },
    { key: "semester", title: "Semester" },
    { key: "status", title: "Status" },
  ];

  return (
    <div className="w-full h-full p-6">
      {courseData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 border border-dashed border-purple-300 rounded-lg bg-purple-50">
          <p className="text-lg font-medium text-purple-700 mb-2">
            No courses available
          </p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Upload Course
          </button>
        </div>
      ) : (
        <Table columns={columns} data={courseData} />
      )}
    </div>
  );
};

export default AllCourse;
