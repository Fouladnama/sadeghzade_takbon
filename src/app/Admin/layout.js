"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token && pathname !== "/Admin/login") {
      router.push("/Admin/login");
    } else {
      setIsAuthenticated(!!token);
    }
  }, [pathname]);

  if (isAuthenticated === null && pathname !== "/Admin/login") {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        در حال بررسی دسترسی...
      </div>
    );
  }

  if (pathname === "/Admin/login") {
    return (
      <main className="h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200 flex justify-center items-center">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-purple-100 font-sans text-lg">
      <div className="border border-gray-200 rounded-3xl shadow-2xl bg-white min-h-screen overflow-hidden transition-all duration-300">
        <div className="flex h-full">
          <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <div className="flex-1 flex flex-col">
            <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-auto pt-[70px] p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
