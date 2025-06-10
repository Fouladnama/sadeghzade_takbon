// app/Admin/ProjectsAdmin/page.js
"use client";
import React from "react";
import ManagerProject from "../../../components/ManagerProject/ManagerProject";

export default function ProjectsAdmin() {
  return (
    <ManagerProject
      url="https://takbon.biz:3402/get_projects"
      columns={[
        { field: "fa_name", header: "  عنوان فارسی" },
        { field: "en_name", header: "عنوان انگلیسی"},
          { field: "image", header: "عکس" },
            
      ]}
      title="عنوان های پروژه"
    />
  );
}
