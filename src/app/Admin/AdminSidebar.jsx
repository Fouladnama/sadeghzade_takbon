"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "صفحه اصلی", href: "/Admin/dashboard", icon: "🏠" },
  { label: "پروژه‌ها", href: "/Admin/ProjectsAdmin/ProjectDetailAdmin", icon: "📰" },
  { label: "انواع پروژه‌ها", href: "/Admin/ProjectsAdmin", icon: "📁" },
  { label: "ابزار ها", href: "/Admin/ProjectsAdmin/EquipmentAdmin", icon: "🛠️" },
  { label: "رزومه‌ها", href: "/Admin/CollaborationAdmin", icon: "📄" },
  { label: "اخبار", href: "/Admin/NewsAdmin", icon: "📰" },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* دکمه همبرگری سمت راست */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* سایدبار سمت راست */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/20 backdrop-blur-md border-l border-white/30 shadow-xl z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4 space-y-4">
          <h2 className="text-lg font-bold text-purple-400">پنل هوشمند</h2>
          <nav className="flex flex-col space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center p-2 rounded-lg transition ${
                  pathname === link.href
                    ? "bg-purple-500 text-white"
                    : "text-purple-400 hover:bg-purple-500 hover:text-white"
                }`}
              >
                <span className="ml-2">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
       
        </div>
      </div>
    </>
  );
}
