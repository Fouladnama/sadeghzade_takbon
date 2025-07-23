// app/(admin)/components/ShowProjects.jsx
"use client";
import React from "react";
import MangerAdmin from "../MngerAdmin/MangerAdmin";

export default function ShowProjects() {
  const apiUrl = "news"; // دقت کن / اول باشد

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">نمایش پروژه‌ها</h2>
      <MangerAdmin
      title="مدیریت اخبار تاک بن"
        cart={[
          { value: "title", header: "عنوان خبر" },
          { value: "content", header: "متن خبر" },
          { value: "title_en", header: "عنوان خبر انگلیسی " },
          { value: "content_en", header: "متن خبر انگلیسی "  },

          { value: "publish", header: "تاریخ خبر", ispublish:true},

          {
            value: "image",
            header: "عکس شاخص خبر",
            isImage: true, 
          },
          {
            value: "gallery",
            header: "گالری خبر",
            isGallery: true, // ✅ اصلاح شده
          },
        ]}
        apiUrl={apiUrl}
      />
    </div>
  );
}
