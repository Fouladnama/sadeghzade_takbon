"use client";

import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import ApiConfig from "../../Api";
import DatePickerInput from "./DatePickerInput";
import { toast } from "react-toastify";

export default function AddAdmin({ isOpen, onClose, cart, apiUrl, onSuccess }) {
  const [formData, setFormData] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_GALLERY_IMAGES = 5;

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("حجم تصویر اصلی نباید بیشتر از 2 مگابایت باشد");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    try {
      setUploadProgress(0);
      const res = await ApiConfig.post("https://takbon.biz:3402/uploads", data, {
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
    } catch (err) {
      toast.error("خطا در آپلود تصویر");
    } finally {
      setUploadProgress(0);
    }
  };

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (gallery.length + files.length > MAX_GALLERY_IMAGES) {
      toast.error(`حداکثر ${MAX_GALLERY_IMAGES} تصویر قابل انتخاب است`);
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > MAX_FILE_SIZE) {
          toast.error(`حجم تصویر شماره ${i + 1} نباید بیشتر از 2 مگابایت باشد`);
          continue;
        }

        const data = new FormData();
        data.append("file", file);

        const res = await ApiConfig.post("https://takbon.biz:3402/uploads", data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (pe) => {
            const prog = Math.round((pe.loaded * 100) / pe.total);
            setUploadProgress(prog);
          },
        });

        const fileName = res.data.key || res.data.filename || res.data.fileName;
        const imagePath = `images/${fileName}`;

        setGallery((prev) => [...prev, imagePath]);
        toast.success(`تصویر ${i + 1} با موفقیت آپلود شد`);
      }
    } catch {
      toast.error("خطا در آپلود تصاویر گالری");
    } finally {
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const preparedData = {};
      cart.forEach(({ value }) => {
        preparedData[value] = formData[value] || "";
      });

      if (image) preparedData["image"] = image;
      if (gallery.length > 0) preparedData["gallery"] = gallery;

      await ApiConfig.post(`https://takbon.biz:3402/${apiUrl}`, preparedData);

      toast.success("با موفقیت اضافه شد!");
      onClose();
      onSuccess();
      setFormData({});
      setImage(null);
      setGallery([]);
    } catch {
      toast.error("خطا در ارسال اطلاعات");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-bold mb-4">افزودن مورد جدید</Dialog.Title>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {cart.map(({ value, header }) => (
              <div key={value} className="flex flex-col">
                <label className="text-sm font-semibold">{header}</label>
                {value === "publish" ? (
                  <DatePickerInput
                    value={formData[value] || ""}
                    onChange={(val) => handleChange(value, val)}
                    label={header}
                  />
                ) : value === "image" ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border rounded p-2"
                    />
                    {image && (
                      <img
                        src={`https://takbon.biz:3402/${image}`}
                        alt="پیش نمایش"
                        className="w-32 h-32 object-cover rounded mt-2 border"
                      />
                    )}
                  </>
                ) : value === "gallery" ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      className="border rounded p-2"
                    />
                    {gallery.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {gallery.map((imgPath, idx) => (
                          <img
                            key={idx}
                            src={`https://takbon.biz:3402/${imgPath}`}
                            alt={`گالری ${idx + 1}`}
                            className="w-24 h-24 object-cover rounded border"
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    value={formData[value] || ""}
                    onChange={(e) => handleChange(value, e.target.value)}
                    className="border rounded p-2"
                    placeholder={`وارد کردن ${header}`}
                  />
                )}
              </div>
            ))}

            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                انصراف
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                ثبت
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
