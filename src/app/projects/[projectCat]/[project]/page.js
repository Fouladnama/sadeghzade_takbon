"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useParams } from 'next/navigation';
import Navbar from '../../../Navbar/Navbar.js';
import Footer from '../../../Footer/Footer.js';
import logoGif from "../../../../../public/Assests/Landing/takbon.gif";
import wallpaper from "../../../../../public/Assests/Projects/project.jpg";
import titleWallpaper from "../../../../../public/Assests/Projects/title.png";
import problemDetailWallpaper from "../../../../../public/Assests/Projects/problem-detail.png";
import projectDetailWallpaper from "../../../../../public/Assests/Projects/project-detail.png";
import goalsWallpaper from "../../../../../public/Assests/Projects/goals.png";
import toolsWallpaper from "../../../../../public/Assests/Projects/tools.png";
import axios from "axios";

import {
    ProjectContainer,
    Main,
    Heading,
    Logo,
    Content,
    Tabs,
    TabDetail,
    Line,
    TabContentContainer,
    TabContent,
    ProjectTitle,
    Pics,
    Pic
} from './ProjectDetailStyle.js';

const ProjectDetail = ({details, detailsEN}) => {
    const [selectedTab, setSelectedTab] = useState(0);  // 0: title, 1: problem detail, 2: project detail, 3: goals, 4: tools
    const searchParams = useSearchParams();
    const current_path = usePathname();
    const [projectsData, setProjectsData] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const [language, setLanguage] = useState('fa');
    const { project } = useParams(); 

    useEffect(() => {
    setIsClient(true);
   }, []);

    useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang === "fa" || lang === "en") {
      setLanguage(lang);
    } else {
      window.location.href = current_path + "?lang=fa";
    }
  }, [searchParams, current_path]);

useEffect(() => {
  if (isClient && project) {
    axios
      .get(`https://takbon.biz:3402/get_all_projects_detail/?id=${project}`)
      .then((response) => {
        console.log("API response:", response.data);
        // Handle both array and object responses
        const dataArray = Array.isArray(response.data)
          ? response.data
          : response.data?.value || [];
        setProjectsData(dataArray);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
        setProjectsData([]); // Clear data on error to avoid stale state
      });
  }
}, [isClient, project, language]); // Added `language` to dependencies

    const handleTabClick = (index) => {
        setSelectedTab(index);
    }
  const getLocalizedContent = (data, field) => {
        return language === 'fa' ? data[field] : (data[`${field}_en`] || data[field]);
    };

    return (
   <>
  {projectsData.map((Project, index) => (
    
      <ProjectContainer key={index}>
        <Navbar />
        <Heading>
          <Logo href={`/landing?lang=${language}`} hover={logoGif} />
        </Heading>
        <Main image={wallpaper} direction={"rtl"} >
          <Content>
        <Tabs>
  <TabDetail onClick={() => handleTabClick(0)} image={titleWallpaper} />
  {Project.problemDetail !== "" && <>
    <Line />
    <TabDetail onClick={() => handleTabClick(1)} image={problemDetailWallpaper} />
  </>}
  {Project.projectDetail !== "" && <>
    <Line />
    <TabDetail onClick={() => handleTabClick(2)} image={projectDetailWallpaper} />
  </>}
  {Project.goals?.length !== 0 && <>
    <Line />
    <TabDetail onClick={() => handleTabClick(3)} image={goalsWallpaper} />
  </>}
  {Project.toolsImage?.length !== 0 && <>
    <Line />
    <TabDetail onClick={() => handleTabClick(4)} image={toolsWallpaper} />
  </>}
</Tabs>

            <TabContent>
  {selectedTab === 0 && (
    <TabContentContainer adjust={language === 'fa'}>
      <ProjectTitle adjust={language === 'fa'} selected={selectedTab === 0}>
        {language === 'fa' ? "عنوان پروژه" : "Project Title"}
      </ProjectTitle>
      <h3>{language === 'fa' ? Project.title : Project.title_en}</h3>
    </TabContentContainer>
  )}

  {selectedTab === 1 && (
    <TabContentContainer adjust={language === 'fa'}>
      <ProjectTitle adjust={language === 'fa'} selected={selectedTab === 1}>
        {language === 'fa' ? "شرح پروژه" : "Project Description"}
      </ProjectTitle>
      <h3>{language === 'fa' ? Project.explain : Project.explain_en}</h3>
    </TabContentContainer>
  )}

 {selectedTab === 2 && (
  <TabContentContainer adjust={language === 'fa'}>
    <ProjectTitle adjust={language === 'fa'} selected={selectedTab === 2}>
      {language === 'fa' ? "اهداف پروژه" : "Project Objectives"}
    </ProjectTitle>
    <ul>
      {(language === 'fa' ? Project.target : Project.target_en)?.map?.((goal, idx) => (
        <li key={idx}>{goal}</li>
      )) ?? <li>No goals specified</li>}
    </ul>
  </TabContentContainer>
)}

  {selectedTab === 3 && (
    <TabContentContainer adjust={language === 'fa'}>
      <ProjectTitle adjust={language === 'fa'} selected={selectedTab === 3}>
        {language === 'fa' ? "ابزارهای مورد استفاده" : "Used Tools"}
      </ProjectTitle>
      <Pics>
        <img
          src={`https://takbon.biz:3402/images/${Project.imagemain}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/fallback-image.jpg';
          }}
          alt="Project Tools"
        />
      </Pics>
    </TabContentContainer>
  )}
</TabContent>

          </Content>
        </Main>
        <Footer />
      </ProjectContainer>
  
  ))}
</>

    )
}

export default ProjectDetail;