"use client";
import React from "react";

export default function ResumeHeader({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-3 mb-6 border-b border-gray-300 pb-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}
