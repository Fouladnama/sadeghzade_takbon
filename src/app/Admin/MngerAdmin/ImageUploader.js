"use client";

import React from "react";
import { toast } from "react-toastify";
import ApiConfig from "../../../Api";

export default function ImageUploader({ editedValues, setEditedValues, field, header }) {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await ApiConfig.post("https://takbon.biz:3402/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("تصویر با موفقیت آپلود شد");
      const fileName = res.data.key || res.data.filename || res.data.fileName;
      const imagePath = `images/${fileName}`;

      setEditedValues((prev) => ({
        ...prev,
        [field]: imagePath,
      }));
    } catch (err) {
      toast.error("خطا در آپلود تصویر");
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-semibold text-gray-700">{header} (تصویر اصلی):</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file:border-0 file:bg-blue-500 file:hover:bg-blue-600 file:active:bg-blue-700 file:text-white file:px-4 file:py-1 file:rounded transition cursor-pointer text-sm"
      />

      {editedValues[field] && (
        <div className="relative mt-2 w-40 h-40">
          <img
            src={`https://takbon.biz/images/${editedValues[field]}`}
            alt={header}
            className="w-full h-full object-cover rounded-xl border shadow hover:shadow-lg transition"
          />
        </div>
      )}
    </div>
  );
}
