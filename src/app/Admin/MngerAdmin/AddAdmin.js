"use client";
import { Dialog } from "@headlessui/react";
import ApiConfig from "../../../Api";
import DatePickerInput from "./DatePickerInput";
import { toast } from "react-toastify";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function AddAdmin({ isOpen, onClose, cart, apiUrl, onSuccess }) {
  const [formData, setFormData] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [equipments, setEquipments] = useState([]); 
  const [loadingEquipments, setLoadingEquipments] = useState(false);
  const [selectedEquipments, setSelectedEquipments] = useState([]); // ✅ جدید: برای مدیریت انتخاب چندگانه

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const MAX_GALLERY_IMAGES = 5;

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddArrayItem = (key) => {
    const currentArray = Array.isArray(formData[key]) ? formData[key] : [];
    handleChange(key, [...currentArray, ""]);
  };

  const handleRemoveArrayItem = (key, idx) => {
    const currentArray = Array.isArray(formData[key]) ? formData[key] : [];
    const updatedArray = currentArray.filter((_, i) => i !== idx);
    handleChange(key, updatedArray);
  };

  const handleArrayItemChange = (key, idx, newValue) => {
    const currentArray = Array.isArray(formData[key]) ? formData[key] : [];
    const updatedArray = [...currentArray];
    updatedArray[idx] = newValue;
    handleChange(key, updatedArray);
  };

  // ✅ جدید: مدیریت انتخاب تجهیزات
  const handleEquipmentSelect = (equipmentId, equipmentImage) => {
    setSelectedEquipments(prev => {
      const isSelected = prev.some(eq => eq.id === equipmentId);
      
      if (isSelected) {
        return prev.filter(eq => eq.id !== equipmentId);
      } else {
        return [...prev, { id: equipmentId, image: equipmentImage }];
      }
    });
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
      const imagePath = `${fileName}`;
      setImage(imagePath);
      toast.success("تصویر با موفقیت آپلود شد");
    } catch (err) {
      console.error(err);
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
        const imagePath = `${fileName}`;

        setGallery((prev) => [...prev, imagePath]);
        toast.success(`تصویر ${i + 1} با موفقیت آپلود شد`);
      }
    } catch (err) {
      console.error(err);
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

      // ✅ جدید: اضافه کردن تجهیزات انتخاب شده به دیتا
      if (selectedEquipments.length > 0) {
        preparedData["imagemain"] = selectedEquipments.map(eq => eq.id);
      }

      await ApiConfig.post(`https://takbon.biz:3402/${apiUrl}`, preparedData);

      toast.success("با موفقیت اضافه شد!");
      onClose();
      onSuccess();
      setSelectedEquipments([]); // ✅ پاک کردن انتخاب‌ها بعد از ثبت
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارسال اطلاعات");
    }
  };

  const fetchEquipments = async () => {
    try {
      setLoadingEquipments(true);
      const res = await ApiConfig.get("https://takbon.biz:3402/get_equipment");
      if (res.data?.result === "success") {
        setEquipments(res.data.value || []);
      }
    } catch (err) {
      console.error("خطا در دریافت تجهیزات:", err);
      toast.error("خطا در دریافت لیست تصاویر تجهیزات");
    } finally {
      setLoadingEquipments(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEquipments();
      setSelectedEquipments([]); // ✅ پاک کردن انتخاب‌ها هنگام باز شدن modal
    }
  }, [isOpen]);

  const equipmentImgUrl = (imgPath) =>
    imgPath?.startsWith("images/")
      ? `https://takbon.biz/images/${imgPath}`
      : `https://takbon.biz/images/${imgPath}`;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl border border-gray-200 max-h-[80vh] overflow-y-auto">
          <Dialog.Title className="text-lg font-semibold mb-4 text-gray-700">
            افزودن مورد جدید
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {cart.map(({ value, header, isArray }) => (
              <div key={value} className="flex flex-col">
                <label className="text-sm font-semibold">{header}</label>

                {isArray ? (
                  <div className="flex flex-col gap-2">
                    {(formData[value] || []).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm">{idx + 1}.</span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayItemChange(value, idx, e.target.value)}
                          className="border rounded p-1 flex-1 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem(value, idx)}
                          className="text-red-500"
                          title="حذف"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem(value)}
                      className="flex items-center gap-1 text-green-600 text-sm mt-1"
                    >
                      <FaPlus /> افزودن
                    </button>
                  </div>
                ) : value === "publish" ? (
                  <DatePickerInput
                    value={formData[value] || ""}
                    onChange={(val) => handleChange(value, val)}
                    label={header}
                  />
                ) : value === "imagemain" ? (
                  // ✅ جدید: انتخاب چندگانه تجهیزات
     <div>
    {loadingEquipments ? (
      <p className="text-sm text-gray-500">در حال بارگذاری...</p>
    ) : equipments.length ? (
      <>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {equipments.map((eq) => {
            const isSelected = selectedEquipments.some(se => se.id === eq._id);
            return (
              <button
                type="button"
                key={eq._id}
                onClick={() => handleEquipmentSelect(eq._id, eq.image)}
                className={`cursor-pointer border rounded p-2 flex flex-col items-center focus:outline-none ${
                  isSelected ? "border-green-500 ring-2 ring-green-200 bg-green-50" : "border-gray-300"
                }`}
                title={eq.imageTitle}
              >
                <img
                  src={equipmentImgUrl(eq.image)}
                  alt={eq.imageTitle}
                  className="w-20 h-20 object-cover rounded"
                />
                <span className="text-xs mt-1 truncate w-full text-center">{eq.imageTitle}</span>
              </button>
            );
          })}
        </div>

        {/* ✅ نمایش انتخاب‌ها و امکان حذف جداگانه */}
        {selectedEquipments.length > 0 && (
          <div className="mt-3 p-2 bg-blue-50 rounded flex flex-wrap gap-2">
            {selectedEquipments.map((eq) => (
              <div key={eq.id} className="flex items-center gap-1 bg-white p-1 rounded border">
                <img src={equipmentImgUrl(eq.image)} alt="" className="w-6 h-6 object-cover rounded" />
                <span className="text-xs">{equipments.find(e => e._id === eq.id)?.imageTitle}</span>
                <button
                  type="button"
                  onClick={() => handleEquipmentSelect(eq.id, eq.image)}
                  className="text-red-500 text-xs ml-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </>
    ) : (
      <p className="text-sm text-amber-600">آیتمی یافت نشد.</p>
    )}
  </div>
                ) : value === "image" ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border rounded p-2 text-sm"
                    />
                    {image && (
                      <img
                        src={`https://takbon.biz/images/${image}`}
                        alt="پیش‌نمایش"
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
                      className="border rounded p-2 text-sm"
                    />
                    {gallery.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {gallery.map((imgPath, idx) => (
                          <img
                            key={idx}
                            src={`https://takbon.biz/images/${imgPath}`}
                            alt={`گالری ${idx + 1}`}
                            className="w-24 h-24 object-cover rounded border"
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <textarea
                    value={formData[value] || ""}
                    onChange={(e) => handleChange(value, e.target.value)}
                    className="border rounded p-2 text-sm"
                    rows={3}
                  />
                )}
              </div>
            ))}

            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
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