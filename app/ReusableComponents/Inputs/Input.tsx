"use client";
import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

interface InputProps {
  type?: string;
  label?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  max?: number;

  error?: string | false | null;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  max,

  error,

  placeholder = "",
  name = "",
  className = "",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="relative">
        {type === "password" ? (
          <>
            <input
              type={type}
              value={value}
              placeholder={placeholder}
              max={max}
              onChange={onChange}
              name={name}
              className={`border px-4 py-3 rounded w-full focus:outline-none focus:ring-1 
    ${
      error
        ? "border-red-500 focus:ring-red-300"
        : "border-gray-300 focus:ring-gray-300"
    } 
    ${className}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              type="button"
              className="absolute top-1/2 right-2 transform-translate-y-1/2 text-gray-500 focus:outline-none"
              onClick={toggleShowPassword}
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </>
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            max={max}
            onChange={onChange}
            name={name}
            className={`border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 w-full ${className}`}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
