"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/signup/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.status === 201) {
        router.push("/");
      } else {
        setError("Failed to sign up");
      }
    } catch (error) {
      setError("Failed to sign up");
    }
  };

  return (
    <div className="h-screen">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto mt-40"
        >
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-700">
            Verfy your Email
          </h3>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
           
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}