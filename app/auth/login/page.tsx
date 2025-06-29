import Button from "@/app/ReusableComponents/Buttons/Button";
import Input from "@/app/ReusableComponents/Inputs/Input";
import React from "react";

export default function page() {
  return (
    <div className="h-[100vh] bg-white flex justify-center items-center flex-col">
      <p className="mb-6 text-2xl text-gray-800">Login in to your account</p>

      <div className="border-2 border-purple-100 p-8 w-fit">

        <p className="font-medium text-[19px] text-gray-800">Email</p>
        <Input
          placeholder="Enter your email"
          className="!w-[300px] !text-[#000]"
        />
        <p className="font-medium text-[19px] text-gray-800">Password</p>
        <Input
          type="password"
          placeholder="Enter your password"
          className="!w-[300px] !text-[#000]"
        />
        <div className="m-8" />

        <Button className="bg-purple-800 p-2 !text-[#e7ddddef] h-[60px] w-[300px] cursor-pointer">
          Login
        </Button>
      </div>
    </div>
  );
}
