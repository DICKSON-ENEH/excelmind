"use client";

import React, { useState } from "react";
import Table from "@/app/ReusableComponents/Table/Table";
import {
  useCreateCourse,
  useDeleteCourse,
  useEditCourse,
  useFetchLecturerCourses,
} from "@/app/hooks/useCourse";
import { toast } from "react-toastify";

// Helper to convert file to base64 string
const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const AllCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", credits: "" });
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null);
  const [editingCourse, setEditingCourse] = useState<CourseRow | null>(null);

  const lecturerId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const { data: courses = [], isLoading } = useFetchLecturerCourses(
    lecturerId || ""
  );
  const { mutate: createCourse } = useCreateCourse();
  const { mutate: deleteCourse } = useDeleteCourse();
  const { mutate: editCourse } = useEditCourse();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lecturerId) return toast.error("Lecturer ID not found");
    if (!syllabusFile) return toast.error("Please upload a syllabus file");

    try {
      const base64Syllabus = await readFileAsBase64(syllabusFile);

      const payload = {
        title: form.title,
        credits: Number(form.credits),
        syllabus: base64Syllabus,
        lecturerId,
      };

      const onSuccess = () => {
        toast.success(
          editingCourse
            ? "Course updated successfully"
            : "Course uploaded successfully"
        );
        setShowModal(false);
        setForm({ title: "", credits: "" });
        setSyllabusFile(null);
        setEditingCourse(null);
      };

      const onError = () => {
        toast.error(
          editingCourse ? "Failed to update course" : "Failed to upload course"
        );
      };

      if (editingCourse) {
        editCourse(
          { id: editingCourse.id, data: payload },
          { onSuccess, onError }
        );
      } else {
        createCourse(payload, { onSuccess, onError });
      }
    } catch (error) {
      toast.error("Error reading syllabus file");
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    deleteCourse(id, {
      onSuccess: () => toast.success("Course deleted"),
      onError: () => toast.error("Failed to delete course"),
    });
  };

  type CourseRow = {
    id: string;
    title: string;
    credits: number;
    semester?: string;
  };

  const columns = [
    { key: "title", title: "Course Title" },
    { key: "credits", title: "Credits" },
    { key: "semester", title: "Semester" },
    {
      key: "actions",
      title: "Actions",
      render: (row: CourseRow) => (
        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingCourse(row);
              setForm({ title: row.title, credits: String(row.credits) });
              setShowModal(true);
            }}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full p-6 relative">
      {courses.length === 0 && !isLoading ? (
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
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setShowModal(true);
                setEditingCourse(null);
                setForm({ title: "", credits: "" });
                setSyllabusFile(null);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Add Course
            </button>
          </div>
          <Table columns={columns} data={courses} />
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-purple-700">
              {editingCourse ? "Edit Course" : "Upload New Course"}
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                type="text"
                placeholder="Course Title"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                name="credits"
                value={form.credits}
                onChange={handleChange}
                type="number"
                placeholder="Credits"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => setSyllabusFile(e.target.files?.[0] || null)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCourse(null);
                    setForm({ title: "", credits: "" });
                    setSyllabusFile(null);
                  }}
                  className="text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  {editingCourse ? "Update" : "Submit"}
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
