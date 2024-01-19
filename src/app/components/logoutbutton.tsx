"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { render } from "react-dom";

export default function LogOutComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();

    router.push("/login");

  };

  return (
    <div>
      <button className="text-white text-center text-sm font-medium leading-5 whitespace-nowrap items-stretch bg-blue-400 grow justify-center px-5 py-2.5 rounded-md" onClick={handleLogout}>Log Out</button>
    </div>
  );
}