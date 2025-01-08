import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const PersianCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f1e1', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h5" sx={{ color: '#6b8e23', marginBottom: 2 }}>
        تقویم شمسی
      </Typography>

      <SomeCalendarComponent
        onChange={handleDateChange}
        value={date}
        calendarType="persian"
        locale="fa-IR" 
        tileClassName="calendar-tile"
        tileContent={({ date, view }) => {
          return view === 'month' ? (
            <span style={{ color: '#6b8e23' }}>{date.getDate()}</span>
          ) : null;
        }}
        next2Label={null}
        prev2Label={null}
        style={{
          width: '100%',
          maxWidth: '280px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          padding: '10px',
        }}
      />
      
      <Typography sx={{ marginTop: 2, color: '#6b8e23' }}>
        تاریخ انتخاب شده: {date.toLocaleDateString('fa-IR')}
      </Typography>
    </Box>
  );
};

export default PersianCalendar;
