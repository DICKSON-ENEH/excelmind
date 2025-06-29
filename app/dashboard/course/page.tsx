/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Table from "@/app/ReusableComponents/Table/Table";
import React, { useState, useEffect } from "react";
import { BiSearch, BiFilter } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";

interface CourseData {
  courseCode: string;
  title: string;
  unit: number;
  semester: string;
  status: "available" | "enrolled" | "completed" | "dropped";
}

const Course = () => {
  const [filteredData, setFilteredData] = useState<CourseData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");

  const courseData: CourseData[] = [
    {
      courseCode: "CSC301",
      title: "Data Structures and Algorithms",
      unit: 3,
      semester: "1st",
      status: "available",
    },
    {
      courseCode: "CSC302",
      title: "Operating Systems",
      unit: 2,
      semester: "2nd",
      status: "enrolled",
    },
    {
      courseCode: "MTH211",
      title: "Linear Algebra",
      unit: 3,
      semester: "1st",
      status: "available",
    },
    {
      courseCode: "CSC303",
      title: "Database Management Systems",
      unit: 3,
      semester: "2nd",
      status: "completed",
    },
    {
      courseCode: "ENG101",
      title: "Technical Writing",
      unit: 2,
      semester: "1st",
      status: "enrolled",
    },
    {
      courseCode: "CSC304",
      title: "Computer Networks",
      unit: 3,
      semester: "2nd",
      status: "available",
    },
  ];

  // Filter courses based on search and filters
  useEffect(() => {
    let filtered = courseData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((course) => course.status === statusFilter);
    }

    // Semester filter
    if (semesterFilter !== "all") {
      filtered = filtered.filter(
        (course) => course.semester === semesterFilter
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, statusFilter, semesterFilter, courseData]);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      available: "bg-green-100 text-green-800 border-green-200",
      enrolled: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-purple-100 text-purple-800 border-purple-200",
      dropped: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${
          statusStyles[status as keyof typeof statusStyles]
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleAction = (
    action: string,
    course: CourseData,
    rowIndex: number
  ) => {
    switch (action) {
      case "view":
        console.log("Viewing course:", course);
        // Add your view logic here
        break;
      case "enroll":
        if (course.status === "available") {
          console.log("Enrolling in course:", course);
          // Add your enroll logic here
        }
        break;
      case "drop":
        if (course.status === "enrolled") {
          console.log("Dropping course:", course);
          // Add your drop logic here
        }
        break;
      default:
        break;
    }
  };

  const columns = [
    { key: "courseCode", title: "Course Code" },
    { key: "title", title: "Course Title" },
    { key: "unit", title: "Credit Units" },
    { key: "semester", title: "Semester" },
    {
      key: "status",
      title: "Status",
      render: (row: CourseData, _rowIndex: number) =>
        getStatusBadge(row.status),
    },
    {
      key: "actions",
      title: "Actions",
      render: (row: CourseData, rowIndex: number) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAction("view", row, rowIndex)}
            className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
          >
            View
          </button>

          {row.status === "available" && (
            <button
              onClick={() => handleAction("enroll", row, rowIndex)}
              className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-md transition-colors"
            >
              Enroll
            </button>
          )}

          {row.status === "enrolled" && (
            <button
              onClick={() => handleAction("drop", row, rowIndex)}
              className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
            >
              Drop
            </button>
          )}
        </div>
      ),
    },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSemesterFilter("all");
  };

  return (
    <div className="w-full h-full p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              All Courses
            </h2>
            <p className="text-gray-600">
              Manage your course enrollment and view available courses
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <MdRefresh size={16} />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <BiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search courses by code or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <BiFilter className="text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="enrolled">Enrolled</option>
              <option value="completed">Completed</option>
              <option value="dropped">Dropped</option>
            </select>
          </div>

          {/* Semester Filter */}
          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Semesters</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
          </select>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredData.length} of {courseData.length} courses
          </p>
          {(searchTerm ||
            statusFilter !== "all" ||
            semesterFilter !== "all") && (
            <p className="text-sm text-purple-600">Filters applied</p>
          )}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Table columns={columns} data={filteredData} />
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BiSearch size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" || semesterFilter !== "all"
                ? "Try adjusting your search criteria or filters"
                : "No courses are currently available"}
            </p>
            {(searchTerm ||
              statusFilter !== "all" ||
              semesterFilter !== "all") && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
