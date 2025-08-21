"use client";
import React from "react";
import MangerAdmin from "../MngerAdmin/MangerAdmin";

export default function ServicesAdmin() {
  const apiUrl = "services_available";

  return (
    <div className="p-4">
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
