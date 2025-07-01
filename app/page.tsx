"use client"
import Button from "./ReusableComponents/Buttons/Button";
// import Input from "./ReusableComponents/Inputs/Input";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()


  const proceed = ()=>{
    router.push("/auth/register")
  }
  return (
    <div className="h-[100vh] bg-white flex justify-center items-center flex-col">
    {/* <Input placeholder="this is input sample" className="!w-[300px] !text-[#000]"/> */}
    <Button onClick={proceed} className = "bg-purple-800 p-2 !text-[#e7ddddef] h-[60px] w-[300px] cursor-pointer">
Proceed To Registration
    </Button>
    </div>
  );
}
