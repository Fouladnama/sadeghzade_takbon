"use client";
import React, { useState, useEffect } from "react";
import ApiConfig from "../../../Api";
import Swal from "sweetalert2";
import moment from "jalali-moment";

export default function CollaborationAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seenIds, setSeenIds] = useState([]); // برای ذخیره id کارت‌های دیده شده

  const handleSeen = (id) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این درخواست به عنوان دیده شده ثبت می‌شود.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        setSeenIds((prev) => [...prev, id]);
        Swal.fire("ثبت شد!", "این درخواست به عنوان دیده شده علامت‌گذاری شد.", "success");
      }
    });
  };

  useEffect(() => {
    ApiConfig.get("https://takbon.biz:3402/get_cv")
      .then((res) => {
        console.log("دریافتی: ", res.data);
        setNews(res.data.value);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در دریافت:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-blue-600">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {news.map((item) => {
          const isSeen = seenIds.includes(item._id);
            const shamsiDate = moment(item.created_at).locale('fa').format('YYYY/MM/DD HH:mm');

          return (
            <div
              key={item._id}
              className={`border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col ${
                isSeen ? "bg-green-100 opacity-80" : "bg-white"
              }`}
            >
              {isSeen && (
                <div className="text-green-700 font-bold text-sm mb-2">✅ دیده شده</div>
              )}
              <h2 className="font-semibold text-lg mb-2">🕒 {shamsiDate}</h2>
              <h2 className="font-semibold text-lg mb-2">{item.name} {item.family}</h2>
              <p className="text-sm text-gray-600 mb-1">📞 {item.phonenumber}</p>
              <p className="text-sm text-gray-600 mb-1">🎓رشته تحصیلی {item.field}</p>
              <p className="text-sm text-gray-600 mb-1">🔖 وضعیت: {item.military_status}</p>
              <p className="text-sm text-gray-600 mb-1">📚 مقطع: {item.Educational_status}</p>
              <p className="text-sm text-gray-600 mb-1">🏫 دانشگاه: {item.university}</p>
              <p className="text-sm text-gray-600 mb-1">💼 علاقه: {item.favorits}</p>
              <p className="text-sm text-gray-600 mb-1">🚻 جنسیت: {item.sex}</p>
              <p className="text-sm text-gray-600 mb-1">💍 تاهل: {item.marital_status}</p>
              <p className="text-sm text-gray-600 mb-1">🎂 تولد: {item.birtday}</p>
              <p className="text-sm text-gray-600 mb-1">📍 آدرس: {item.address}</p>
              {item.upload_file && (
                <a
                  href={`https://takbon.biz/cvdownloads/${item.upload_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mt-1"
                >
                  دانلود فایل رزومه
                </a>
              )}

              {!isSeen && (
                <button
                  onClick={() => handleSeen(item._id)}
                  className="mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm"
                >
                  دیده شد
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
