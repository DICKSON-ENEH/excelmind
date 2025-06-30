// hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/all-users");
      return data;
    },
  });
};
