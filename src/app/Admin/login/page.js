"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ApiConfig from "../../../Api";
import Image from "next/image";
import wallpaper from "../../../../public/Assests/Admin/login/1.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { status, data } = await ApiConfig.post(
        "https://takbon.biz:3402/login",
        { username, password }
      );
      if (status === 200 && data.result) {
        const { token, ...user } = data.value;
        localStorage.setItem("access_token", token);
        localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/Admin/dashboard");
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row h-screen w-screen bg-[#f0f4f8]"
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex md:w-1/2 items-center justify-center bg-[#0a4b78]"
      >
        <Image src={wallpaper} alt="Admin Illustration" className="w-3/4 h-auto rounded-xl shadow-lg" />
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white rounded-none md:rounded-l-3xl shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">ADMIN</h1>
        <form onSubmit={handleLogin} dir="rtl" className="w-full max-w-xs space-y-4">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaEnvelope className="text-gray-400 ml-2" />
            <input type="text" placeholder="نام کاربری" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full py-2 focus:outline-none text-right" />
          </div>
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaLock className="text-gray-400 ml-2" />
            <input type="password" placeholder="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full py-2 focus:outline-none text-right" />
          </div>
          <button disabled={loading} type="submit" className="w-full py-2 bg-[#0a4b78] text-white rounded hover:bg-[#08395e] transition duration-200">
            {loading ? "در حال ورود..." : "ورود"}
          </button>
         
        </form>
      </motion.div>
    </motion.main>
  );
}