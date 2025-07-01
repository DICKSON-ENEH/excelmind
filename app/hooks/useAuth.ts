import { useMutation } from "@tanstack/react-query";
import { User } from "../types/types";
import { axiosInstance } from "../lib/axios";

// create user; sign-up
export const useSignup = () => {
  return useMutation({
    mutationFn: async ({ name, role, email, password }: User) => {
      const newUser = await axiosInstance.post("/users/create-user", {
        name,
        email,
        password,
        role,
      });
      return newUser.data;
    },
  });
};

// login user; sign-in
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: Partial<User>) => {
      const logIn = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      return logIn.data;
    },
  });
};
