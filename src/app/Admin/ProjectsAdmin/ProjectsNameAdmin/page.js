"use client";
import React, { useState, useEffect } from "react";
import MangerAdmin from "../../MngerAdmin/MangerAdmin";
import { Select, MenuItem, FormControl, InputLabel, Box, Tooltip } from "@mui/material";

export default function get_equipment() {

  const apiUrl = "get_all_projects_name";
  return (

    <MangerAdmin
      title="انواع پروژه"
      cart={[
        { value: "fa_name", header: "نام فارسی" },
        { value: "en_name", header: "نام انگلیسی" },
        {
          value: "image",
          header: " عکس",
          isImage: true,
          useImagesPath: true
        }
      ]}
      apiUrl={apiUrl}
    />
  );
}
