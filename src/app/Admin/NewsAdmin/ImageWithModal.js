"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import Image from 'next/image';

export default function ImageGalleryModal({ images, initialIndex = 0, onClose }) {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="relative max-w-full max-h-[90vh] flex items-center justify-center p-4">
        {/* دکمه بستن */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
        >
          <FaTimes />
        </button>

        {/* فلش قبلی */}
        <button
          onClick={handlePrev}
          className="absolute left-4 text-white text-4xl hover:text-yellow-400"
        >
          <FaArrowRight />
        </button>

        <Image 
          src={images[currentIndex]}
          alt={`gallery-${currentIndex}`}
          className="max-h-[80vh] max-w-full rounded shadow-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {/* فلش بعدی */}
        <button
          onClick={handleNext}
          className="absolute right-4 text-white text-4xl hover:text-yellow-400"
        >
          <FaArrowLeft />
        </button>
      </div>

      {/* شماره عکس */}
      <p className="absolute bottom-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
        {currentIndex + 1} از {images.length}
      </p>
    </div>
  );
}
