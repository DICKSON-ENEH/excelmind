/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Table from "@/app/ReusableComponents/Table/Table";

const AllCourse = () => {
  const [showModal, setShowModal] = useState(false);

  const courseData: any[] = []; // Replace with real course data

  const columns = [
    { key: "courseCode", title: "Course Code" },
    { key: "title", title: "Course Title" },
    { key: "unit", title: "Units" },
    { key: "semester", title: "Semester" },
    { key: "status", title: "Status" },
  ];

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle course upload logic here (e.g. API call)
    console.log("Uploading course...");
    setShowModal(false);
  };

  return (
    <div className="w-full h-full p-6 relative">
      {courseData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 border border-dashed border-purple-300 rounded-lg bg-purple-50">
          <p className="text-lg font-medium text-purple-700 mb-2">
            No courses available
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Upload Course
          </button>
        </div>
      ) : (
        <Table columns={columns} data={courseData} />
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-purple-700">
              Upload New Course
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Course Code"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Course Title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Units"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Semester</option>
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourse;
