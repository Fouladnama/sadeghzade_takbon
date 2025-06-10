"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useParams } from 'next/navigation';
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import logoGif from "../../../../public/Assests/Landing/takbon.gif";
import wallpaper from "../../../../public/Assests/Projects/project.jpg";
import {
  ProjectsContainer,
  Main,
  Heading,
  Logo,
  Content,
  ProjectMajor,
  Icon,
  Title,
  ShowMore
} from "./Project_CatStyle";

const Project_titles = () => {
  const current_path = usePathname();
  const searchParams = useSearchParams();
  const { projectCat } = useParams();  // نام پارامتر دینامیک مسیر باید درست باشد
  const [language, setLanguage] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [projectsData, setProjectsData] = useState([]);

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
  if (isClient && projectCat) {
    axios.get(`https://takbon.biz:3402/get_all_projects_name/?id=${projectCat}`)
      .then((response) => {
        console.log("API response:", response.data);
        // فرض می‌کنیم داده‌ها توی response.data.value است، اگر نه response.data
        const dataArray = Array.isArray(response.data) ? response.data : (response.data.value || []);
        setProjectsData(dataArray);
      })
      .catch(console.error);
  }
}, [isClient, projectCat]);

  if (!language) return null;

 return (
    <>
        <ProjectsContainer>
      <Navbar />
      <Heading>
        <Logo href={`/landing?lang=${language}`} hover={logoGif} />
      </Heading>
      <Main image={wallpaper} direction={language === "fa" ? "rtl" : "ltr"}>
        <Content>
          {projectsData.length === 0 ? (
            <p style={{ textAlign: "center" }}>در حال بارگذاری یا اطلاعاتی وجود ندارد</p>
          ) : (
            projectsData.map((project, index) => (
              <ProjectMajor key={index}>
                <Icon src="/icon.png" alt="icon" />
                <Title font={language === 'fa'}>{project.fa_name}</Title>
                <ShowMore href={`${current_path}/${index + 1}?lang=${language}`}>توضیحات بیشتر</ShowMore>
              </ProjectMajor>
            ))
          )}
        </Content>
      </Main>
      <Footer />
    </ProjectsContainer></>

  );
};

export default Project_titles;
