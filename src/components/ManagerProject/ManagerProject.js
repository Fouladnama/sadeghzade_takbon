"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddComponent from "./AddComponent";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import { Edit, Delete, Save, Close } from "@mui/icons-material";

const ManagerProject = ({ url, columns, title }) => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (res.data && Array.isArray(res.data.value)) {
          setData(res.data.value);
        } else {
          console.error("فرمت دیتا معتبر نیست:", res.data);
        }
      })
      .catch((err) => {
        console.error("خطا در دریافت API:", err);
      });
  }, [url]);

const handleEditClick = (id, row) => {
  setEditingId(id);
  const { editValues, ...cleanRow } = row;
  setEditValues(cleanRow);
};


  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

const handleSave = (id) => {
  const formData = new FormData();
  formData.append("id", id);
  
  Object.entries(editValues).forEach(([key, value]) => {
    formData.append(key, value);
  });

  axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then((res) => {
    setData(prev => prev.map(item => item._id === id ? {...item, ...editValues} : item));
    setEditingId(null);
    setEditValues({});
  })
  .catch(err => {
    console.error("خطا در ویرایش:", err);
  });
};


  const handleDelete = (id) => {
    if (confirm("آیا از حذف این آیتم مطمئن هستید؟")) {
      // مثال حذف
      axios.delete(`${url}/?id=${id}`).then(() => {
        setData((prev) => prev.filter((item) => item._id !== id));
      });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
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
    onAdd={(newItem) => setData((prev) => [...prev, newItem])}
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
    ) : col.field === "image" && row[col.field] ? (
      <img
        src={`https://takbon.biz:3402/uploads/${row[col.field]}`}
        alt="project"
        style={{ width: "100px", borderRadius: 8 }}
      />
    ) : (
      <Typography variant="body2" color="text.secondary">
        {col.render ? col.render(row) : row[col.field]}
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
