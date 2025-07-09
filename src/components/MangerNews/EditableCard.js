"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DatePickerInput from "./DatePickerInput";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";

export default function EditableCard({ item, onCancel, onSave }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [editValues, setEditValues] = useState({
    title: item.title,
    content: item.content,
    image: item.image,
    publish: item.publish || ""
  });

  const [gallery, setGallery] = useState(item.gallery || []);

  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await axios.post(
        'https://takbon.biz:3402/uploads',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: progressEvent => {
            const prog = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(prog);
          }
        }
      );

      toast.success("تصویر با موفقیت آپلود شد");
      const fileName = uploadRes.data.key || uploadRes.data.filename || uploadRes.data.fileName;
      const imagePath = `images/${fileName}`;

      setGallery(prev => [...prev, imagePath]);
    } catch (err) {
      console.error("خطا در آپلود تصویر:", err);
      toast.error("خطا در آپلود تصویر");
    } finally {
      setUploadProgress(0);
    }
  };

  const handleRemoveGalleryImage = (index) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedItem = {
      ...item,
      ...editValues,
      gallery,
    };
    onSave(item._id, updatedItem);
  };
   const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await axios.post(
                'https://takbon.biz:3402/uploads',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: progressEvent => {
                        const prog = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(prog);
                    }
                }
            );

            toast.success("تصویر با موفقیت آپلود شد");
            const fileName = uploadRes.data.key || uploadRes.data.filename || uploadRes.data.fileName;
            const imagePath = `images/${fileName}`;

            setEditValues(prev => ({
                ...prev,
                [field]: imagePath
            }));
        } catch (err) {
            console.error("خطا در آپلود تصویر:", err);
            toast.error("خطا در آپلود تصویر");
        }
    };
  return (
    <div className="flex flex-col gap-2">
      {editValues.image && (
        <img
          src={`https://takbon.biz/${editValues.image}`}
          alt={editValues.title}
          className="w-full h-32 object-cover rounded"
        />
      )}
      <input
        type="text"
        value={editValues.title}
        onChange={e => setEditValues(prev => ({ ...prev, title: e.target.value }))}
        className="border p-1 rounded"
      />
      <textarea
        value={editValues.content}
        onChange={e => setEditValues(prev => ({ ...prev, content: e.target.value }))}
        className="border p-1 rounded"
        rows={10}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm">تاریخ انتشار (شمسی)</label>
        <DatePickerInput
          value={editValues.publish}
          onChange={(date) => setEditValues(prev => ({ ...prev, publish: date }))}
          label="تاریخ انتشار (شمسی)"
        />
      </div>

      {/* آپلود تصویر شاخص */}
      <input
        type="file"
        accept="image/*"
        onChange={e => handleImageUpload(e, "image")}
        className="border p-1 rounded"
      />
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="text-sm text-gray-500">در حال آپلود: {uploadProgress}%</div>
      )}

      {/* نمایش گالری */}
      <label className="mt-2 mb-1 font-semibold">گالری تصاویر</label>
      <div className="gallery grid grid-cols-4 gap-2 mb-2">
        {gallery.map((imgSrc, idx) => (
          <div key={idx} className="relative group">
            <img
              src={`https://takbon.biz/${imgSrc}`}
              alt={`gallery-${idx}`}
              className="w-full h-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveGalleryImage(idx)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              title="حذف تصویر"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* آپلود تصویر جدید برای گالری */}
      <input
        type="file"
        accept="image/*"
        onChange={handleGalleryUpload}
        className="border p-1 rounded"
      />

      <div className="flex gap-2">
        <button
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm"
          onClick={handleSave}
        >
          ذخیره
        </button>
        <button
          className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 text-sm"
          onClick={onCancel}
        >
          لغو
        </button>
      </div>
    </div>
  );
}

