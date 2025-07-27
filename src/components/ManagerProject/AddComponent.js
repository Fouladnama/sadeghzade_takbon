"use client";
import React, { useState, forwardRef } from "react";
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
  Typography,
  Checkbox,
  LinearProgress,
  IconButton,
  Tooltip
} from "@mui/material";
import { MdClose, MdCheckCircle, MdUploadFile } from "react-icons/md";
import ApiConfig from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MAX_FILE_SIZE_MB = 2;
const ImageUploadField = ({ col, formValues, imageFiles, uploadProgress, onImageChange, onTitleChange }) => (
  <Box mb={3}>
    <Typography variant="subtitle1" gutterBottom fontWeight="600" color="primary">
      {col.header}
    </Typography>
    <Box
      sx={{
        border: "2px dashed",
        borderColor: uploadProgress > 0 && uploadProgress < 100 ? "primary.main" : "grey.400",
        borderRadius: 2,
        p: 2,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: uploadProgress > 0 && uploadProgress < 100 ? "rgba(25, 118, 210, 0.1)" : "transparent",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.dark",
          bgcolor: "rgba(25, 118, 210, 0.15)"
        }
      }}
      onClick={() => document.getElementById(`upload-input-${col.field}`).click()}
      role="button"
      tabIndex={0}
      onKeyPress={() => document.getElementById(`upload-input-${col.field}`).click()}
    >
      <MdUploadFile size={32} color="#1976d2" />
      <Typography variant="body1" color="textSecondary">
        برای آپلود {col.header} کلیک کنید یا فایل را بکشید اینجا رها کنید
      </Typography>
      <input
        id={`upload-input-${col.field}`}
        type="file"
        accept="image/*"
        onChange={onImageChange}
        style={{ display: "none" }}
      />
    </Box>

    {uploadProgress > 0 && uploadProgress < 100 && (
      <Box mt={1}>
        <LinearProgress variant="determinate" value={uploadProgress} color="primary" />
        <Typography variant="body2" color="primary" fontWeight="600" mt={0.5}>
          پیشرفت آپلود: {uploadProgress}%
        </Typography>
      </Box>
    )}

    {imageFiles && (
      <Box mt={2} display="flex" alignItems="center" gap={2}>
       <Box
  sx={{
    border: "2px dashed",
    borderColor:
      uploadProgress > 0 && uploadProgress < 100
        ? "primary.main"
        : "grey.400",
    borderRadius: 3,
    p: 2,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 2,
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    transition: "all 0.35s ease",
    "&:hover": {
      borderColor: "primary.dark",
      background: "rgba(25,118,210,0.1)",
      boxShadow: "0 6px 24px rgba(25,118,210,0.2)",
    },
  }}
/>
        <Box flexGrow={1}>
          {formValues[col.field] && (
            <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
              کلید فایل: {formValues[col.field]}
            </Typography>
          )}
          {/* <TextField
            label="عنوان عکس"
            size="small"
            fullWidth
            margin="dense"
            value={formValues[`${col.field}Title`] || ""}
            onChange={onTitleChange}
          /> */}
        </Box>
      </Box>
    )}
  </Box>
);

