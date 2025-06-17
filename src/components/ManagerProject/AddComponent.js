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
import { ToastContainer } from 'react-toastify';

const AddComponent = ({ url, columns, onClose, onAdd,data }) => {
  const [formValues, setFormValues] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
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
              setUploadProgress(progress);
            },
          }
        );

        setFormValues((prev) => ({
          ...prev,
          image: uploadRes.data.key,
        }));
      } catch (err) {
        console.error("خطا در آپلود تصویر:", err);
        if (err.response) {
          alert(`خطا در آپلود تصویر: ${err.response.data.message || 'خطای نامشخص'}`);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(url, formValues);
      if (res.data) {
        ToastContainer.success('با موفقیت ذخیره شد');
        onAdd(); // فقط onAdd را فراخوانی کنید
      }
    } catch (err) {
      console.error("خطا در ارسال داده:", err);
      // alert(err.response?.data?.message || 'خطا در ارسال داده');
    }
  };
  const isImageUploaded = !!formValues.image;

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>افزودن آیتم جدید</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            {columns.map((col) => {
              if (col.field === "image") {
                return (
                  <div key={col.field}>
                    <Input
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      onChange={handleImageChange}
                      fullWidth
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div>پیشرفت آپلود: {uploadProgress}%</div>
                    )}
                    {imageFile && (
                      <>
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Preview"
                          style={{ width: "100px", marginTop: "10px" }}
                        />
                        {isImageUploaded && (
                          <div style={{ color: "green" }}>
                            تصویر با موفقیت آپلود شد: {formValues.image}
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
            disabled={!isImageUploaded}
          >
            ذخیره
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddComponent;
