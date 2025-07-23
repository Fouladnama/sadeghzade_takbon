'use client';

import { Box, Typography, Paper, Grid } from '@mui/material';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function DashboardPage() {
    const router = useRouter();

   useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, [router]);
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f4f6f9' }}>
  
      <Box
        sx={{
          flex: 1,
          padding: 3,
          fontFamily: "'Arial', sans-serif",
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" sx={{ color: '#2c3e50', marginBottom: 2 }}>
          صفحه مدیریت
        </Typography>
        <Typography variant="body1" sx={{ color: '#7f8c8d', lineHeight: 1.6 }}>
          این بخش شامل اطلاعات مدیریت است. شما می‌توانید اینجا تمام تنظیمات مرتبط با مدیریت سایت را انجام دهید.
        </Typography>
      </Box>
    </Box>
  );
}
