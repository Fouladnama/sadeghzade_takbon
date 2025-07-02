// app/(admin)/components/AdminSidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SIDEBAR_LINKS = [
  { label: "صفحه اصلی", href: "/Admin/dashboard", icon: "🏠" },
  { label: "پروژه‌ها", href: "/Admin/ProjectsAdmin/ProjectDetailAdmin", icon: "📰" },
  { label: "انواع پروژه‌ها", href: "/Admin/ProjectsAdmin", icon: "📁" },
  { label: "ابزار ها", href: "/Admin/ProjectsAdmin/EquipmentAdmin", icon: "📁" },
  { label: "رزومه‌ها", href: "/Admin/resumes", icon: "📄" },
    { label: "اخبار", href: "/Admin/NewsAdmin", icon: "📄" },

];

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <aside
      onMouseLeave={() => {
        if (isOpen) onClose();
      }}
      className={`
        fixed top-0 right-0 h-full w-56 bg-gray-900 text-white p-4 z-20
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        md:translate-x-0 md:static md:block
      `}
    >
      {SIDEBAR_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className={`
            flex items-center px-3 py-2 mb-1 rounded-md transition
            ${pathname === link.href
              ? "bg-gray-800 font-bold"
              : "hover:bg-gray-800"}
          `}
        >
          <span className="ml-3 text-lg">{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </aside>
  );
}
