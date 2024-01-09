"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LogOutComponent() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}