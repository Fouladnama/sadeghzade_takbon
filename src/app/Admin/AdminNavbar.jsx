"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    router.push("/Admin/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 backdrop-blur-lg bg-gradient-to-r from-pink-100 via-purple-50 to-purple-100 border-b border-white/30 shadow-md">
      <div className="w-full mx-auto grid grid-cols-3 items-center px-6 py-3">
        {/* ستون اول: دکمه همبرگر */}
        <div className="flex justify-start">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 hover:scale-105 transition transform"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ستون دوم: عنوان وسط */}
        <div className="flex justify-center">
          <h1 className="text-purple-700 font-extrabold text-xl tracking-wide">
            پنل ادمین تاک بن
          </h1>
        </div>

        {/* ستون سوم: دکمه خروج */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-purple-700 hover:text-purple-900 hover:scale-105 transition transform font-medium"
            aria-label="خروج"
            title="خروج"
          >
            <LogOut size={20} />
            خروج
          </button>
        </div>
      </div>
    </header>
  );
}