const AddComponent = ({ url, columns, onClose, onAdd, open }) => {
const initialFormValues = {};
columns.forEach(col => {
  if (col.field === "imagemain" || col.field === "target" || col.field === "target_en") {
    initialFormValues[col.field] = [];
  } else {
    initialFormValues[col.field] = "";
  }
});
const [formValues, setFormValues] = useState(initialFormValues);
  const [imageFiles, setImageFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
const [expandedFields, setExpandedFields] = useState({});

  const handleChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

const handleImageChange = async (field, e) => {
  const file = e.target.files[0];
  if (!file) return;

  // بررسی حجم فایل بر اساس مگابایت
  const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    toast.error(`حجم فایل نمی‌تواند بیشتر از ${MAX_FILE_SIZE_MB} مگابایت باشد.`);
    return;  // جلوگیری از آپلود فایل بزرگ
  }

  setImageFiles(prev => ({ ...prev, [field]: file }));

  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploadProgress(p => ({ ...p, [field]: 0 }));
    const res = await ApiConfig.post("https://takbon.biz:3402/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: pe => {
        const prog = Math.round((pe.loaded * 100) / pe.total);
        setUploadProgress(p => ({ ...p, [field]: prog }));
      }
    });
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
  setIsSubmitting(true);
  try {
    await ApiConfig.post(url, formValues);
    toast.success("آیتم با موفقیت اضافه شد");
    onAdd();       // آپدیت داده‌ها
    onClose();     // بستن مودال
  } catch (err) {
    console.error(err);
    toast.error("خطا در ذخیره‌سازی آیتم");
  } finally {
    setIsSubmitting(false);
  }
};

  const isAnyImageValid = columns
    .filter(c => c.field === "image")
    .some(c => formValues[c.field] && formValues[`${c.field}Title`]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Transition}   dir="rtl">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,textAlign: "right"}} >
          افزودن آیتم جدید
          <Tooltip title="بستن">
            <IconButton onClick={onClose}>
              <MdClose size={24} />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Stack spacing={3}>
              {columns.map(col => {
                if (col.field === "image") {
                  return (
                    <ImageUploadField
                      key={col.field}
                      col={col}
                      formValues={formValues}
                      imageFiles={imageFiles[col.field]}
                      uploadProgress={uploadProgress[col.field] || 0}
                      onImageChange={e => handleImageChange(col.field, e)}
                      onTitleChange={e => handleChange(`${col.field}Title`, e.target.value)}
                    />
                  );
                }

                if (col.field === "imagemain") {
                  return (
                    <FormControl key={col.field} fullWidth>
                      <InputLabel id={`${col.field}-label`}>{col.header}</InputLabel>
                      <Select
                        labelId={`${col.field}-label`}
                        multiple
                        value={Array.isArray(formValues[col.field]) ? formValues[col.field] : []}
                        label={col.header}
                        onChange={e => handleChange(col.field, e.target.value)}
                         sx={{
    borderRadius: 3,
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(6px)",
    "& .MuiSelect-select": {
      display: "flex",
      gap: 1,
    },
  }}
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {selected.map(value => {
                              const opt = col.options.find(o => o.code === value);
                              if (!opt) return null;
                              return (
                                <Box
                                  key={value}
                                  component="img"
                                  src={`https://takbon.biz/images/${opt.name}`}
                                  alt={opt.name}
                                 sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #1976d2",
              boxShadow: "0 2px 8px rgba(25,118,210,0.3)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
                                />
                              );
                            })}
                          </Box>
                        )}
                      >
                        {col.options.map(opt => (
                          <MenuItem key={opt.code} value={opt.code}>
                            <Checkbox checked={formValues[col.field]?.includes(opt.code)} color="primary" />
                            <Box
                              component="img"
                              src={`https://takbon.biz/images/${opt.name}`}
                              alt={opt.name}
                              sx={{
                                width: 40,
                                height: 40,
                                objectFit: 'cover',
                                borderRadius: '50%',
                                mr: 1,
                                border: '1px solid #ccc',
                              }}
                            />
                            <Typography variant="body2">{opt.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }

                if (col.field === "target" || col.field === "target_en") {
                  const arr = Array.isArray(formValues[col.field]) ? formValues[col.field] : [];
                  return (
                    <Box key={col.field}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>{col.header}</Typography>
                      {arr.length > 0 ? (
                        arr.map((item, idx) => (
                          <Box
                            key={`${col.field}-${idx}`}
                            sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}
                          >
                            <Typography sx={{ width: 24, textAlign: "center", userSelect: "none" }} color="text.secondary">
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
                            <Tooltip title="حذف">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                  const copy = [...arr];
                                  copy.splice(idx, 1);
                                  handleChange(col.field, copy);
                                }}
                              >
                                <MdClose />
                              </IconButton>
                            </Tooltip>
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

                if (col.options && Array.isArray(col.options)) {
                  return (
                    <FormControl key={col.field} fullWidth>
                      <InputLabel id={`${col.field}-select-label`}>{col.header}</InputLabel>
                      <Select
                        labelId={`${col.field}-select-label`}
                        value={formValues[col.field] || ""}
                        label={col.header}
                        onChange={e => handleChange(col.field, e.target.value)}
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

                return (
                 <TextField
  key={col.field}
  label={col.header}
  fullWidth
  value={formValues[col.field] || ""}
  onChange={e => handleChange(col.field, e.target.value)}
  variant="outlined"
  size="small"
  multiline={!!expandedFields[col.field]}
  minRows={expandedFields[col.field] ? 4 : 1}
  onKeyDown={e => {
    if (e.key === "Enter" && !expandedFields[col.field]) {
      e.preventDefault();
      setExpandedFields(prev => ({ ...prev, [col.field]: true }));
    }
  }}
  sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backdropFilter: "blur(4px)",
                  background: "rgba(255,255,255,0.3)",
                  "& fieldset": { borderColor: "primary.light" },
                  "&:hover fieldset": { borderColor: "primary.main" },
                  "&.Mui-focused fieldset": { borderColor: "primary.dark" },
                },
                direction: "rtl", // راست‌چین کردن خود فیلد
                textAlign: "right",
              }}
/>

                );
              })}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
  onClick={onClose}
  startIcon={<MdClose />}
  sx={{
    px: 3,
    py: 1,
    borderRadius: 3,
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "secondary.main",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.25)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
      borderColor: "secondary.main",
      color: "secondary.dark",
    },
    "& svg": {
      transition: "transform 0.3s ease",
    },
    "&:hover svg": {
      transform: "rotate(-90deg)",
    },
  }}
>
  لغو
</Button>

 <Button
  type="submit"
  variant="contained"
  sx={{
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
    color: "#fff",
    px: 4,
    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #1565c0, #1e88e5)",
      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.6)",
    },
  }}
  // disabled={isSubmitting || !isAnyImageValid}
>
  {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
</Button>


          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddComponent;
