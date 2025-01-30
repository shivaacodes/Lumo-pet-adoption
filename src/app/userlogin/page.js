"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/userlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Successfully Logged In!");
      router.push("/"); // Redirect to homepage or dashboard
    } else {
      alert(data.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen w-full">
      <div className="h-full w-full z-0 absolute object-cover overflow-hidden">
        <Image
          src="/images/adopt-banner.jpg"
          width={1700}
          height={1200}
          alt="Pet Adoption Banner"
        />
      </div>
      <div className="w-3/4 md:w-1/2 shadow-xl flex items-center justify-center z-20">
        <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-full">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-xl text-gray-600 mt-2">
              Login to adopt your new furry friend
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-gray-700 font-semibold">
                Email Address
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-envelope mr-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full border-none outline-none text-gray-700 p-2"
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-key mr-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  className="w-full border-none outline-none text-gray-700 p-2"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-green-500 text-white w-36 h-10 rounded-md hover:bg-green-400 transform hover:scale-105 transition"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center pt-4">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <a href="/signup" className="text-green-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
