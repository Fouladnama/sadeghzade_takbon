// app/(admin)/layout.jsx
"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // اگر در لاگین هستیم، فقط کامپوننت لاگین را رندر کن
  if (pathname === "/Admin/login") {
    return <main className="h-screen">{children}</main>;
  }

  return (
    <div className="flex">
            <AdminSidebar  />
      <div className="flex-1 flex flex-col">
        <AdminNavbar onHamburgerClick={toggleSidebar} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
