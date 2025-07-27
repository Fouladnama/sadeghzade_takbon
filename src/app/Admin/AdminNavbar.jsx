"use client";

import { User, Bell, LogOut } from "lucide-react"; // اضافه کردم آیکون خروج
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    router.push("/Admin/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 backdrop-blur-md bg-white/20 border-b border-white/30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 animate-pulse shadow-lg"></div>
          <h1 className="text-white font-semibold text-lg hidden sm:block">پنل مدیریت هوشمند</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative text-purple-400 hover:text-white transition">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 bg-pink-500 w-2 h-2 rounded-full animate-ping"></span>
          </button>
          <Link href="/profile" className="text-purple-400 hover:text-white transition">
            <User size={24} />
          </Link>

          {/* دکمه خروج */}
          <button
            onClick={handleLogout}
            className="text-purple-400 hover:text-white transition flex items-center gap-1"
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
