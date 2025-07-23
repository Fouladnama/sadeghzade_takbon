"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import "react-multi-date-picker/styles/colors/teal.css";

export default function DatePickerInput({ value, onChange, label }) {
    const [selectedDate, setSelectedDate] = useState(null);

    function toEnglishDigits(str) {
        return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    }

    useEffect(() => {
        if (value) {
            const parts = value.split("/");
            if (parts.length === 3) {
                setSelectedDate(`${parts[0]}/${parts[1].padStart(2, "0")}/${parts[2].padStart(2, "0")}`);
            }
        }
    }, [value]);

const handleChange = (date) => {
    setSelectedDate(date);
    if (!date) {
      onChange("");
      return;
    }
    const formatted = `${date.year}/${String(date.month).padStart(2, "0")}/${String(date.day).padStart(2, "0")}`;
    onChange(formatted);
};

    return (
        <div className="flex flex-col gap-1 text-right">
            {/* {label && <label className="text-sm text-gray-700">{label}</label>}
            <div className="text-sm text-gray-600">
                {selectedDate ? `تاریخ انتخاب شده: ${selectedDate.format ? selectedDate.format("yyyy/MM/dd") : selectedDate}` : "تاریخی انتخاب نشده است"}
            </div> */}
            <DatePicker
                value={selectedDate}
                onChange={handleChange}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                className="teal"
                placeholder="انتخاب تاریخ"
                editable={false}
            />
        </div>
    );
}
