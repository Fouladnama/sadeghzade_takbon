"use client";
import React, { useState, useEffect } from "react";
import MangerAdmin from "../MngerAdmin/MangerAdmin";
import { Select, MenuItem, FormControl, InputLabel, Box, Tooltip } from "@mui/material";

export default function ProjectsAdmin() {

const apiUrl = "get_projects";
  return (
  
      <MangerAdmin
      title="عنوان های پروژه"
        cart={[
          { value: "fa_name", header: "عنوان فارسی " },
          { value: "en_name", header:  "عنوان انگلیسی"  },
        {
            value: "image",
            header: "عکس های شاخص" ,
            isImage: true,
            useImagesPath: true  
        },
        ]}
        apiUrl={apiUrl}
      />
  );
}
