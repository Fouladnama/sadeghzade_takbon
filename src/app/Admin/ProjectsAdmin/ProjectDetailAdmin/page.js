"use client";

import React,{useState,useEffect} from "react";
import ManagerProject from "../../../../components/ManagerProject/ManagerProject";
import axios from "axios";

export default function ProjectDetailAdmin(){

    const [project, setProject] = useState([]);

  useEffect(() => {
    axios
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

  return(
    <ManagerProject
     url="https://takbon.biz:3402/get_all_projects_detail"

     columns={[
    {field:"tilte",header:"عنوان پروژه"} ,
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
    {field:"explain",header:"شرح پروژه"} ,
    {field:"target",header:"اهداف پروژه"} ,
    {field:"image",header:"ابزارهای پروژه"} ,


     ]}
         title="جزییات پروژه"

    />

  );
}