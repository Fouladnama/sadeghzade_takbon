"use client";

import React, { useEffect, useState } from "react";
import ApiConfig from "../../../Api";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
  const [openForm, setOpenForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
    fetchNews();
  }, []);

  const fetchNews = () => {
    ApiConfig.get("https://takbon.biz:3402/news?page=1&size=6")
      .then((res) => {
        setNewsData(res.data.value);
      })
      .catch(() => toast.error("خطا در دریافت اخبار"));
  };

  const handleAddClick = () => {
    setEditingNews(null);
    setTitle("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
    setOpenForm(true);
  };

  const handleEditClick = (news) => {
    setEditingNews(news);
    setTitle(news.keyword);
    setContent(news.technical);
    setImagePreview(`https://takbon.biz/${news.image}`);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    ApiConfig.get(`https://takbon.biz:3402/removenews?id=${id}`)
      .then(() => {
        toast.success("خبر با موفقیت حذف شد");
        fetchNews();
      })
      .catch(() => toast.error("خطا در حذف خبر"));
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("لطفا عنوان و محتوا را وارد کنید");
      return;
=======
    setIsClient(true); 
  }, []);

  useEffect(() => {
    if (isClient) {
      axios
        .get("https://takbon.biz:3402/news?page=1&size=3")
        .then((response) => {
          const validatedData = response.data.value.map((news) => ({
            ...news,
            content: news.content || "",
          }));
          setNewsData(validatedData);
        })
        .catch((error) => {
          console.error("Error fetching news data:", error);
        });
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4
    }

    try {
      let imageUrl = editingNews?.image || "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await ApiConfig.post(
          "https://takbon.biz:3402/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        imageUrl = uploadRes.data.path;
      }

      const dataToSend = {
        id: editingNews ? editingNews.id : undefined,
        keyword: title,
        technical: content,
        image: imageUrl,
        which: new Date().toISOString(),
      };

      await ApiConfig.post("https://takbon.biz:3402/addnews", dataToSend);

      toast.success(editingNews ? "خبر ویرایش شد" : "خبر اضافه شد");
      setOpenForm(false);
      fetchNews();
    } catch (err) {
      console.error(err);
      toast.error("خطا در ذخیره خبر");
    }
  };

  return (
    <Box sx={{ background: "#F6F0FA", p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      <Toaster />
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: "bold", color: "#9B72AA" }}
      >
        مدیریت اخبار
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#B497BD",
            borderRadius: "50px",
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            ":hover": { backgroundColor: "#9B72AA" },
          }}
          onClick={handleAddClick}
        >
          افزودن خبر جدید
        </Button>
      </Box>

      <Grid container spacing={3}>
        {newsData.length > 0 ? (
          newsData.map((news) => (
            <Grid item xs={12} md={6} lg={4} key={news.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                  boxShadow: "0 8px 24px rgba(155, 114, 170, 0.15)",
                  ":hover": { transform: "translateY(-6px)" },
                  backgroundColor: "#FFFFFF",
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://takbon.biz/${news.image}`}
                  alt={news.keyword}
                  sx={{ height: 200, objectFit: "cover" }}
                />
                <Box p={2} flex={1} display="flex" flexDirection="column">
                  <Typography variant="h6" sx={{ mb: 1, color: "#6D4C90" }}>
                    {news.keyword}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#7E669A", flexGrow: 1 }}
                  >
                    {news.technical?.slice(0, 100)}...
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{
                        borderColor: "#B497BD",
                        color: "#9B72AA",
                        ":hover": { backgroundColor: "#F3EAF7" },
                      }}
                      onClick={() => handleEditClick(news)}
                    >
<<<<<<< HEAD
                      ویرایش
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      sx={{
                        borderColor: "#D199A0",
                        color: "#D47F8D",
                        ":hover": { backgroundColor: "#FDE7EA" },
                      }}
                      onClick={() => handleDelete(news.id)}
                    >
                      حذف
                    </Button>
                  </Box>
                </Box>
=======
                      <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        {news.keyword}
                      </Typography>
                      <Typography variant="body1">
                    {news.technical}
                      </Typography>

                      <Typography variant="body2" sx={{ marginTop: 2, color: '#777' }}>
                        تاریخ انتشار: {news.which}
                      </Typography>
                      <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
                        <Button onClick={() => handleEditNews(news)}>
                          <img 
              src="/Assests/Admin/News/edite.jpg" 
              alt="ویرایش خبر" 
                            style={{
                              width: '40px',
                              height: '40px', 
                              cursor: 'pointer'
                            }}
                          />
                        </Button>
                        <Button onClick={() => handleDeleteNews(news.id)}>
                          <img 
                            src="/Assests/Admin/News/delete.jpg" 
                            alt="حذف خبر" 
                            style={{
                              width: '40px',
                              height: '40px', 
                              cursor: 'pointer'
                            }}
                          />
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
>>>>>>> bfa75f18a76a2c84977a6fc26ae546e4c735d6a4
              </Card>
            </Grid>
          ))
        ) : (
          <Typography align="center" color="#7E669A">خبری یافت نشد.</Typography>
        )}
      </Grid>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: "#9B72AA", fontWeight: "bold" }}>
          {editingNews ? "ویرایش خبر" : "افزودن خبر جدید"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="عنوان خبر"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography sx={{ mt: 2, mb: 1 }}>متن خبر:</Typography>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ background: "#fff" }}
          />
          <Button
            component="label"
            variant="outlined"
            sx={{
              mt: 2,
              borderColor: "#B497BD",
              color: "#9B72AA",
              ":hover": { backgroundColor: "#F3EAF7" },
            }}
          >
            آپلود تصویر
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Button>
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="پیش‌نمایش"
                style={{ maxWidth: "100%", borderRadius: "12px" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} sx={{ color: "#D47F8D" }}>
            انصراف
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#B497BD",
              ":hover": { backgroundColor: "#9B72AA" },
            }}
          >
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
