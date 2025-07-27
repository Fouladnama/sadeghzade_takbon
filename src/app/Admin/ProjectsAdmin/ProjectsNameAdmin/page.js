"use client";

import React, { useState, useEffect } from "react";
import ManagerProject from "../../../../components/ManagerProject/ManagerProject";
import ApiConfig from "../../../../Api";

export default function ProjectsNameAdmin() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    ApiConfig
      .get("https://takbon.biz:3402/get_projects")
      .then((res) => {
        if (res.data && Array.isArray(res.data.value)) {
          setProject(
            res.data.value.map((project) => ({
              code: project._id,
              name: project.fa_name,
            }))
          );
        } else {
          console.error("فرمت دیتا معتبر نیست:", res.data);
        }
      })
      .catch((err) => {
        console.error("خطا در دریافت API:", err);
      });
  }, []);

  const getProject = (projectNo) => {
    const found = project.find((i) => i.code === projectNo);
    return found ? found.name : "نامشخص";
  };

  return (
    <ManagerProject
      url="https://takbon.biz:3402/get_all_projects_name"
      columns={[
        { field: "fa_name", header: "عنوان پروژه" },
        { field: "image", header: "عکس" },

        {
              options: project, // این خط مهمه

          field: "external_link",
          header: "نوع پروژه",
          render: (item) => {
            if (!item.external_link) return "نامشخص";

            const projectArray = Array.isArray(item.external_link)
              ? item.external_link
              : [item.external_link];

            return projectArray.map((id, idx) => (
              <div key={idx}>{getProject(id)}</div>
            ));
          },
        },
      ]}
      title="اسم پروژه"
    />
  );
}
