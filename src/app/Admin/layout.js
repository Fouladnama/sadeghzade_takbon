"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null تا قبل از چک

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token && pathname !== "/Admin/login") {
      // اگر لاگین نیست و تلاش کرده به صفحه ادمین غیر از لاگین بره، برگردونش
      router.push("/Admin/login");
    } else {
      setIsAuthenticated(!!token); // اگر توکن هست، auth=true
    }
  }, [pathname]);

  // اگر هنوز auth بررسی نشده
  if (isAuthenticated === null && pathname !== "/Admin/login") {
    return <div>در حال بررسی دسترسی...</div>; // یا یک لودینگ نشون بده
  }

  // اگر در صفحه لاگین هستیم، بدون ساختار ادمین نشون بده
  if (pathname === "/Admin/login") {
    return <main className="h-screen">{children}</main>;
  }

  // اگر auth شد و وارد هست
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
