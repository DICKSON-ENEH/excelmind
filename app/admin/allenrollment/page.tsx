"use client";

import React, { useState } from "react";

import Table from "@/app/ReusableComponents/Table/Table";
import {
  useApproveEnrollmentStatus,
  useDeclineEnrollmentStatus,
  useGetAllEnrollments,
} from "@/app/hooks/useCourse";
import { toast } from "react-toastify";

const EnrollmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null); // stores the ID of the enrollment being updated

  console.log(setSearchTerm, setSelectedStatus, setSelectedCourse);

  const {
    data: enrollmentData = [],
    isLoading,
    error,
    refetch,
  } = useGetAllEnrollments();

  const ApprovedStatus = useApproveEnrollmentStatus();
  const DeclineStatus = useDeclineEnrollmentStatus();

  const adminId = localStorage.getItem("id") ?? "";

  const handleStatusChange = async (
    enrollmentId: string,
    newStatus: string
  ) => {
    setActionLoading(enrollmentId);
    try {
      if (newStatus === "approved") {
        await ApprovedStatus.mutateAsync({
          enrollmentId,
          adminId,
          status: "approved",
        });
        toast.success("Enrollment approved");
      } else if (newStatus === "declined") {
        await DeclineStatus.mutateAsync({
          enrollmentId,
          adminId,
          status: "declined",
        });
        toast.success("Enrollment declined");
      }
      await refetch();
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update enrollment status");
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    { key: "studentName", title: "Student Name" },
    { key: "email", title: "Email" },
    { key: "courseTitle", title: "Course" },
    { key: "credits", title: "Credits" },
    { key: "lecturer", title: "Lecturer" },
    { key: "status", title: "Status" },
    {
      key: "actions",
      title: "Actions",
      render: (row: {
        id: string;
        studentName: string;
        email: string;
        courseTitle: string;
        credits: number | string;
        lecturer: string;
        status: string;
      }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusChange(row.id, "approved")}
            disabled={actionLoading === row.id}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {actionLoading === row.id && row.status !== "approved"
              ? "Approving..."
              : "Approve"}
          </button>
          <button
            onClick={() => handleStatusChange(row.id, "declined")}
            disabled={actionLoading === row.id}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {actionLoading === row.id && row.status !== "declined"
              ? "Declining..."
              : "Decline"}
          </button>
        </div>
      ),
    },
  ];

  interface Enrollment {
    id: string;
    student?: {
      name?: string;
      email?: string;
    };
    course?: {
      title?: string;
      credits?: number | string;
      lecturer?: {
        name?: string;
      };
    };
    status?: string;
  }

  const formattedData = enrollmentData.map((enrollment: Enrollment) => ({
    id: enrollment.id,
    studentName: enrollment.student?.name || "N/A",
    email: enrollment.student?.email || "N/A",
    courseTitle: enrollment.course?.title || "N/A",
    credits: enrollment.course?.credits ?? "-",
    lecturer: enrollment.course?.lecturer?.name || "N/A",
    status: enrollment.status || "N/A",
  }));

  const filteredData = formattedData.filter(
    (item: {
      id: string;
      studentName: string;
      email: string;
      courseTitle: string;
      credits: number | string;
      lecturer: string;
      status: string;
    }) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        item.studentName.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.courseTitle.toLowerCase().includes(searchLower);

      const matchesStatus =
        selectedStatus === "all" || item.status === selectedStatus;
      const matchesCourse =
        selectedCourse === "all" || item.courseTitle === selectedCourse;

      return matchesSearch && matchesStatus && matchesCourse;
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filters Omitted for Brevity */}
        {/* Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center p-6 text-blue-500">Loading...</div>
            ) : error ? (
              <div className="text-center p-6 text-red-500">
                Failed to load data
              </div>
            ) : (
              <Table columns={columns} data={filteredData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
