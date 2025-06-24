// app/(admin)/components/AdminNavbar.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar({ onHamburgerClick }) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-gray-800 text-white h-16 px-4">
      <button
        onClick={onHamburgerClick}
        className="text-2xl md:hidden focus:outline-none"
      >
        ☰
      </button>

      <h1 className="text-lg font-bold">پنل مدیریت</h1>
<div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          
            </div>
          </button>

          {/* منوی کشویی */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-md shadow-lg z-20">
            
              <ul className="py-1">
                
                <li>
                  <button
                    onClick={  window.location.href = "/Admin/login"}
                    className="w-full text-right px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    خروج از حساب
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
    </header>
  );
}
