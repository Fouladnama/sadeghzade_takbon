"use client";
import React, { useState, useEffect } from "react";
import MangerAdmin from "../MngerAdmin/MangerAdmin";

export default function CompanyAdmin() {

const apiUrl = "company";
  return (
  
        <MangerAdmin
            title="مشتریان"
            cart={[
              {value:"title",headers:'نام'},
              {value:"image",
              headers:'عکس',
              isImage: true,
            //   useImagesPath: true
            },
            ]}
            apiUrl={apiUrl}
            
            />
  );
}
