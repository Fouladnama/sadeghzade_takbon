"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ApiConfig from "../../../Api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiConfig.post("https://takbon.biz:3402/login", {
        username,
        password
      });

      const data = response.data;

      if (data.result && data.value.admin) {
        localStorage.setItem("adminToken", data.value.token);
        router.push("/Admin/dashboard");
      } else {
        setError("شما دسترسی ادمین ندارید.");
      }
    } catch (err) {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">ورودادمین</h2>
        
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
