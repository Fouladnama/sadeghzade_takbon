"use client";
import React from "react";
import Sidebar from './Sidebar'; // Import Sidebar
import './admin.css';

export default function AdminLayout({ children }) {
  return (
    <div >
      <Sidebar />
      <main >
        {children}
      </main>
    </div>
  );
}
