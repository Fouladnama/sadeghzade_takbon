"use client";
import { useState } from "react";
import ApiConfig from "../../Api";
import DatePickerInput from "./DatePickerInput";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddNews({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [publish, setPublish] = useState(""); // رشته تاریخ شمسی
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
const [gallery, setGallery] = useState([]); // آرایه آدرس تصاویر گالری

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const response = await ApiConfig.post("https://takbon.biz:3402/news", {
      title,
      content,
      image,
      publish,
      gallery
    });

    console.log("خبر جدید اضافه شده:", response.data); // اضافه کنید برای بررسی

    setSuccess("خبر با موفقیت اضافه شد!");
    setTitle("");
    setContent("");
    setImage("");
    setPublish("");

    if (onTaskAdded) onTaskAdded(response.data); // بررسی کنید این داده کامل باشد
  } catch (err) {
    console.error(err);
    setError("خطا در افزودن خبر");
  } finally {
    setLoading(false);
  }
};

const handleGalleryChange = async (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  setUploadProgress(0);
  const uploadedPaths = [];

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append("file", files[i]);

    try {
      const res = await axios.post("https://takbon.biz:3402/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (pe) => {
          const prog = Math.round((pe.loaded * 100) / pe.total);
          setUploadProgress(prog);
        },
      });

      const fileName = res.data.key || res.data.filename || res.data.fileName;
      uploadedPaths.push(`images/${fileName}`);

      toast.success(`تصویر ${i + 1} با موفقیت آپلود شد`);
    } catch (err) {
      console.error(err);
      toast.error(`خطا در آپلود تصویر ${i + 1}`);
    }
  }

  setGallery(prev => [...prev, ...uploadedPaths]);
  setUploadProgress(0);
};

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadProgress(0);
      const res = await axios.post("https://takbon.biz:3402/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (pe) => {
          const prog = Math.round((pe.loaded * 100) / pe.total);
          setUploadProgress(prog);
        },
      });

      const fileName = res.data.key || res.data.filename || res.data.fileName;
      const imagePath = `images/${fileName}`;
      setImage(imagePath);

      toast.success("تصویر با موفقیت آپلود شد");
      setUploadProgress(0);
    } catch (err) {
      console.error(err);
      toast.error("خطا در آپلود تصویر");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded w-80">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان"
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="شرح"
        className="border p-2 rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded"
      />
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="text-sm text-gray-500">در حال آپلود: {uploadProgress}%</div>
      )}
      {image && (
        <img
          src={`https://takbon.biz/${image}`}
          alt="تصویر انتخابی"
          className="w-full h-40 object-cover rounded"
        />
      )}

      {/* افزودن فیلد انتخاب تاریخ شمسی */}
      <DatePickerInput
        value={publish}
        onChange={setPublish}
        label="تاریخ انتشار (شمسی)"
      />
<input
  type="file"
  accept="image/*"
  multiple
  onChange={handleGalleryChange}
  className="border p-2 rounded"
/>

{gallery.length > 0 && (
  <div className="grid grid-cols-3 gap-2 mt-2 mb-2">
    {gallery.map((imgSrc, idx) => (
      <img
        key={idx}
        src={`https://takbon.biz/${imgSrc}`}
        alt={`gallery-preview-${idx}`}
        className="w-full h-20 object-cover rounded"
      />
    ))}
  </div>
)}


      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "در حال ارسال..." : "افزودن خبر"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
}
