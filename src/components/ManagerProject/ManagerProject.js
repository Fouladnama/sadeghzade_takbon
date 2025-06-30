"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddComponent from "./AddComponent";
import {
<<<<<<< HEAD
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Input,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox, Dialog, DialogTitle, DialogContent, DialogActions ,Popover  
} from "@mui/material";
import { Edit, Delete, Save, Close } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
=======
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
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4

const ManagerProject = ({ url, columns, title }) => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
<<<<<<< HEAD
const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchData = () => {
    axios.get(url)
      .then(res => {
=======
  const [formValues, setFormValues] = useState({});

  const fetchData = () => {
    axios.get(url)
      .then((res) => {
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4
        if (res.data && Array.isArray(res.data.value)) {
          setData(res.data.value);
        } else {
          console.error("فرمت دیتا معتبر نیست:", res.data);
          toast.error("فرمت داده دریافتی معتبر نیست");
        }
      })
<<<<<<< HEAD
      .catch(err => {
=======
      .catch((err) => {
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4
        console.error("خطا در دریافت API:", err);
        toast.error("خطا در دریافت داده از سرور");
      });
  };

  const handleEditClick = (id, row) => {
    setEditingId(id);
<<<<<<< HEAD
    setEditValues({ ...row });
    setUploadProgress(0);
    setEditModalOpen(true);
};
=======
    setEditValues({...row});
  };
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({});
<<<<<<< HEAD
    setUploadProgress(0);
    toast.info("ویرایش لغو شد");
  };
  const handleInputChange = (field, value) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };
  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await axios.post(
        'https://takbon.biz:3402/uploads',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: progressEvent => {
            const prog = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(prog);
          }
        }
      );
      toast.success("تصویر با موفقیت آپلود شد");
      setEditValues(prev => ({
        ...prev,
        [field]: uploadRes.data.key
      }));
    } catch (err) {
      console.error("خطا در آپلود تصویر:", err);
      toast.error("خطا در آپلود تصویر");
    }
  };

  const handleSave = async id => {
    try {
      const res = await axios.post(url, editValues, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.data) {
        setData(prev =>
          prev.map(item => (item._id === id ? { ...item, ...editValues } : item))
        );
=======
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
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4
        setEditingId(null);
        setEditValues({});
        toast.success("اطلاعات با موفقیت ویرایش شد");
      }
    } catch (err) {
      console.error("خطا در ویرایش:", err);
      toast.error("خطا در ویرایش اطلاعات");
<<<<<<< HEAD
    }
  };

const handleDelete = id => {
    Swal.fire({
        title: 'آیا مطمئن هستید؟',
        text: "این عملیات قابل بازگشت نیست!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'بله، حذف کن!',
        cancelButtonText: 'لغو'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${url}/?id=${id}`)
                .then(() => {
                    setData(prev => prev.filter(item => item._id !== id));
                    Swal.fire({
                        icon: 'success',
                        title: 'حذف شد!',
                        text: 'آیتم با موفقیت حذف شد.',
                        confirmButtonText: 'باشه'
                    });
                })
                .catch(err => {
                    console.error("خطا در حذف:", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: 'خطا در حذف آیتم',
                        confirmButtonText: 'باشه'
                    });
                });
        }
    });
};

  const renderFieldValue = (col, row) => {
    if (col.field === "image" ) {
      if (row[col.field]) {
        const src = `https://takbon.biz/images/${row[col.field]}`;
        return (
          <img
            src={src}
            alt={col.field}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              objectFit: "cover",
              cursor: "pointer"
            }}
            onDoubleClick={() => window.open(src, '_blank')}
          />
        );
      }
      return <Typography variant="body2" color="text.secondary">بدون تصویر</Typography>;
    }
    return col.render ? col.render(row) : row[col.field];
  };
 
=======
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
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4

  useEffect(() => {
    fetchData();
  }, []);

<<<<<<< HEAD

