"use client"
import Button from "./ReusableComponents/Buttons/Button";
import Input from "./ReusableComponents/Inputs/Input";


export default function Home() {
  return (
    <div className="h-[100vh] bg-white flex justify-center items-center flex-col">
    <Input placeholder="this is input sample" className="!w-[300px] !text-[#000]"/>
    <Button className = "bg-purple-800 p-2 !text-[#e7ddddef] h-[60px] w-[300px] cursor-pointer">
      This is button sample
    </Button>
    </div>
  );
}
