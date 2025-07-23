"use client";

import React from "react";
import DatePickerInput from "./DatePickerInput";

export default function EditHandler({ type, value, onChange, label }) {
  if (type === "date") {
    return (
      <div className="flex flex-col mb-2">
        <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <DatePickerInput value={value} onChange={onChange} label={label} />
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-2">
      <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {type === "text" ? (
       <textarea
  value={value}
  onChange={onChange}
  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full min-h-[50px] resize-y text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
  rows={Math.min(((typeof value === "string" ? value : "").match(/\n/g)?.length || 0) + 1, 15)}
  placeholder={`متن ${label} را وارد کنید`}
/>

      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          placeholder={`مقدار ${label} را وارد کنید`}
        />
      )}
    </div>
  );
}
