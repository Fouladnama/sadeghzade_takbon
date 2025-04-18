'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from "react";
import { TextField, Box, Card, Typography, CardMedia } from "@mui/material";
import { FcCheckmark, FcCancel } from "react-icons/fc"; 
import axios from "axios";
import "react-quill/dist/quill.snow.css"; 

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const FarNews = ({ 
  isAddingNew, 
  setIsAddingNew, 
  newTitle, 
  setNewTitle, 
  setNewsData,
  newContent, 
  setNewContent, 
  newDate, 
  setNewDate, 
  newImageFile, 
  handleImageChange, 
  editingNewsId,
  newsData,
  setNewImageFile 
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (editingNewsId) {
        const newsToEdit = newsData.find(news => news.id === editingNewsId);
        if (newsToEdit) {
          setNewTitle(newsToEdit.title);
          setNewContent(newsToEdit.content);
          setNewDate(newsToEdit.publish);
          setNewImageFile(newsToEdit.image);
        }
      } else {
        setNewTitle('');
        setNewContent('');
        setNewDate('');
        setNewImageFile(null);
      }
    }
  }, [editingNewsId, newsData, setNewTitle, setNewContent, setNewDate, setNewImageFile]);

  const handledata = async () => {
    axios
    .get("https://takbon.biz:3402/news?page=1&size=3")
    .then((response) => {
      const validatedData = response.data.value.map((news) => ({
        ...news,
        content: news.content || "",
      }));
      setNewsData(validatedData);
      setIsNewsUpdated(false); 
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);
    });
  };
  
  useEffect(() => {
    handledata();
  }, []);
  
  const handleCancel = () => {
    setIsAddingNew(false);
    setNewTitle('');
    setNewContent('');
    setNewDate('');
    setNewImageFile(null);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("https://takbon.biz:3402/uploads_images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.key; 
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSaveNewOrUpdateNews = async () => {
    let imageUrl = '';
  
    if (newImageFile && newImageFile instanceof File) {
      const uploadedImageKey = await handleImageUpload(newImageFile);
      if (uploadedImageKey) {
        imageUrl = "images/" + uploadedImageKey;
      }
    } else if (editingNewsId) {
      const newsToEdit = newsData.find(news => news.id === editingNewsId);
      if (newsToEdit) {
        imageUrl = newsToEdit.image;
      }
    }
  
    const newsDataToSend = {
      title: newTitle,
      content: newContent,
      publish: newDate,
      ...(imageUrl && { image: imageUrl }),
    };
  
    try {
      const response = editingNewsId
        ? await axios.post("https://takbon.biz:3402/updateNews", { ...newsDataToSend, id: editingNewsId })
        : await axios.post("https://takbon.biz:3402/updateNews", newsDataToSend);
  
      console.log("News saved/updated:", response.data);
      setIsAddingNew(false);
      handledata();
    } catch (error) {
      console.error("Error saving/updating news:", error);
    }
  };

  const newsToEdit = editingNewsId ? newsData.find(news => news.id === editingNewsId) : null;

  return (
    isAddingNew && (
      <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'center' }}>  
        <Card sx={{ 
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", 
          padding: 3, 
          borderRadius: "12px", 
          maxWidth: 600, 
          width: "100%",
          position: "relative"
        }}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#6b8e23' }}>
            {editingNewsId ? "ویرایش خبر" : "افزودن خبر جدید"}
          </Typography>

          {newsToEdit?.image && (
            <CardMedia
              component="img"
              alt="خبر"
              height="160"
              src={"https://takbon.biz/" + newsToEdit.image}
              sx={{ borderRadius: '8px', marginBottom: 2 }}
            />
          )}

          <TextField
            label="عنوان"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
           <TextField
            label="متن"
            fullWidth
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          
          <Box sx={{ marginBottom: 2, width: '100%' }}>
            <Typography sx={{ marginBottom: 1, color: '#6b8e23' }}>تاریخ</Typography>
            <TextField
              label="تاریخ (مثال: 1403/01/01)"
              fullWidth
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
            <label htmlFor="upload-image">
              <input
                id="upload-image"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              <Box
                component="span"
                sx={{
                  background: "#6b8e23",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 'bold'
                }}
              >
                انتخاب تصویر
              </Box>
            </label>
            {newImageFile && newImageFile instanceof File && (
              <img
                src={URL.createObjectURL(newImageFile)}
                alt="پیش‌نمایش"
                style={{ maxWidth: '100px', borderRadius: '8px' }}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
            <img 
              src="/Assests/Admin/News/save.jpg" 
              alt="ذخیره خبر" 
              style={{
                width: '40px',
                height: '40px', 
                cursor: 'pointer'
              }}
              onClick={handleSaveNewOrUpdateNews}
            /> 
            <FcCancel 
              style={{
                width: '40px',
                height: '40px',
                cursor: 'pointer'
              }}
              onClick={handleCancel}
            />
          </Box>
        </Card>
      </Box>
    )
  );
};

export default FarNews;
