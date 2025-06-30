"use client";

import React, { useState, useEffect } from "react";
import ManagerProject from "../../../../components/ManagerProject/ManagerProject";
import ApiConfig from "../../../../Api";
import {Box,Tooltip} from "@mui/material";
export default function ProjectDetailAdmin() {
  const [project, setProject] = useState([]);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    ApiConfig.get("https://takbon.biz:3402/get_projects")
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

  useEffect(() => {
    ApiConfig.get("https://takbon.biz:3402/get_equipment")
      .then((res) => {
        if (res.data && Array.isArray(res.data.value)) {
          setEquipment(
            res.data.value.map((equipment) => ({
              code: equipment._id,
              name: equipment.image, // فقط نام فایل، بدون URL
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

  const getEquipment = (equipmentNo) => {
    const found = equipment.find((i) => i.code === equipmentNo);
    return found ? found.name : null;
  };

  return (
    <ManagerProject
      url="https://takbon.biz:3402/get_all_projects_detail"
      columns={[
        { field: "tilte", header: "عنوان پروژه" },
        { field: "tilte_en", header: "Project Title" },
        {
          options: project,
          field: "external_id",
          header: "نوع پروژه",
          render: (item) => {
            if (!item.external_id) return "نامشخص";
            const projectArray = Array.isArray(item.external_id)
              ? item.external_id
              : [item.external_id];

            return projectArray.map((id, idx) => (
              <div key={idx}>{getProject(id)}</div>
            ));
          },
        },
        { field: "explain", header: "شرح پروژه" },
        { field: "explain_en", header: "شرح پروژه انگلیسی" },
        { field: "target", header: "اهداف پروژه", isArray: true },
        { field: "target_en", header: "اهداف پروژه انگلیسی" },
        { field: "image", header: "عکس های شاخص" },
        {
  options: equipment,
  field: "imagemain",
  header: "ابزارهای پروژه",
  render: (item) => {
    if (!item.imagemain) return "نامشخص";

    const equipmentArray = Array.isArray(item.imagemain)
      ? item.imagemain
      : [item.imagemain];

    return (
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", maxHeight: 80, overflowY: "auto", p: 0.5 }}>
        {equipmentArray.map((id, idx) => {
          const imageName = getEquipment(id);
          return imageName ? (
            <Tooltip key={idx} title={imageName}>
              <Box
                component="img"
                src={`https://takbon.biz/images/${imageName}`}
                alt="equipment"
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #1976d2",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.4)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.7)",
                  },
                }}
              />
            </Tooltip>
          ) : (
            <Box
              key={idx}
              sx={{
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.300",
                borderRadius: "50%",
                color: "text.secondary",
                fontSize: 12,
                border: "2px solid #ccc",
              }}
            >
              نامشخص
            </Box>
          );
        })}
      </Box>
    );
  }
}

      ]}
      title="جزییات پروژه"
    />
  );
}
