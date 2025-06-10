"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Input,
} from "@mui/material";
import axios from "axios";

const AddComponent = ({ url, columns, onClose, onAdd }) => {
  const [formValues, setFormValues] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let uploadedFileName = "";

    // مرحله اول: اگر فایل انتخاب شده، فقط خودش رو با key مشخص آپلود کن
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile); // اگر می‌خوای صدا باشه می‌تونی بنویسی: formData.append("sound", imageFile)

      const uploadResponse = await axios.post("https://takbon.biz:3402/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      uploadedFileName = uploadResponse.data.filename || uploadResponse.data;
    }

    // مرحله دوم: ارسال فقط مقدار نام فایل (مثلاً تصویر یا صدا) همراه با سایر داده‌ها
    const finalData = {
      ...formValues,
      image: uploadedFileName, // فقط filename رو به عنوان مقدار image بفرست
    };

    // ارسال داده‌ها به API اصلی
    const res = await axios.post(url, finalData);

    if (res.data) {
      onAdd(res.data);
      onClose();
    }
  } catch (err) {
    console.error("خطا در افزودن:", err);
  }
};


  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>افزودن آیتم جدید</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            {columns.map((col) => (
              col.field === "image" ? (
                <Input
                  key={col.field}
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleImageChange}
                  fullWidth
                />
              ) : (
                <TextField
                  key={col.field}
                  label={col.header}
                  value={formValues[col.field] || ""}
                  onChange={(e) => handleChange(col.field, e.target.value)}
                  fullWidth
                />
              )
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">لغو</Button>
          <Button type="submit" variant="contained" color="primary">ذخیره</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddComponent;
