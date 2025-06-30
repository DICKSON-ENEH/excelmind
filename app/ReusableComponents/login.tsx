"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useLogin } from "../hooks/useAuth";
import { useFormik } from "formik";
import Input from "./Inputs/Input";
import Button from "./Buttons/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LiaSpinnerSolid } from "react-icons/lia";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: logUserIn } = useLogin();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Pls enter your email").email(),
      password: yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        logUserIn(
          {
            ...values,
          },
          {
            onSuccess: (res: unknown) => {
              toast.success(res.message);
              setIsLoading(false);
              router.push("/dashboard/home");
            },
            onError: (res: unknown) => {
              toast.error("Invalid credentials");
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
    <div className="h-[100vh] bg-white flex justify-center items-center flex-col">
      <p className="mb-6 text-2xl text-gray-800">Login in to your account</p>
      <div className="border-2 border-purple-100 p-8 w-fit rounded">
        <form onSubmit={formik.handleSubmit}>
          <p className="font-medium text-[19px] text-gray-800">Email</p>
          <Input
            placeholder="Enter your email"
            className="!w-[300px] !text-[#000]"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-[12px] text-left mt-[10px] flex justify-start w-full">
              {formik.errors.email}
            </div>
          )}
          <p className="font-medium text-[19px] text-gray-800">Password</p>
          <Input
            type="password"
            placeholder="Enter your password"
            className="!w-[300px] !text-[#000]"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-[12px] text-left mt-[10px] flex justify-start w-full">
              {formik.errors.password}
            </div>
          )}
          <div className="m-8" />

          <Button
            className="bg-purple-800 p-2 !text-[#e7ddddef] h-[60px] w-[300px] cursor-pointer"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center gap-2 justify-center">
                Logging in
                <LiaSpinnerSolid className="text-[20px] animate-spin" />
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
