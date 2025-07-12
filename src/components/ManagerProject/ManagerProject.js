"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddComponent from "./AddComponent";
import {
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
import Image from 'next/image';

const ManagerProject = ({ url, columns, title }) => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchData = useCallback(() => {
    axios.get(url)
      .then(res => {
        if (res.data && Array.isArray(res.data.value)) {
          setData(res.data.value);
        } else {
          console.error("فرمت دیتا معتبر نیست:", res.data);
          toast.error("فرمت داده دریافتی معتبر نیست");
        }
      })
      .catch(err => {
        console.error("خطا در دریافت API:", err);
        toast.error("خطا در دریافت داده از سرور");
      });
}, [url]);

useEffect(() => {
    fetchData();
}, [fetchData]);

  const handleEditClick = (id, row) => {
    setEditingId(id);
    setEditValues({ ...row });
    setUploadProgress(0);
    setEditModalOpen(true);
};

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({});
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
        setEditingId(null);
        setEditValues({});
        toast.success("اطلاعات با موفقیت ویرایش شد");
      }
    } catch (err) {
      console.error("خطا در ویرایش:", err);
      toast.error("خطا در ویرایش اطلاعات");
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
          <Image 
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
 




return (
  <>
    <Box p={3}>
      <ToastContainer rtl position="bottom-left" />
      <Typography variant="h5" mb={2}>{title}</Typography>
      <Button variant="contained" onClick={() => setShowAddForm(true)}>+ افزودن</Button>
      {showAddForm && (
        <AddComponent
          url={url}
          columns={columns}
          onClose={() => setShowAddForm(false)}
          onAdd={fetchData}
              open={showAddForm}  

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
                    <Image 
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
            <Image 
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
        <Image ش
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
