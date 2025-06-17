"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddComponent from "./AddComponent";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Input,
  Box,
  Stack,
  FormControl,
  InputLabel,Select,MenuItem
} from "@mui/material";
import { Edit, Delete, Save, Close } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagerProject = ({ url, columns, title }) => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formValues, setFormValues] = useState({});

  const fetchData = () => {
    axios.get(url)
      .then((res) => {
        if (res.data && Array.isArray(res.data.value)) {
          setData(res.data.value);
        } else {
          console.error("فرمت دیتا معتبر نیست:", res.data);
          toast.error("فرمت داده دریافتی معتبر نیست");
        }
      })
      .catch((err) => {
        console.error("خطا در دریافت API:", err);
        toast.error("خطا در دریافت داده از سرور");
      });
  };

  const handleEditClick = (id, row) => {
    setEditingId(id);
    setEditValues({...row});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({});
    toast.info("ویرایش لغو شد");
  };

  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const uploadRes = await axios.post('https://takbon.biz:3402/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        });
        
        console.log("تصویر با موفقیت آپلود شد:", uploadRes.data);
        toast.success("تصویر با موفقیت آپلود شد");
        
        setEditValues(prev => ({
          ...prev,
          image: uploadRes.data.key
        }));
        
      } catch (err) {
        console.error("خطا در آپلود تصویر:", err);
        toast.error("خطا در آپلود تصویر");
        if (err.response) {
          console.error("پاسخ خطا:", err.response.data);
        }
      }
    }
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.post(url, editValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data) {
        setData(prev => prev.map(item => item._id === id ? {...item, ...editValues} : item));
        setEditingId(null);
        setEditValues({});
        toast.success("اطلاعات با موفقیت ویرایش شد");
      }
    } catch (err) {
      console.error("خطا در ویرایش:", err);
      toast.error("خطا در ویرایش اطلاعات");
      if (err.response) {
        console.error("پاسخ خطا:", err.response.data);
      }
    }
  };

  const handleDelete = (id) => {
    if (confirm("آیا از حذف این آیتم مطمئن هستید؟")) {
      axios.delete(`${url}/?id=${id}`)
        .then(() => {
          setData((prev) => prev.filter((item) => item._id !== id));
          toast.success("آیتم با موفقیت حذف شد");
        })
        .catch(err => {
          console.error("خطا در حذف:", err);
          toast.error("خطا در حذف آیتم");
        });
    }
  };

  const renderFieldValue = (col, row) => {
    if (col.field === "image") {
      if (row[col.field]) {
        return (
          <img
            src={`https://takbon.biz/images/${row[col.field]}`}
            alt="project"
            style={{ 
              width: "100px", 
              height: "100px",
              borderRadius: 8,
              objectFit: "cover",
              cursor: "pointer"
            }}
            onDoubleClick={() => window.open(`https://takbon.biz/images/${row[col.field]}`, '_blank')}
          />
        );
      }
      return <Typography variant="body2" color="text.secondary">تصویری وجود ندارد</Typography>;
    }
    return col.render ? col.render(row) : row[col.field];
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <Typography variant="h5" gutterBottom>{title}</Typography>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setShowAddForm(true)}
      >
        + افزودن آیتم جدید
      </Button>
      
      {showAddForm && (
        <AddComponent
          url={url}
          columns={columns}
          onClose={() => setShowAddForm(false)}
          onAdd={() => {
            setShowAddForm(false);
            fetchData();
            toast.success("آیتم جدید با موفقیت اضافه شد");
          }}
        />
      )}
      
      <Stack spacing={3}>
        {data.length > 0 ? (
          data.map((row) => (
            <Paper
              key={row._id}
              elevation={3}
              sx={{
                p: 3,
                border:
                  editingId === row._id ? "2px solid #1976d2" : "1px solid #ddd",
                borderRadius: 2,
                transition: "all 0.3s ease",
              }}
            >
              {columns.map((col) => (
                <Box key={col.field} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">{col.header}:</Typography>
                  {editingId === row._id ? (
                    col.field === "image" ? (
                      <div>
                        <Input
                          type="file"
                          inputProps={{ accept: "image/*" }}
                          onChange={handleImageUpload}
                          fullWidth
                        />
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div>پیشرفت آپلود: {uploadProgress}%</div>
                        )}
                        {editValues.image && (
                          <>
                            <img
                              src={editValues.image ? `https://takbon.biz/images/${editValues.image}` : ''}
                              alt="Preview"
                              style={{
                                width: '100px',
                                marginTop: '10px',
                                borderRadius: 8,
                                objectFit: "cover"
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {editValues.image}
                            </Typography>
                          </>
                        )}
                      </div>
                    ) : col.options && Array.isArray(col.options) ? (
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
                    ) : (
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={10}
                        value={editValues[col.field] || ""}
                        onChange={(e) => handleInputChange(col.field, e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    )
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {renderFieldValue(col, row)}
                    </Typography>
                  )}
                </Box>
              ))}

              <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                {editingId === row._id ? (
                  <>
                    <Button
                      onClick={() => handleSave(row._id)}
                      variant="contained"
                      color="success"
                      startIcon={<Save />}
                    >
                      ذخیره
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outlined"
                      color="secondary"
                      startIcon={<Close />}
                    >
                      لغو
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEditClick(row._id, row)}
                      variant="outlined"
                      startIcon={<Edit />}
                      color="warning"
                    >
                      ویرایش
                    </Button>
                    <Button
                      onClick={() => handleDelete(row._id)}
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                    >
                      حذف
                    </Button>
                  </>
                )}
              </Stack>
            </Paper>
          ))
        ) : (
          <Typography color="text.secondary">داده‌ای برای نمایش وجود ندارد.</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ManagerProject;