"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/usersignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registered Successfully!");
      router.push("/");
    } else {
      alert("Registration failed: " + data.message);
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center h-screen w-full">
      <div className="flex w-full h-full">
        <div className="flex-[2] bg-green-800 text-white p-16 flex flex-col justify-center items-center relative shadow-xl rounded-lg">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/leme.png"
              width={1100}
              height={9000}
              alt="Background Image"
              className="object-cover w-full h-full opacity-30"
            />
          </div>
          <div className="relative z-10 text-center space-y-6 font-serif text-6xl font-extrabold tracking-wide leading-tight">
            <span>Create</span>
            <span> </span>
            <span>account</span>
          </div>
        </div>

        <div className="flex-[1] bg-white p-16 flex flex-col justify-center items-center space-y-8">
          <div className="relative z-10 flex flex-col space-y-6 w-96 bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  <input
                    placeholder="user-name"
                    className="rounded-md p-3 w-full border-2 border-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleNameChange}
                  />
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                  <input
                    placeholder="email-id"
                    className="rounded-md p-3 w-full border-2 border-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="currentColor"
                    className="bi bi-key"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                  <input
                    placeholder="password"
                    className="rounded-md p-3 w-full border-2 border-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handlePasswordChange}
                    type="password"
                  />
                </div>

                <div className="flex justify-center pt-6">
                  <div className="flex justify-center w-full h-14 rounded-full items-center hover:scale-105">
                    <button className="w-full bg-green-600 h-12 rounded-full text-white text-lg hover:bg-green-500">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
