"use client";
import React from "react";
import MangerAdmin from "../MngerAdmin/MangerAdmin";

export default function ServicesAdmin() {
  const apiUrl = "services_available";

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">خدمات</h2>
      <MangerAdmin
      title="مدیریت خدمات  تاک بن"
        cart={[
          { value: "title_fa", header: "عنوان خدمات " },
          { value: "title_en", header: "عنوان خدمات انگلیسی خبر" },
          { value: "items_fa", header: "موارد",isArray: true },
          { value: "items_en", header: "موارد انگلیسی" ,isArray: true },
          {
            value: "image",
            header: "عکس شاخص خدمات",
            isImage: true, 
          },
        
        ]}
        apiUrl={apiUrl}
      />
    </div>
  );
}
