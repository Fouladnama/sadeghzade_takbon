"use client";
import React, { useState, useEffect } from "react";
import MangerAdmin from "../../MngerAdmin/MangerAdmin";
import { Select, MenuItem, FormControl, InputLabel, Box, Tooltip } from "@mui/material";

export default function get_equipment() {

const apiUrl = "get_equipment";
  return (
  
      <MangerAdmin
      title="ابزارهای پروژه"
        cart={[
          {value:"imageTitle",header:"نام"},
          {value:"image",
          header:" عکس",
          isImage: true,
          useImagesPath: true 
         }
        ]}
        apiUrl={apiUrl}
      />
  );
}
