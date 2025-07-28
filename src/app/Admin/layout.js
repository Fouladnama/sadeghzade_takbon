"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token && pathname !== "/Admin/login") {
      router.push("/Admin/login");
    } else {
      setIsAuthenticated(!!token); 
    }
  }, [pathname]);
  if (isAuthenticated === null && pathname !== "/Admin/login") {
    return <div>در حال بررسی دسترسی...</div>; 
  }
  if (pathname === "/Admin/login") {
    return <main className="h-screen">{children}</main>;
  }
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar onHamburgerClick={() => {}} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
