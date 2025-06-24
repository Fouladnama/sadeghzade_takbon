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
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { Edit, Delete, Save, Close } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ManagerProject = ({ url, columns, title }) => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchData = () => {
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
  };

  const handleEditClick = (id, row) => {
    setEditingId(id);
    setEditValues({ ...row });
    setUploadProgress(0);
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
    if (confirm("آیا از حذف این آیتم مطمئن هستید؟")) {
      axios.delete(`${url}/?id=${id}`)
        .then(() => {
          setData(prev => prev.filter(item => item._id !== id));
          toast.success("آیتم با موفقیت حذف شد");
        })
        .catch(err => {
          console.error("خطا در حذف:", err);
          toast.error("خطا در حذف آیتم");
        });
    }
  };

  const renderFieldValue = (col, row) => {
    if (col.field === "image" || col.field === "imagemain") {
      if (row[col.field]) {
        const src = `https://takbon.biz/images/${row[col.field]}`;
        return (
          <img
            src={src}
            alt={col.field}
            style={{
              width: 100,
              height: 100,
              borderRadius: 8,
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
 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <ToastContainer
        position="bottom-left"
        rtl
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
    data.map(row => (
      <Paper
        key={row._id}
        elevation={3}
        sx={{
          p: 3,
          border: editingId === row._id 
            ? "2px solid #1976d2" 
            : "1px solid #ddd",
          borderRadius: 2
        }}
      >
        {columns.map(col => (
          <Box key={col.field} sx={{ mb: 2 }}>
            <Typography variant="subtitle2">{col.header}:</Typography>

            {editingId === row._id ? (

              (col.field === "image" || col.field === "imagemain") ? (
                <div>
                  <Input
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    fullWidth
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
                      <Typography variant="caption" color="text.secondary">
                        {editValues[col.field]}
                      </Typography>
                    </Box>
                  )}
                </div>
              ) : (
               (col.field === "target" || col.field === "target_en") ? (
  <Box>
    {(editValues[col.field] && editValues[col.field].length > 0)
      ? editValues[col.field].map((item, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ width: 24, mr: 1, textAlign: 'center' }} color="text.secondary">
              {idx + 1}.
            </Typography>
            <TextField
              value={item}
              size="small"
              fullWidth
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
        ))
      : <Typography color="text.secondary" variant="caption">هیچ موردی ثبت نشده است</Typography>
    }
    <Button
      size="small"
      variant="outlined"
      sx={{ mt: 1 }}
      onClick={() => handleInputChange(
        col.field,
        [...(editValues[col.field] || []), ""]
      )}
    >افزودن مورد جدید</Button>
  </Box>
) : (
                  col.options && Array.isArray(col.options) ? (
                    <FormControl fullWidth>
                      <InputLabel>{col.header}</InputLabel>
                      <Select
                        value={editValues[col.field] || ""}
                        label={col.header}
                        onChange={e => handleInputChange(col.field, e.target.value)}
                      >
                        {col.options.map(opt => (
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
                      onChange={e => handleInputChange(col.field, e.target.value)}
                      size="small"
                    />
                  )
                )
              )

            ) : (
              (col.field === "target" || col.field === "target_en") && Array.isArray(row[col.field]) ? (
                <Box component="ul" sx={{ pl: 3, m: 0 }}>
                  {row[col.field].length > 0 ? (
                    row[col.field].map((goal, idx) => (
                      <li key={idx}>{goal}</li>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      هیچ موردی ثبت نشده است
                    </Typography>
                  )}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {renderFieldValue(col, row)}
                </Typography>
              )
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
                color="warning"
                startIcon={<Edit />}
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
    <Typography color="text.secondary">
      داده‌ای برای نمایش وجود ندارد.
    </Typography>
  )}
</Stack>


    </Box>
  );
};

export default ManagerProject;
