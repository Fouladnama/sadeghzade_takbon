"use client";

import React from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import ApiConfig from "../../../Api";

export default function GalleryHandler({
  editedValues,
  setEditedValues,
  field,
  header,
  editingImageIndex,
  setEditingImageIndex,
}) {
  // آپلود عکس جدید برای یک عکس در گالری
  const handleSingleGalleryImageUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await ApiConfig.post("https://takbon.biz:3402/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imagePath = `images/${res.data.key}`;
      setEditedValues((prev) => {
        const gallery = prev[field] && Array.isArray(prev[field]) ? [...prev[field]] : [];
        gallery[idx] = imagePath;
        return { ...prev, [field]: gallery };
      });
      setEditingImageIndex(null);
      Swal.fire("آپلود شد", "تصویر با موفقیت جایگزین شد", "success");
    } catch (err) {
      Swal.fire("خطا", "خطا در آپلود تصویر", "error");
    }
  };

  // آپلود چند عکس جدید به گالری
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      const uploadedImages = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await ApiConfig.post("https://takbon.biz:3402/uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedImages.push(`images/${res.data.key}`);
        Swal.fire("آپلود شد", `تصویر ${i + 1} با موفقیت آپلود شد`, "success");
      }

      setEditedValues((prev) => {
        const prevGallery = prev[field] && Array.isArray(prev[field]) ? prev[field] : [];
        return { ...prev, [field]: [...prevGallery, ...uploadedImages] };
      });
    } catch (err) {
      Swal.fire("خطا", "خطا در آپلود تصاویر گالری", "error");
    }
  };

  // حذف عکس از گالری
  const handleRemoveGalleryImage = (index) => {
    setEditedValues((prev) => {
      const gallery = prev[field] && Array.isArray(prev[field]) ? [...prev[field]] : [];
      gallery.splice(index, 1);
      return { ...prev, [field]: gallery };
    });
  };

 return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-semibold text-gray-700">{header} (گالری تصاویر):</label>

      <div className="flex flex-wrap gap-3">
        {(editedValues[field] && Array.isArray(editedValues[field]) ? editedValues[field] : []).map(
          (imgSrc, idx) => (
            <div
              key={idx}
              className="relative group rounded-lg overflow-hidden shadow border border-gray-200 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={`https://takbon.biz/images/${imgSrc}`}
                alt={`${header}-${idx}`}
                className="w-24 h-24 object-cover"
              />

              {/* دکمه حذف */}
              <button
                type="button"
                onClick={() => handleRemoveGalleryImage(idx)}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow opacity-0 group-hover:opacity-100 transition"
                title="حذف تصویر"
              >
                ×
              </button>

              {/* دکمه ویرایش */}
              {editingImageIndex === idx ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSingleGalleryImageUpload(e, idx)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  title="انتخاب عکس جدید"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingImageIndex(idx)}
                  className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition"
                  title="ویرایش تصویر"
                >
                  <FaEdit size={12} />
                </button>
              )}
            </div>
          )
        )}
      </div>

      <label className="text-xs text-gray-500 mt-1">برای افزودن تصاویر جدید کلیک کنید:</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleGalleryUpload}
        className="file:border-0 file:bg-green-500 file:hover:bg-green-600 file:active:bg-green-700 file:text-white file:px-3 file:py-1 file:rounded cursor-pointer transition text-sm"
      />
    </div>
  );
}
