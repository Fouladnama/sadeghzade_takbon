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
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200">
      <form
        onSubmit={handleLogin}
        className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-96 flex flex-col"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
          ورود ادمین
        </h2>
        
        <div className="relative mb-6">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="peer w-full border-b-2 border-gray-300 focus:border-pink-500 text-gray-900 placeholder-transparent py-3 px-1 focus:outline-none"
            placeholder="نام کاربری"
          />
          <label
            htmlFor="username"
            className="absolute left-1 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-pink-500 peer-focus:text-sm transition-all"
          >
            نام کاربری
          </label>
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full border-b-2 border-gray-300 focus:border-pink-500 text-gray-900 placeholder-transparent py-3 px-1 focus:outline-none"
            placeholder="رمز عبور"
          />
          <label
            htmlFor="password"
            className="absolute left-1 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-pink-500 peer-focus:text-sm transition-all"
          >
            رمز عبور
          </label>
        </div>

        {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:scale-105 hover:shadow-xl transition transform duration-200"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
