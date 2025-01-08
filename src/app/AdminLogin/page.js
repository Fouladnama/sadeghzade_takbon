'use client';

import React, { useState } from "react";
import { Box, TextField, Button, Card, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";
import Header from "./Header";
import aa from "../../../public/Assests/AdminLogin/aa.jpg";

const Main = styled.div`
  width: 100%;
  height: fit-content;
  background-image: url(${(props) => props.image.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  direction: ${(props) => props.direction};
  min-height: 100vh;

  @media screen and (min-height: 900px) {
    height: 100vh;
  }
`;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      console.log("Login successful!");
      router.push('/Admin');
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <>
      <Header />
      <Main image={aa} direction="rtl">
        <Card
          sx={{
            padding: 4,
            maxWidth: 450,
            width: "100%",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              marginBottom: 2,
              fontFamily: "Shabnam, sans-serif",
              fontSize: "1.7rem",
              fontWeight: 600,
              color: "#2c3e50",
              letterSpacing: "0.5px",
              transition: "all ease-in-out .3s",
            }}
          >
            <TypeAnimation
              cursor={false}
              sequence={[500, 'ورود ادمین', 2000, '']}
              speed={50}
              repeat={Infinity}
            />
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="نام کاربری"
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 2, borderRadius: "10px" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="رمز عبور"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 3, borderRadius: "10px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#3498db",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px 0",
                "&:hover": {
                  backgroundColor: "#2980b9",
                },
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // افکت سایه برای دکمه
              }}
            >
              ورود
            </Button>
          </form>
        </Card>
      </Main>
    </>
  );
};

export default AdminLogin;
