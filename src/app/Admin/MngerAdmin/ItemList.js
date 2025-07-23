"use client";

import React from "react";
import ItemCard from "./ItemCard";

export default function ItemList({ data, loading, error, cart, onDelete, onDataChange, apiUrl }) {
  
  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data.length) return <p>هیچ موردی وجود ندارد</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          cart={cart}
          onDelete={onDelete}
          onDataChange={onDataChange}
          apiUrl={apiUrl}
        />
      ))}
    </div>
  );
}
