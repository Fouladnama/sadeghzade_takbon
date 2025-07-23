"use client";

import React, { useState } from "react";
import EditHandler from "./EditHandler";
import GalleryHandler from "./GalleryHandler";
import ImageUploader from "./ImageUploader";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function ItemCard({ item, cart, onDelete, onDataChange, apiUrl }) {
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [editingImageIndex, setEditingImageIndex] = useState(null);
  const [openedField, setOpenedField] = useState(null);
  const [showFull, setShowFull] = useState(false);

  const startEditing = () => {
    setEditingId(item._id);
    setEditedValues(item);
    setEditingImageIndex(null);
    setOpenedField(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedValues({});
    setEditingImageIndex(null);
    setOpenedField(null);
  };

  const saveEditing = () => {
    import("axios").then((axios) => {
      axios.default
        .post(`https://takbon.biz:3402/${apiUrl}`, editedValues)
        .then(() => {
          onDataChange();
          cancelEditing();
        })
        .catch(() => {
          alert("خطا در ذخیره‌سازی");
        });
    });
  };

  const getImageSrc = (path, useImagesPath) => {
    if (!path) return "";
    return useImagesPath
      ? `https://takbon.biz/images/${path}`
      : `https://takbon.biz/${path}`;
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2 relative">
      {editingId === item._id && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={cancelEditing}
        >
          <div
            className="bg-white max-h-[90vh] w-[90%] md:w-[600px] rounded-xl shadow-lg p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-center">ویرایش</h3>

            {cart.map(({ value, header, isImage, isGallery, ispublish, isArray, useImagesPath, render, editRender, options }) => {
              if (editRender) {
                return (
                  <div key={value} className="mb-2">
                    <label className="block font-semibold">{header}</label>
                    {editRender({
                      value: editedValues[value],
                      onChange: (val) =>
                        setEditedValues((prev) => ({ ...prev, [value]: val })),
                      options,
                    })}
                  </div>
                );
              }

              if (isGallery) {
                return (
                  <GalleryHandler
                    key={value}
                    editedValues={editedValues}
                    setEditedValues={setEditedValues}
                    field={value}
                    header={header}
                    editingImageIndex={editingImageIndex}
                    setEditingImageIndex={setEditingImageIndex}
                  />
                );
              } else if (isImage) {
                return (
                  <ImageUploader
                    key={value}
                    editedValues={editedValues}
                    setEditedValues={setEditedValues}
                    field={value}
                    header={header}
                  />
                );
              } else if (ispublish) {
                return (
                  <EditHandler
                    key={value}
                    type="date"
                    value={editedValues[value] || ""}
                    onChange={(val) =>
                      setEditedValues((prev) => ({ ...prev, [value]: val }))
                    }
                    label={header}
                  />
                );
              } else if (isArray) {
                const currentArray = Array.isArray(editedValues[value])
                  ? editedValues[value]
                  : [];

                const handleItemChange = (idx, newValue) => {
                  const updatedArray = [...currentArray];
                  updatedArray[idx] = newValue;
                  setEditedValues((prev) => ({ ...prev, [value]: updatedArray }));
                };

                const handleAddItem = () => {
                  setEditedValues((prev) => ({
                    ...prev,
                    [value]: [...currentArray, ""],
                  }));
                };

                const handleRemoveItem = (idx) => {
                  const updatedArray = currentArray.filter((_, i) => i !== idx);
                  setEditedValues((prev) => ({ ...prev, [value]: updatedArray }));
                };

                return (
                  <div key={value} className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700">{header}</label>
                    {currentArray.map((itemVal, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{idx + 1}.</span>
                        <EditHandler
                          type="text"
                          value={itemVal}
                          onChange={(e) => handleItemChange(idx, e.target.value)}
                          label=""
                        />
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-red-500 hover:text-red-700"
                          title="حذف"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddItem}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-1"
                    >
                      <FaPlus /> افزودن
                    </button>
                  </div>
                );
              } else {
                return (
                  <EditHandler
                    key={value}
                    type="text"
                    value={editedValues[value] || ""}
                    onChange={(e) =>
                      setEditedValues((prev) => ({
                        ...prev,
                        [value]: e.target.value,
                      }))
                    }
                    label={header}
                  />
                );
              }
            })}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={saveEditing}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                ذخیره
              </button>
              <button
                onClick={cancelEditing}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}

      {/* حالت نمایش */}
      {cart.map(({ value, header, isImage, isGallery, isArray, useImagesPath, render }) => {
  if (typeof render === "function") {
    return (
      <div key={value} className="text-sm text-gray-800 break-all">
        <strong>{header}:</strong>
        <div className="mt-1">{render(item)}</div>
      </div>
    );
  }

  if (isGallery || isImage) {
    return (
      <div key={value} className="text-sm text-gray-800 break-all">
        <strong>{header}:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {isGallery && item[value] && Array.isArray(item[value]) && item[value].length > 0 ? (
            item[value].map((imgSrc, idx) => (
              <img
                key={idx}
                src={getImageSrc(imgSrc, useImagesPath)}
                alt={header}
                className="w-24 h-24 object-cover rounded border"
              />
            ))
          ) : isImage && item[value] ? (
            <img
              src={getImageSrc(item[value], useImagesPath)}
              alt={header}
              className="w-24 h-24 object-cover rounded border"
            />
          ) : (
            <span className="text-gray-500">----</span>
          )}
        </div>
      </div>
    );
  }

  if (isArray) {
    return (
      <div key={value} className="text-sm text-gray-800 break-all">
        <strong>{header}:</strong>
        {item[value] && Array.isArray(item[value]) && item[value].length > 0 ? (
          <ul className="list-decimal list-inside mt-1 text-sm text-gray-700">
            {item[value].map((val, idx) => (
              <li key={idx}>{val || "----"}</li>
            ))}
          </ul>
        ) : (
          "----"
        )}
      </div>
    );
  } else {
    const text = item[value] !== undefined ? String(item[value]) : "----";
    const isLong = text.length > 250;
    const displayedText = !isLong || showFull ? text : text.slice(0, 250) + " ...";
    return (
      <div
        key={value}
        className="text-sm text-gray-800 break-all cursor-pointer"
        onClick={() => {
          if (isLong) setShowFull((prev) => !prev);
        }}
      >
        <strong>{header}:</strong> {displayedText}
        {isLong && !showFull && (
          <span className="text-blue-500 ml-1">مشاهده بیشتر</span>
        )}
      </div>
    );
  }
})}


      {/* دکمه‌ها */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={startEditing}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          ویرایش
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          حذف
        </button>
      </div>
    </div>
  );
}
