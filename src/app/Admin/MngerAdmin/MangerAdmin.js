"use client";

import React, { useEffect, useState } from "react";
import ApiConfig from "../../../Api";
import AddAdmin from "./AddAdmin";
import ItemList from "./ItemList";
import Swal from "sweetalert2";

export default function MangerAdmin({ apiUrl, cart, title }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = () => {
    if (!apiUrl) return;
    setLoading(true);
    ApiConfig
      .get(`https://takbon.biz:3402/${apiUrl}`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.value)) {
          setData(res.data.value);
          setError("");
        } else {
          setError("فرمت داده دریافتی معتبر نیست");
        }
      })
      .catch((err) => {
        setError(err.message || "خطا در دریافت داده‌ها");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        ApiConfig
          .delete(`https://takbon.biz:3402/${apiUrl}?id=${id}`)
          .then(() => {
            setData((prev) => prev.filter((item) => item._id !== id));
            Swal.fire("حذف شد!", "آیتم با موفقیت حذف شد.", "success");
          })
          .catch(() => {
            Swal.fire("خطا", "خطا در حذف آیتم", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow hover:shadow-md transition"
        >
          اضافه کردن +
        </button>
      </div>

      <AddAdmin
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cart={cart}
        apiUrl={apiUrl}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchData();
        }}
      />

      <div className="mt-4">
        <ItemList
          data={data}
          loading={loading}
          error={error}
          cart={cart}
          onDelete={handleDelete}
          onDataChange={fetchData}
          apiUrl={apiUrl}
        />
      </div>
    </div>
  );
}
