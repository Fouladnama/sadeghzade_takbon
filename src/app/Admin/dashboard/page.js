'use client';

import { Box, Typography, Paper, Grid } from '@mui/material';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // می‌توانید در اینجا چک دسترسی یا redirect اضافه کنید
    }
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffe4e1 0%, #fff0f5 100%)', // پس زمینه صورتی ملایم
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#c2185b', // رنگ صورتی تیره برای تیتر
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center',
        }}
      >
        داشبورد مدیریت
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 3,
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              backgroundColor: 'white',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#d81b60', // صورتی برجسته
                fontWeight: 600,
                mb: 2,
              }}
            >
              صفحه مدیریت
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#7f8c8d',
                lineHeight: 1.8,
                fontSize: '1rem',
              }}
            >
              این بخش شامل اطلاعات مدیریت است. شما می‌توانید اینجا تمام تنظیمات مرتبط با مدیریت سایت را انجام دهید.  
              طراحی مدرن و کارت‌ها به شما امکان اضافه کردن ویجت‌ها، نمودارها و گزارش‌ها را می‌دهد.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
