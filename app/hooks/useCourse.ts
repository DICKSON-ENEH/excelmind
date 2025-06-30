import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      credits: number;
      syllabus: string;
      lecturerId: string;
    }) => axiosInstance.post("/courses/create", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturerCourses"] });
    },
  });
}

export const useFetchLecturerCourses = (lecturerId: string) => {
  return useQuery({
    queryKey: ["lecturerCourses", lecturerId],
    queryFn: () =>
      axiosInstance
        .get(`/courses/lecturer/${lecturerId}/courses`)
        .then((res) => res.data),
    enabled: !!lecturerId,
  });
};

export const useEditCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      axiosInstance.put(`/courses/update/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturerCourses"] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/course/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturerCourses"] });
    },
  });
};

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["allCourses"],
    queryFn: () => axiosInstance.get("/courses/browse").then((res) => res.data),
  });
};

export const useEnrollStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      studentId,
    }: {
      courseId: string;
      studentId: string;
    }) => axiosInstance.post(`/enrollments/${courseId}/enroll/${studentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(); // adjust if specific query keys are affected
    },
  });
};

export const useFetchStudentEnrollments = (studentId: string) => {
  return useQuery({
    queryKey: ["studentEnrollments", studentId],
    queryFn: () =>
      axiosInstance
        .get(`/enrollments/student/${studentId}`)
        .then((res) => res.data),
    enabled: !!studentId,
  });
};

export const useUnenrollStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      studentId,
    }: {
      courseId: string;
      studentId: string;
    }) => axiosInstance.delete(`enrollments/${courseId}/drop/${studentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(); // adjust if needed
    },
  });
};

export const useGetAllEnrollments = () => {
  return useQuery({
    queryKey: ["allEnrollments"],
    queryFn: async () => {
      const response = await axiosInstance.get("/enrollments/all-enrollments");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useApproveEnrollmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      adminId,
      status,
      enrollmentId,
    }: {
      adminId: string;
      status: "approved";
      enrollmentId: string;
    }) =>
      axiosInstance.post(`/enrollments/${enrollmentId}/approve/${adminId}`, {
        status,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEnrollments"] });
    },
  });
};

export const useDeclineEnrollmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      adminId,
      status,
      enrollmentId,
    }: {
      adminId: string;
      status: "declined";
      enrollmentId: string;
    }) =>
      axiosInstance.post(`/enrollments/${enrollmentId}/decline/${adminId}`, {
        status,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEnrollments"] });
    },
  });
};
