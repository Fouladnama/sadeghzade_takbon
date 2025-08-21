"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavbarAdmin() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center">
       
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="hidden md:inline">سلام، Admin</span>
        
          </button>

        
        </div>
      </div>
    </header>
  );
}
