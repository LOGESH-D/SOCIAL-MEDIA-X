import { useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../assets/X.jsx";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

// import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // const queryClient = useQueryClient();

  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   isError,
  //   error,
  // } = useMutation({
  //   mutationFn: async ({ username, password }) => {
  //     try {
  //       const res = await fetch("/api/auth/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ username, password }),
  //       });

  //       const data = await res.json();

  //       if (!res.ok) {
  //         throw new Error(data.error || "Something went wrong");
  //       }
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //   },
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isError = false;

  return (
    <div className="max-w-7xl mx-auto flex h-screen">
      {/* Left side SVG */}
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>

      {/* Right side form */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="flex gap-4 flex-col lg:w-2/3 md:mx-20 w-full"
          onSubmit={handleSubmit}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Let's go.</h1>

          {/* Username */}
          <label className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <MdOutlineMail className="text-gray-400" />
            <input
              type="text"
              className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          {/* Password */}
          <label className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <MdPassword className="text-gray-400" />
            <input
              type="password"
              className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
          >
            Login
          </button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>

        {/* Signup link */}
        <div className="flex flex-col gap-2 mt-4 lg:w-2/3 w-full">
          <p className="text-white text-lg">Don't have an account?</p>
          <Link to="/signup">
            <button className="w-full border border-white text-white hover:bg-white hover:text-black font-semibold py-2 rounded-full transition">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
