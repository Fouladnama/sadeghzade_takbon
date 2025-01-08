"use client";

import React, { useEffect, useState, useRef } from "react";  // اضافه کردن useRef
import axios from "axios";
import { Grid, Typography, Button, DialogActions, DialogContent, DialogTitle, Dialog, Card, CardMedia, Box } from '@mui/material';
import FarNews from "./FarNews";  
import "react-quill/dist/quill.snow.css"; // استایل پیش‌فرض
import ReactQuill from "react-quill";

const NewsAdmin = () => {
  const [newsData, setNewsData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isNewsUpdated, setIsNewsUpdated] = useState(false);
  const [openDeleteDialog,setOpenDeleteDialog]= useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [expandedNews, setExpandedNews] = useState({});
  const [imageToDisplay, setImageToDisplay] = useState(null); 
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const formRef = useRef(null);      
  useEffect(() => {
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
  }, [isNewsUpdated]);

  const handleImageDoubleClick = (imageUrl) => {
    setImageToDisplay(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false); 
    setImageToDisplay(null); 
  };

  const handleAddNews = () => {
    setIsAddingNew(true);  
    setEditingId(null);  
    setNewTitle("");
    setNewContent("");
    setNewDate("");
    setNewImage(null);  
  };

  const handleEditNews = (news) => {
    setIsAddingNew(true);
    setEditingId(news.id);
    setNewTitle(news.title);
    setNewContent(news.content);
    setNewDate(news.publish);
    setNewImage("https://takbon.biz/" + news.image);
      if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  

  const handleSaveNewNews = () => {
    const newNews = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      publish: newDate,
      image: newImage,  
    };
    setNewsData([...newsData, newNews]);
    setIsNewsUpdated(true);
    setIsAddingNew(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setNewImage(URL.createObjectURL(file));
    }
  };

  const toggleExpand = (id) => {
    setExpandedNews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  //-
  const handleDeleteNews = (newsId) => {
    setNewsToDelete(newsId);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteNews = async () => {
    try {
      await axios.get(`https://takbon.biz:3402/removenews?id=${newsToDelete}`);
      setNewsData(newsData.filter(news => news.id !== newsToDelete));
      setIsNewsUpdated(true);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const cancelDeleteNews = () => {
    setOpenDeleteDialog(false);
  };

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <>
    <Box 
      sx={{
        // border: '5px solid #008000', 
        borderRadius: '8px',
        padding: 2, 
        minHeight: '100vh',  
      }}
    >
  <Typography variant="h3" align="center" style={{ margin: '20px 0', fontWeight: 'bold', color: '#2E3B55' }}>
              
              
مدیریت اخبار  
             </Typography>
      <Button
        variant="contained"
        sx={{
          marginBottom: 3,
          padding: 0, 
          minWidth: 'auto', 
          height: 'auto', 
          display: 'flex',  
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: "transparent", 
          '&:hover': {
            backgroundColor: "transparent", 
          }
        }}
        onClick={handleAddNews} 
      >
        <img 
          src="/Assests/Admin/News/add.jpg" 
          alt="افزودن خبر جدید" 
          style={{
            width: '60px',
            height: '60px', 
            cursor: 'pointer'
          }}
        />
      </Button>
      {(isAddingNew) && (
        <FarNews 
        ref={formRef} 

          isAddingNew={isAddingNew} 
          setIsAddingNew={setIsAddingNew} 
          handleSaveNews={handleSaveNewNews} 
          newTitle={newTitle} 
          setNewTitle={setNewTitle} 
          newContent={newContent} 
          setNewContent={setNewContent} 
          newDate={newDate} 
          setNewDate={setNewDate} 
          newImageFile={newImageFile} 
          handleImageChange={handleImageChange} 
          editingNewsId={editingId} 
          newsData={newsData}
          setNewImageFile={setNewImageFile} 
        />
      )}

      <Grid container spacing={2} alignItems="center" sx={{ width: "100%" }}>
        {newsData.length > 0 ? (
          newsData.map((news) => (
            <Grid item xs={12} key={news.id}>
              <Card
                sx={{
                  height: '100%', 
                  width: '100%',
                  boxShadow: '0px 2px 8px rgba(33, 40, 52, 0.16)',
                  padding: 2,
                  borderRadius: "8px",
                  border: '1px solid #e0e0e0',
                  display: 'flex',
                  flexDirection: 'row', 
                  alignItems: 'flex-start',
                  minHeight: '250px', 
                }}
              >
                <Grid container spacing={2}>
                  {news.image && (
                    <Grid item xs={12} md={4}>
                      <CardMedia
                        component="img"
                        alt="خبر"
                        style={{ 
                          width: '100%', 
                          height: '500px', 
                          borderRadius: '8px', 
                          objectFit: 'cover',
                          cursor: 'pointer' 
                        }}
                        src={"https://takbon.biz/" + news.image}
                        onDoubleClick={() => handleImageDoubleClick("https://takbon.biz/" + news.image)}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} md={8}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'flex-start', 
                        height: '100%' 
                      }}
                    >
                      <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        {news.title}
                      </Typography>
                      <Typography variant="body1">
                        {stripHtmlTags(news.content)}
                      </Typography>

                      <Typography variant="body2" sx={{ marginTop: 2, color: '#777' }}>
                        تاریخ انتشار: {news.publish}
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
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">اخباری یافت نشد.</Typography>
        )}
      </Grid>

      <Dialog 
        open={openImageDialog} 
        onClose={handleCloseImageDialog} 
        fullWidth 
        maxWidth="xl"
      >
        <DialogTitle>تصویر خبر</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          {imageToDisplay && (
            <img 
              src={imageToDisplay} 
              alt="نمایش تصویر" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                objectFit: 'contain'
              }} 
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog} color="primary">
            بستن
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={cancelDeleteNews}
      >
        <DialogTitle>تأیید حذف</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            آیا از حذف این خبر مطمئن هستید؟
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteNews} color="primary">
            لغو
          </Button>
          <Button onClick={confirmDeleteNews} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </>
  );
};

export default NewsAdmin;
