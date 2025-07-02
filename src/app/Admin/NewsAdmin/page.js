"use client";

import React, { useEffect, useState, useRef } from "react";
import ApiConfig from "../../../Api";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  TextField,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewsAdmin() {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const uploadSound = useRef(null);
  const addSound = useRef(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    ApiConfig.get("https://takbon.biz:3402/news?page=1&size=20")
      .then((res) => setNewsData(res.data.value))
      .catch(() => toast.error("خطا در دریافت اخبار"));
  };

  const handleUploadImage = async () => {
    if (!newImageFile) return "";
    if (newImageFile.size > 1024 * 1024) {
      toast.error("حجم تصویر باید کمتر از 1 مگابایت باشد");
      return "";
    }

    const formData = new FormData();
    formData.append("file", newImageFile);

    try {
      const uploadRes = await ApiConfig.post(
        "https://takbon.biz:3402/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      toast.success("تصویر با موفقیت آپلود شد");
      uploadSound.current?.play();
      return uploadRes.data.path;
    } catch (err) {
      toast.error("خطا در آپلود تصویر");
      return "";
    }
  };

  const handleSave = async () => {
    if (!title || !content) {
      toast.error("لطفا عنوان و محتوای خبر را وارد کنید");
      return;
    }

    try {
      let imageUrl = imagePreview?.replace("https://takbon.biz/", "") || "";

      if (newImageFile) {
        const uploadedPath = await handleUploadImage();
        if (!uploadedPath) return;
        imageUrl = uploadedPath;
      }

      const dataToSend = {
        id: editingRow ?? 0,
        title: title,
        content: content,
        image: imageUrl,
        which: new Date().toISOString(),
      };

      await ApiConfig.post("https://takbon.biz:3402/news", dataToSend);
      toast.success(editingRow ? "خبر با موفقیت ویرایش شد" : "خبر جدید اضافه شد");
      addSound.current?.play();
      clearForm();
      fetchNews();
    } catch (err) {
      toast.error("خطا در ذخیره خبر");
    }
  };

  const clearForm = () => {
    setEditingRow(null);
    setIsAdding(false);
    setTitle("");
    setContent("");
    setImagePreview(null);
    setNewImageFile(null);
    setUploadProgress(0);
  };

  const handleDelete = async (_id, content) => {
    if (!window.confirm(`آیا از حذف خبر "${content}" مطمئن هستید؟`)) return;
    try {
      await ApiConfig.delete(`https://takbon.biz:3402/news?id=${_id}`);
      toast.success("خبر با موفقیت حذف شد");
      fetchNews();
    } catch {
      toast.error("خطا در حذف خبر");
    }
  };

  const filteredNews = newsData.filter((news) =>
    (news?.content ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ background: "#F6F0FA", p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      <Toaster />
      <audio ref={uploadSound} src="/upload-success.mp3" preload="auto" />
      <audio ref={addSound} src="/add-success.mp3" preload="auto" />

      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: "bold", color: "#9B72AA" }}
      >
        مدیریت اخبار
      </Typography>

      <Box display="flex" justifyContent="center" mb={2} gap={1}>
        <TextField
          label="جستجوی عنوان خبر"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "250px", backgroundColor: "#fff", borderRadius: "8px" }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            clearForm();
            setIsAdding(true);
          }}
          sx={{ backgroundColor: "#B497BD", ":hover": { backgroundColor: "#9B72AA" } }}
        >
          افزودن خبر جدید
        </Button>
      </Box>

      {(isAdding || editingRow !== null) && (
        <Card sx={{ p: 2, mb: 3, borderRadius: "16px", backgroundColor: "#fff" }}>
          {imagePreview && (
            <CardMedia
              component="img"
              image={imagePreview}
              alt="پیش‌نمایش تصویر"
              sx={{ height: 200, objectFit: "cover", mb: 1 }}
            />
          )}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              color: "#9B72AA",
              borderColor: "#B497BD",
              ":hover": { backgroundColor: "#F3EAF7" },
              mb: 1,
            }}
          >
            انتخاب تصویر
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
          </Button>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <Box sx={{ width: "100%", mb: 1 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="caption" display="block" align="center">
                {uploadProgress}%
              </Typography>
            </Box>
          )}

          <TextField
            fullWidth
            label="عنوان خبر"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 1 }}
          />

          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ height: "200px", marginBottom: "10px" }}
          />

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#B497BD", ":hover": { backgroundColor: "#9B72AA" } }}
              onClick={handleSave}
            >
              {editingRow ? "ذخیره تغییرات" : "افزودن خبر"}
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#9B72AA",
                borderColor: "#B497BD",
                ":hover": { backgroundColor: "#F3EAF7" },
              }}
              onClick={clearForm}
            >
              لغو
            </Button>
          </Box>
        </Card>
      )}

      <Grid container spacing={2}>
        {filteredNews.map((news) => (
          <Grid item xs={12} sm={6} md={4} key={news.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 8px 24px rgba(155, 114, 170, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                image={`https://takbon.biz/${news.image}`}
                alt={news.title}
                sx={{ height: 200, objectFit: "cover" }}
              />
              <Box sx={{ p: 2, flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: "#6D4C90" }}>
                  {news.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#7E669A" }}
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" p={1}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setEditingRow(news.id);
                    setTitle(news.title);
                    setContent(news.content);
                    setImagePreview(`https://takbon.biz/${news.image}`);
                    setIsAdding(true);
                  }}
                  sx={{ color: "#9B72AA", borderColor: "#B497BD" }}
                  variant="outlined"
                >
                  ویرایش
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(news.id, news.title)}
                  sx={{ color: "#D47F8D", borderColor: "#D199A0" }}
                  variant="outlined"
                >
                  حذف
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
