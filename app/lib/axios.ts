import axios from "axios";

const token = localStorage.getItem("token");

console.log(token, "token from axios.ts");

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL ?? "",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
