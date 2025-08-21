"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "صفحه اصلی", href: "/Admin/dashboard", icon: "🏠" },
  { label: "پروژه‌ها", href: "/Admin/ProjectsAdmin/ProjectDetailAdmin", icon: "📰" },
  { label: "انواع پروژه‌ها", href: "/Admin/ProjectsAdmin", icon: "📁" },
  { label: "ابزار ها", href: "/Admin/ProjectsAdmin/EquipmentAdmin", icon: "🛠️" },
  { label: "رزومه‌ها", href: "/Admin/CollaborationAdmin", icon: "📄" },
  { label: "اخبار", href: "/Admin/NewsAdmin", icon: "📰" },
  { label: "خدمات ", href: "/Admin/ServicesAdmin", icon: "📰" },
  { label: "مشتریان ", href: "/Admin/CompanyAdmin", icon: "📰" },
];

export default function AdminSidebar({ open, setOpen }) {
  const pathname = usePathname();

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-pink-50 via-purple-50 to-purple-100 backdrop-blur-lg border-l border-white/30 shadow-2xl z-40 transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full p-6 space-y-6">
        <h2 className="text-2xl font-extrabold text-purple-600 mb-4 text-center tracking-wide">
          پنل هوشمند
        </h2>
        <nav className="flex flex-col space-y-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl font-medium transition transform ${
                  isActive
                    ? "bg-purple-500 text-white shadow-lg scale-105"
                    : "text-purple-600 hover:bg-purple-400 hover:text-white hover:scale-105"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
