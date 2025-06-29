import Button from "@/app/ReusableComponents/Buttons/Button";
import Input from "@/app/ReusableComponents/Inputs/Input";
import React from "react";

export default function page() {
  return (
    <div className="border border-purple-50 mx-auto my-auto p-6 w-fit">
      <p className="font-medium">Email</p>
      <Input />
      <div className="m-4" />
      <p className="font-medium">Password</p>
      <Input />
      <div className="m-4" />
      <Button>Login</Button>
    </div>
  );
}
