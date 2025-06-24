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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const AddComponent = ({ url, columns, onClose, onAdd, data }) => {
  const [formValues, setFormValues] = useState({});
  const [imageFiles, setImageFiles] = useState({}); // نگهداری فایل ها برای هر فیلد
  const [uploadProgress, setUploadProgress] = useState({}); // نگهداری پیشرفت آپلود برای هر فیلد

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (field, e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) => ({ ...prev, [field]: file }));
      try {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await axios.post(
          "https://takbon.biz:3402/uploads",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress((prev) => ({ ...prev, [field]: progress }));
            },
          }
        );

        setFormValues((prev) => ({
          ...prev,
          [field]: uploadRes.data.key,
        }));

        setUploadProgress((prev) => ({ ...prev, [field]: 0 })); // ریست کردن مقدار پیشرفت
      } catch (err) {
        console.error("خطا در آپلود تصویر:", err);
        if (err.response) {
          alert(`خطا در آپلود تصویر: ${err.response.data.message || "خطای نامشخص"}`);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(url, formValues);
      if (res.data) {
        ToastContainer.success("با موفقیت ذخیره شد");
        onAdd(); // فقط onAdd را فراخوانی کنید
      }
    } catch (err) {
      console.error("خطا در ارسال داده:", err);
    }
  };

  const isAnyImageUploaded = !!formValues.image || !!formValues.imagemain; // چک کردن آپلود شدن تصاویر

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>افزودن آیتم جدید</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            {columns.map((col) => {
              if (col.field === "image" || col.field === "imagemain") {
                return (
                  <div key={col.field}>
                    <Input
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      onChange={(e) => handleImageChange(col.field, e)}
                      fullWidth
                    />
                    {uploadProgress[col.field] > 0 &&
                      uploadProgress[col.field] < 100 && (
                        <div>پیشرفت آپلود: {uploadProgress[col.field]}%</div>
                      )}
                    {imageFiles[col.field] && (
                      <>
                        <img
                          src={URL.createObjectURL(imageFiles[col.field])}
                          alt="Preview"
                          style={{
                            width: "100px",
                            marginTop: "10px",
                          }}
                        />
                        {formValues[col.field] && (
                          <div style={{ color: "green" }}>
                            تصویر با موفقیت آپلود شد: {formValues[col.field]}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              } else if (col.options && Array.isArray(col.options)) {
                return (
                  <FormControl key={col.field} fullWidth>
                    <InputLabel>{col.header}</InputLabel>
                    <Select
                      value={formValues[col.field] || ""}
                      onChange={(e) => handleChange(col.field, e.target.value)}
                    >
                      {col.options.map((opt) => (
                        <MenuItem key={opt.code} value={opt.code}>
                          {opt.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              } else {
                return (
                  <TextField
                    key={col.field}
                    label={col.header}
                    value={formValues[col.field] || ""}
                    onChange={(e) => handleChange(col.field, e.target.value)}
                    fullWidth
                  />
                );
              }
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            لغو
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isAnyImageUploaded} // غیرفعال کردن دکمه تا زمانی که تصویر آپلود شود
          >
            ذخیره
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddComponent;
