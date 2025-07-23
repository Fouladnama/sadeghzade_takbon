// "use client";  // این خط را اضافه کنید

// import React, { useState } from "react";
// import { Menu, MenuItem, Button, Container, Box, Typography } from "@mui/material";

// const Admin = () => {
  
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginTop: 5,
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           صفحه مدیریت
//         </Typography>

//         {/* منوی کشویی */}
//         <Button onClick={handleClick} variant="contained" color="primary">
//           منو
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleClose}>داشبورد</MenuItem>
//           <MenuItem onClick={handleClose}>مدیریت کاربران</MenuItem>
//           <MenuItem onClick={handleClose}>تنظیمات</MenuItem>
//         </Menu>

//         {/* دکمه‌ها */}
//         <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
//           <Button variant="contained" color="primary">افزودن کاربر</Button>
//           <Button variant="outlined" color="secondary">مشاهده گزارش‌ها</Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Admin;
