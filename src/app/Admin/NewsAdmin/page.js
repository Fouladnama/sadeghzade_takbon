"use client";
import React, { useState, useEffect } from "react";
import ApiConfig from "../../../Api";
import Addnews from "../../../components/MangerNews/Addnews";
import EditableCard from "../../../components/MangerNews/EditableCard";
import Swal from 'sweetalert2';
import ImageWithModal from "./ImageWithModal";
import Image from 'next/image';

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm,setShowForm]=useState(false);
  const [editnews,seteditnews]=useState(null);
  const [modalImages, setModalImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  
  const handleOpenGallery = (imagesArray, index) => {
  setModalImages(imagesArray);
  setModalStartIndex(index);
  setModalOpen(true);
 };
  useEffect(() => {
    ApiConfig.get("https://takbon.biz:3402/news")
      .then(res => {
setNews(res.data.value );
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
const handleNewsAdd = async (newAdd) => {
  setLoading(true);
  try {
    const res = await ApiConfig.get("https://takbon.biz:3402/news");
    setNews(res.data.value);
    setShowForm(false);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const handleEditAdd = async (_id, updatedItem) => {
    try {
        const response = await ApiConfig.post(`https://takbon.biz:3402/news`, updatedItem);
        const updated = response.data;

        setNews(prev =>
            prev.map(item => item._id === _id ? { ...item, ...updatedItem } : item)
        );

        seteditnews(null);
    } catch (error) {
        console.error("خطا در بروزرسانی خبر:", error);
    }
};
const handleDelete = id => {
    Swal.fire({
        title: 'آیا مطمئن هستید؟',
        text: "این عملیات قابل بازگشت نیست!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'بله، حذف کن!',
        cancelButtonText: 'لغو'
    }).then((result) => {
        if (result.isConfirmed) {
            ApiConfig.delete(`https://takbon.biz:3402/news/?id=${id}`)
                .then(() => {
                    setNews(prev => prev.filter(item => item._id !== id));
                    Swal.fire({
                        icon: 'success',
                        title: 'حذف شد!',
                        text: 'آیتم با موفقیت حذف شد.',
                        confirmButtonText: 'باشه'
                    });
                })
                .catch(err => {
                    console.error("خطا در حذف:", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: 'خطا در حذف آیتم',
                        confirmButtonText: 'باشه'
                    });
                });
        }
    });
};

if (!Array.isArray(news)) {
    return <div>داده دریافتی آرایه نیست: {JSON.stringify(news)}</div>
}
return (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-extrabold text-gray-800">مدیریت اخبار</h1>
      <button
        onClick={() => setShowForm(prev => !prev)}
        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {showForm ? "بستن فرم افزودن" : "افزودن خبر جدید"}
      </button>
      {showForm && (
        <div className="w-full max-w-3xl">
          <Addnews onTaskAdded={handleNewsAdd} />
        </div>
      )}
    </div>

    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">


{news.map(item => (
  <div
    key={item._id}
    className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
  >
    {editnews === item._id ? (
      <EditableCard
        key={item._id}
        item={item}
        onCancel={() => seteditnews(null)}
        onSave={handleEditAdd}
      />
    ) : (
      <>
        <h2 className="font-semibold mb-1">{item.title}</h2>
        <p className="text-xs text-gray-500 mb-2">{item.publish}</p>

         <img
src={encodeURI(`https://takbon.biz/${item.image}`)}
          width={500} 
                height={300} 
          alt={item.title}
          className="w-full h-40 object-cover rounded-md mb-3 cursor-pointer"
          onDoubleClick={() =>
            handleOpenGallery(
              [`https://takbon.biz/${item.image}`, ...(item.gallery || []).map(g => `https://takbon.biz/${g}`)],
              0
            )
          }
        />

        {item.gallery && item.gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {item.gallery.map((imgSrc, index) => (
              <Image 
                width={500} 
                height={300} 
                key={index}
                src={`https://takbon.biz/${imgSrc}`}
                alt={`gallery-${index}`}
                className="w-full h-20 object-cover rounded-md cursor-pointer"
                onDoubleClick={() =>
                  handleOpenGallery(
                    [`https://takbon.biz/${item.image}`, ...(item.gallery || []).map(g => `https://takbon.biz/${g}`)],
                    index + 1
                  )
                }
              />
            ))}
          </div>
        )}

        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{item.content}</p>

        <div className="mt-auto flex gap-3">
          <button
            onClick={() => seteditnews(item._id)}
            className="flex-1 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition text-sm"
          >
            ویرایش
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700 transition text-sm"
          >
            حذف
          </button>
        </div>
      </>
    )}
  </div>
))}

{modalOpen && modalImages.length > 0 && (
  <ImageWithModal
    images={modalImages}
    initialIndex={modalStartIndex}
    onClose={() => setModalOpen(false)}
  />
)}


    </div>
  </div>
);

}
