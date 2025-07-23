"use client";
import React, { useState, useEffect } from "react";
import MangerAdmin from "../../MngerAdmin/MangerAdmin";
import ApiConfig from "../../../../Api";
import { Select, MenuItem, FormControl, InputLabel, Box, Tooltip } from "@mui/material";

export default function ProjectDetailAdmin() {

  const apiUrl = "get_all_projects_detail"; 

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
    name: equipment.image,
    image: equipment.image
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
    const found = equipment.find((i) => String(i.code) === String(equipmentNo));
    if (found && found.image) {
        return found.image;
    } else {
        console.warn("تصویر یافت نشد یا خالی است برای:", equipmentNo);
        return null;
    }
};

  return (
  
      <MangerAdmin
      title="مدیریت اخبار تاک بن"
        cart={[
         { 
  value: "external_id", 
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
     editRender: ({ value, onChange, options }) => (
    <select
      multiple
      value={Array.isArray(value) ? value : []}
      onChange={(e) => {
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        onChange(selected);
      }}
      style={{ width: "100%" }}
    >
      {options.map(opt => (
        <option key={opt.code} value={opt.code}>{opt.name}</option>
      ))}
    </select>
  ),


  options: project  
},
          { value:"tilte", 
            header:  "عنوان پروژه" },
          { value: "tilte_en", header: "عنوان پروژه انگلیسی " },
          { value: "explain", header:  "شرح پروژه"  },
          { value: "explain_en", header: "شرح پروژه انگلیسی" },

        { value: "target", header: "اهداف پروژه", isArray: true },
        { value: "target_en", header: "اهداف پروژه انگلیسی", isArray: true },{
            value: "image",
            header: "عکس های شاخص" ,
            isImage: true,
              useImagesPath: true  
        },
          
{
  value: "imagemain",
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
                  borderRadius: "8px",
                  border: "2px solid #1976d2",
                  margin: "2px",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)",
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
                borderRadius: "8px",
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
},
editRender: ({ value, onChange, options }) => {
  const selectedValues = Array.isArray(value) ? value : [];

  const toggleSelect = (code) => {
    if (selectedValues.includes(code)) {
      onChange(selectedValues.filter((v) => v !== code));
    } else {
      onChange([...selectedValues, code]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {options.map((opt) => {
        const isSelected = selectedValues.includes(opt.code);
        return (
          <Tooltip key={opt.code} title={opt.code}>
            <Box
              component="img"
              src={`https://takbon.biz/images/${opt.image}`}
              alt={opt.code}
              onClick={() => toggleSelect(opt.code)}
              sx={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: "8px",
                border: isSelected ? "3px solid #1976d2" : "2px solid #ccc",
                boxShadow: isSelected ? "0 0 10px rgba(25, 118, 210, 0.5)" : "none",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
},




  options: equipment,
}

        ]}
        apiUrl={apiUrl}
      />
  );
}
