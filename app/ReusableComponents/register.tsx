"use client";
import React, { useState } from "react";
import Input from "./Inputs/Input";
import Button from "./Buttons/Button";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSignup } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LiaSpinnerSolid } from "react-icons/lia";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: registerUser } = useSignup();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },

    validationSchema: yup.object({
      name: yup.string().required("Your name is required"),
      email: yup
        .string()
        .email("must be an email")
        .required("Your email address is required"),
      password: yup
        .string()
        .required("Your password is required")
        .min(8, "Pssword must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        registerUser(
          { ...values },
          {
            onSuccess: (res: unknown) => {
              toast.success(res.message);
              setIsLoading(false);
              router.push("/dashboard/home");
            },
            onError: (res: unknown) => {
              toast.error("Couldn't create user");
              setIsLoading(false);
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="w-[30%] max-md:w-[90%] h-[90%] border-purple-500 border rounded-md shadow-md bg-white">
        <div className="w-full h-[14%] flex justify-center flex-col items-center pt-6">
          <p className="font-semibold text-2xl text-gray-800">Register</p>
          <p className="text-gray-600">Create an account to get started</p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="px-8 py-4 h-[86%] flex flex-col"
        >
          <div className="flex-1 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-[12px] text-left mt-[10px] flex justify-start w-full">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Input
                {...formik.getFieldProps("email")}
                type="email"
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[12px] text-left mt-[10px] flex justify-start w-full">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-[12px] text-left mt-[10px] flex justify-start w-full">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                {...formik.getFieldProps("role")}
                id="role"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="text-red-500 text-[12px] text-left mt-[10px] flex justify-start w-full">
                  {formik.errors.role}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <Button
              type="submit"
              className="w-full bg-purple-800 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center">
                  Creating Acount
                  <LiaSpinnerSolid className="text-[20px] animate-spin" />
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-purple-800 hover:text-purple-700 font-medium"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
