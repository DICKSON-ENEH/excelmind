/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Table from "@/app/ReusableComponents/Table/Table";
import React from "react";
import {
  useGetAllCourses,
  useEnrollStudent,
  useUnenrollStudent,
} from "@/app/hooks/useCourse";
import { toast } from "react-toastify";

interface CourseData {
  id: string;
  title: string;
  credits: number;
  syllabus: string;
  lecturer: {
    id: string;
    email: string;
    name: string;
  };
}

const Course = () => {
  const { data: courses, isLoading, isError } = useGetAllCourses();
  const { mutate: enrollStudent } = useEnrollStudent();
  const { mutate: unenrollStudent } = useUnenrollStudent();

  const studentId = localStorage.getItem("id");

  const handleAction = (
    action: "view" | "enroll" | "drop",
    course: CourseData,
    rowIndex: number
  ) => {
    if (!studentId) {
      toast.error("Student ID not found in localStorage");
      return;
    }

    switch (action) {
      case "view":
        console.log("Viewing course:", course);
        break;
      case "enroll":
        enrollStudent(
          { courseId: course.id, studentId },
          {
            onSuccess: () => toast.success("Enrolled successfully"),
            onError: () => toast.error("Failed to enroll"),
          }
        );
        break;
      case "drop":
        unenrollStudent(
          { courseId: course.id, studentId },
          {
            onSuccess: () => toast.success("Dropped successfully"),
            onError: () => toast.error("Failed to drop course"),
          }
        );
        break;
    }
  };

  const columns = [
    { key: "title", title: "Course Title" },
    { key: "credits", title: "Credit Units" },
    {
      key: "lecturer.name",
      title: "Lecturer",
      render: (row: CourseData) => row.lecturer.name,
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
          <button
            onClick={() => handleAction("enroll", row, rowIndex)}
            className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-md transition-colors"
          >
            Enroll
          </button>
          <button
            onClick={() => handleAction("drop", row, rowIndex)}
            className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
          >
            Drop
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
          <p className="text-gray-600">
            View all available courses and perform actions
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          {isLoading ? (
            <p className="p-4 text-center text-gray-500">Loading courses...</p>
          ) : isError ? (
            <p className="p-4 text-center text-red-500">
              Failed to load courses
            </p>
          ) : (
            <Table columns={columns} data={courses || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
