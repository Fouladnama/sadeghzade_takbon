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
  Box,
  Typography
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddComponent = ({ url, columns, onClose, onAdd }) => {
  const [formValues, setFormValues] = useState({});
  const [imageFiles, setImageFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const handleChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFiles(prev => ({ ...prev, [field]: file }));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://takbon.biz:3402/uploads",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: pe => {
            const prog = Math.round((pe.loaded * 100) / pe.total);
            setUploadProgress(p => ({ ...p, [field]: prog }));
          }
        }
      );
      // ذخیره‌ی کلید فایل در formValues
      handleChange(field, res.data.key);
      toast.success("تصویر با موفقیت آپلود شد");
      setUploadProgress(p => ({ ...p, [field]: 0 }));
    } catch (err) {
      console.error(err);
      toast.error("خطا در آپلود تصویر");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(url, formValues);
      toast.success("آیتم با موفقیت اضافه شد");
      onAdd();
    } catch (err) {
      console.error(err);
      toast.error("خطا در ذخیره‌سازی آیتم");
    }
  };

  const isAnyImageValid = columns
    .filter(c => c.field === "image" || c.field === "imagemain")
    .some(c => formValues[c.field] && formValues[`${c.field}Title`]);

  return (
    <>
      <ToastContainer position="bottom-left" rtl theme="colored"/>
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>افزودن آیتم جدید</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              {columns.map(col => {
                // ۱) فیلد تصویر + عنوان
                if (col.field === "image" || col.field === "imagemain") {
                  return (
                    <Box key={col.field} mb={2}>
                      <Typography variant="subtitle1" gutterBottom>
                        {col.header}
                      </Typography>
                      <Input
                        type="file"
                        inputProps={{ accept: "image/*" }}
                        fullWidth
                        onChange={e => handleImageChange(col.field, e)}
                      />
                      {/* نمایش پروگرس آپلود */}
                      {uploadProgress[col.field] > 0 &&
                       uploadProgress[col.field] < 100 && (
                        <Typography variant="body2" mt={1}>
                          پیشرفت آپلود: {uploadProgress[col.field]}%
                        </Typography>
                      )}
                      {/* پیش‌نمایش فایل آپلودشده */}
                      {imageFiles[col.field] && (
                        <Box mt={1} display="flex" alignItems="center">
                          <img
                            src={URL.createObjectURL(imageFiles[col.field])}
                            alt={formValues[`${col.field}Title`] || "preview"}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 8,
                              marginRight: 16
                            }}
                          />
                          <Box flexGrow={1}>
                            {/* نمایش کلید فایل آپلودشده */}
                            {formValues[col.field] && (
                              <Typography variant="caption" color="success.main">
                                کلید فایل: {formValues[col.field]}
                              </Typography>
                            )}
                            {/* فیلد عنوان عکس */}
                            <TextField
                              label="عنوان عکس"
                              size="small"
                              fullWidth
                              margin="dense"
                              value={formValues[`${col.field}Title`] || ""}
                              onChange={e =>
                                handleChange(
                                  `${col.field}Title`,
                                  e.target.value
                                )
                              }
                            />
                          </Box>
                        </Box>
                      )}
                    </Box>
                  );
                }

                // ۲) فیلدهای آرایه‌ای target / target_en
                if (col.field === "target" || col.field === "target_en") {
                  const arr = Array.isArray(formValues[col.field])
                    ? formValues[col.field]
                    : [];
                  return (
                    <Box key={col.field}>
                      <Typography variant="subtitle2">{col.header}</Typography>
                      {arr.length > 0 ? (
                        arr.map((item, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1
                            }}
                          >
                            <Typography
                              sx={{ width: 24, mr: 1, textAlign: "center" }}
                              color="text.secondary"
                            >
                              {idx + 1}.
                            </Typography>
                            <TextField
                              size="small"
                              fullWidth
                              value={item}
                              onChange={e => {
                                const copy = [...arr];
                                copy[idx] = e.target.value;
                                handleChange(col.field, copy);
                              }}
                            />
                            <Button
                              size="small"
                              color="error"
                              sx={{ ml: 1 }}
                              onClick={() => {
                                const copy = [...arr];
                                copy.splice(idx, 1);
                                handleChange(col.field, copy);
                              }}
                            >
                              ✕
                            </Button>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          هیچ موردی ثبت نشده
                        </Typography>
                      )}
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ mt: 1 }}
                        onClick={() => handleChange(col.field, [...arr, ""])}
                      >
                        افزودن مورد جدید
                      </Button>
                    </Box>
                  );
                }

                // ۳) فیلدهای با گزینه از پیش تعریف‌شده
                if (col.options && Array.isArray(col.options)) {
                  return (
                    <FormControl key={col.field} fullWidth>
                      <InputLabel>{col.header}</InputLabel>
                      <Select
                        value={formValues[col.field] || ""}
                        label={col.header}
                        onChange={e =>
                          handleChange(col.field, e.target.value)
                        }
                      >
                        {col.options.map(opt => (
                          <MenuItem key={opt.code} value={opt.code}>
                            {opt.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }

                // ۴) سایر فیلدهای متنی
                return (
                  <TextField
                    key={col.field}
                    label={col.header}
                    fullWidth
                    value={formValues[col.field] || ""}
                    onChange={e =>
                      handleChange(col.field, e.target.value)
                    }
                  />
                );
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
              disabled={!isAnyImageValid}
            >
              ذخیره
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddComponent;