return (
  <>
    <Box p={3}>
      <ToastContainer rtl position="bottom-left" />
      <Typography variant="h5" mb={2}>{title}</Typography>
      <Button variant="contained" onClick={() => setShowAddForm(true)}>+ افزودن</Button>
=======
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
      
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4
      {showAddForm && (
        <AddComponent
          url={url}
          columns={columns}
          onClose={() => setShowAddForm(false)}
<<<<<<< HEAD
          onAdd={fetchData}
              open={showAddForm}  // این خط اضافه شود

        />
      )}

      <Stack spacing={2} mt={2}>
        {data.map(row => (
          <Paper key={row._id} sx={{ p: 2, border: editingId === row._id ? '2px solid #1976d2' : '1px solid #ddd' }}>
            {columns.map(col => (
              <Box key={col.field} mb={1}>
                <Typography fontSize={14} fontWeight={600}>{col.header}:</Typography>
                <Typography variant="body2" color="text.secondary">
                  {renderFieldValue(col, row)}
                </Typography>
              </Box>
            ))}
            <Stack direction="row" spacing={1} mt={1}>
              <Button variant="outlined" color="warning" onClick={() => handleEditClick(row._id, row)} startIcon={<Edit />}>ویرایش</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(row._id)} startIcon={<Delete />}>حذف</Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>

    {/* ✅ Modal ویرایش */}
    <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>ویرایش </DialogTitle>
      <DialogContent dividers>
        {columns.map(col => (
          <Box key={col.field} mb={2}>
            <Typography fontSize={14} fontWeight={600}>{col.header}:</Typography>
            {col.field === "image" ? (
              <>
                <Input
                  type="file"
                  fullWidth
                  inputProps={{ accept: "image/*" }}
                  onChange={e => handleImageUpload(e, col.field)}
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <Typography mt={1}>آپلود: {uploadProgress}%</Typography>
                )}
                {editValues[col.field] && (
                  <Box mt={1}>
                    <img
                      src={`https://takbon.biz/images/${editValues[col.field]}`}
                      alt="preview"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 8
                      }}
                    />
                  </Box>
                )}
              </>
            ) : col.field === "target" || col.field === "target_en" ? (
              <Box>
                {(editValues[col.field] && editValues[col.field].length > 0) ? editValues[col.field].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      value={item}
                      size="small"
                      fullWidth
                      multiline
                      minRows={item.length > 200 ? 5 : 3}
                      maxRows={10}
                      onChange={e => {
                        const updated = [...editValues[col.field]];
                        updated[idx] = e.target.value;
                        handleInputChange(col.field, updated);
                      }}
                    />
                    <Button
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                      onClick={() => {
                        const arr = [...editValues[col.field]];
                        arr.splice(idx, 1);
                        handleInputChange(col.field, arr);
                      }}
                    >✕</Button>
                  </Box>
                )) : <Typography color="text.secondary" variant="caption">هیچ موردی ثبت نشده است</Typography>}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleInputChange(col.field, [...(editValues[col.field] || []), ""])}
                >افزودن مورد جدید</Button>
              </Box>
            ) : col.field === "imagemain" ? (
         <FormControl fullWidth>
  <Select
    multiple
    value={Array.isArray(editValues[col.field]) ? editValues[col.field] : []}
    onChange={e => handleInputChange(col.field, e.target.value)}
    renderValue={(selected) => (
      <Box sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'nowrap', // ❌ جلوگیری از رفتن به خط بعد
        overflowX: 'auto', // اگر بیشتر از عرض بود اسکرول افقی شود
        p: 0.5
      }}>
        {selected.map(value => {
          const opt = col.options.find(o => o.code === value);
          if (!opt) return null;
          return (
            <img
              key={value}
              src={`https://takbon.biz/images/${opt.name}`}
              alt={opt.name}
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid #1976d2',
                flexShrink: 0 // ✅ مانع کوچک شدن تصاویر
              }}
            />
          );
        })}
      </Box>
    )}
  >
    {col.options.map(opt => (
      <MenuItem key={opt.code} value={opt.code}>
        <Checkbox checked={editValues[col.field]?.includes(opt.code)} />
        <img
          src={`https://takbon.biz/images/${opt.name}`}
          alt={opt.name}
          style={{
            width: 40,
            height: 40,
            objectFit: 'cover',
            borderRadius: '50%',
            marginRight: 8
          }}
        />
      </MenuItem>
    ))}
  </Select>
</FormControl>

            ) : col.field === "external_id" ? (
              <FormControl fullWidth>
                <InputLabel>{col.header}</InputLabel>
                <Select
                  value={editValues[col.field] || ""}
                  label={col.header}
                  onChange={e => handleInputChange(col.field, e.target.value)}
                >
                  {col.options.map(opt => (
                    <MenuItem key={opt.code} value={opt.code}>{opt.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                multiline
                minRows={(editValues[col.field]?.length || 0) > 200 ? 5 : 3}
                maxRows={10}
                value={editValues[col.field] || ""}
                onChange={e => handleInputChange(col.field, e.target.value)}
              />
            )}
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleSave(editingId);
            setEditModalOpen(false);
          }}
          variant="contained"
          color="success"
        >ذخیره</Button>
        <Button
          onClick={() => {
            handleCancelEdit();
            setEditModalOpen(false);
          }}
          variant="outlined"
          color="secondary"
        >لغو</Button>
      </DialogActions>
    </Dialog>
  </>
);

};

export default ManagerProject;
=======
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
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4
