'use client';

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaHome } from 'react-icons/fa'; // ایمپورت آیکون خانه از react-icons

import { Logo } from "../Admin/logo"; 
import logoGif from "../../../public/Assests/Landing/takbon.gif";

const Header = () => {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState(searchParams.get("lang"));

  useEffect(() => {
    setLanguage(searchParams.get("lang"));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#004d66",
        width: "100%", // عرض کامل
        height: "80px", // ارتفاع دلخواه
      }}
    >
      <Box>
        <Link
          href={`/landing/?lang=${language}`}
          style={{
            textDecoration: "none",
            color: "#fff",
            fontSize: "1.2rem", // اندازه فونت بزرگتر
            fontWeight: 600, // فونت سنگین‌تر
            padding: "8px 16px", // حاشیه بیشتر برای لینک
            borderRadius: "8px", // گوشه‌های گرد برای دکمه
            display: "flex", 
            alignItems: "center", 
            transition: "background-color 0.3s ease", // انیمیشن انتقال رنگ
            ":hover": {
              backgroundColor: "#1abc9c", // رنگ جدید برای هاور
            }
          }}
        >
          <FaHome style={{ marginRight: "12px" }} size={30} /> 
          خانه
        </Link>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          <div className="sidebar-logo"size={10}>
            <Logo href="/" hover={logoGif} size={10} ></Logo>
          </div>  
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
