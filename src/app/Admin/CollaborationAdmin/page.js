"use client";
import React, { useState, useEffect } from "react";
import ApiConfig from "../../../Api";
import Swal from "sweetalert2";
import moment from "jalali-moment";
import ResumeHeader from './ResumeHeader';

export default function CollaborationAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, title: 'دریافت شده' },
    { id: 2, title: 'دیده شده' },
    { id: 4, title: 'تایید شده' },
    { id: 3, title: 'رد شده' },
  ];

  useEffect(() => {
    ApiConfig.get("https://takbon.biz:3402/get_cv")
      .then((res) => {
        const dataWithSeen = res.data.value.map(item => ({
          ...item,
          seen: !!item.seen,
          state: item.state || 1,
        }));
        setNews(dataWithSeen);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در دریافت:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) setActiveTab(Number(savedTab));
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const filteredNews = news.filter(item => {
    if(activeTab === 1) return true;
    return item.state === activeTab;
  });



  if (loading) {
    return <div className="text-center mt-20 text-blue-600 text-lg font-semibold animate-pulse">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ResumeHeader tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredNews.map(item => {
          const shamsiDate = moment(item.created_at).locale('fa').format('YYYY/MM/DD HH:mm');

          return (
            <div
              key={item._id}
              className={`border rounded-xl p-5 shadow-md transition transform hover:scale-105 hover:shadow-xl flex flex-col bg-gradient-to-r ${
                item.seen ? "from-green-50 to-green-100" : "from-white to-gray-50"
              }`}
            >
           {/* {item.seen && (
  <div className="flex items-center gap-2 bg-green-100 text-green-800 font-semibold text-sm px-3 py-1 rounded-full shadow-sm w-max">
    <span className="inline-flex items-center justify-center w-5 h-5 bg-green-200 text-green-700 rounded-full">✅</span>
    دیده شده
  </div>
)} */}


             <h2 className="flex items-center gap-2 text-gray-800 font-bold text-lg mb-2">
  <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-600 rounded-full">
    🕒
  </span>
  <span className="tracking-wide">{shamsiDate}</span>
</h2>

              <h2 className="font-semibold text-xl mb-2 text-gray-900">{item.name} {item.family}</h2>

             <div className="flex flex-col gap-2 text-gray-700 text-sm">
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">📞</span>
    {item.phonenumber}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">🎓</span>
    رشته تحصیلی: {item.field}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full">🔖</span>
    وضعیت: {item.military_status}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-600 rounded-full">📚</span>
    مقطع: {item.Educational_status}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full">🏫</span>
    دانشگاه: {item.university}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">💼</span>
    علاقه: {item.favorits}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full">🚻</span>
    جنسیت: {item.sex}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-red-100 text-red-600 rounded-full">💍</span>
    تاهل: {item.marital_status}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full">🎂</span>
    تولد: {item.birtday}
  </p>
  <p className="flex items-center gap-2">
    <span className="w-5 h-5 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full">📍</span>
    آدرس: {item.address}
  </p>
</div>
<div className="flex items-center gap-3 mt-4">
  <span className="text-gray-700 text-sm font-semibold">وضعیت بررسی</span>
  
  <select
    value={item.state}
    disabled={item.state !== 2}  // ⬅️ اینجا اضافه شد: فقط وقتی دانلود شده (state=2) فعال میشه
    onChange={async (e) => {
      const newStateId = parseInt(e.target.value);
      setNews(prevNews =>
        prevNews.map(n => n._id === item._id ? { ...n, state: newStateId } : n)
      );
      try {
        await ApiConfig.post("https://takbon.biz:3402/get_cv", {
          ...item,
          state: newStateId,
        });
        Swal.fire("موفقیت‌آمیز", "وضعیت رزومه تغییر کرد.", "success");
      } catch (err) {
        Swal.fire("خطا", "خطا در تغییر وضعیت رزومه.", "error");
        setNews(prevNews =>
          prevNews.map(n => n._id === item._id ? { ...n, state: item.state } : n)
        );
      }
    }}
    className={`border border-gray-300 rounded-lg px-3 py-1 text-sm font-medium bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 
      ${item.state !== 2 ? "opacity-50 cursor-not-allowed" : ""}`} // ظاهر غیر فعال
  >
    <option value={1} disabled className="text-gray-400">
      دریافت شده
    </option>
    <option value={4} className="text-green-600 font-medium">تایید شده ✅</option>
    <option value={3} className="text-red-600 font-medium">رد شده ❌</option>
  </select>
</div>

{item.upload_file && (
  <a
    href={`https://takbon.biz/cvdownloads/${item.upload_file}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline text-sm mt-1"
    onClick={async (e) => {
      e.stopPropagation();

      // اگر هنوز دیده نشده
      if (!item.seen || item.state !== 2) {
        try {
          // آپدیت استیت محلی
          setNews(prevNews =>
            prevNews.map(n =>
              n._id === item._id ? { ...n, seen: true, state: 2 } : n
            )
          );

          // ارسال درخواست به بک‌اند برای تغییر state به 2
          await ApiConfig.post("https://takbon.biz:3402/get_cv", {
            ...item,
            state: 2,
          });

          console.log("رزومه به عنوان دیده‌شده ثبت شد");
        } catch (err) {
          console.error("خطا در تغییر وضعیت رزومه:", err);
        }
      }
    }}
  >
    دانلود فایل رزومه
  </a>
)}

             
            </div>
          );
        })}
      </div>
    </div>
  );
}
