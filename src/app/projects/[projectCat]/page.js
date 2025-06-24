"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useParams } from 'next/navigation';
import axios from "axios";
import Link from 'next/link';
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
  Title,
  ShowMore
} from "./Project_CatStyle";

const Project_titles = () => {
  const current_path = usePathname();
  const searchParams = useSearchParams();
  const { projectCat } = useParams();
  const [language, setLanguage] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang === "fa" || lang === "en") {
      setLanguage(lang);
    } else {
      window.location.href = `${current_path}?lang=fa`;
    }
  }, [searchParams, current_path]);

  useEffect(() => {
    if (!language || !projectCat) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://takbon.biz:3402/get_all_projects_name/?id=${projectCat}`);
        const dataArray = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.value || []);
        setProjectsData(dataArray);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("خطا در دریافت اطلاعات پروژه. لطفاً دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language, projectCat]);

  if (!language) return null;

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ProjectsContainer>
      <Navbar />
      <Heading>
        <Logo href={`/landing?lang=${language}`} hover={logoGif} />
      </Heading>
      <Main image={wallpaper} direction={language === "fa" ? "rtl" : "ltr"}>
        <Content>
          {projectsData.length === 0 ? (
            <p style={{ textAlign: "center" }}>اطلاعاتی برای نمایش وجود ندارد</p>
          ) : (
            projectsData.map((item) => {
              const imageUrl = item.image 
                ? item.image.startsWith('http')
                  ? item.image
                  : `https://takbon.biz/images/${item.image}`
                : '/fallback-image.jpg';
              
              const tilte = language === 'en' ? item.en_name : item.tilte;

              return (
                
                <ProjectMajor key={item._id}>
                 <img 
  src={imageUrl} 
  alt={tilte}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/fallback-image.jpg';
  }}
  style={{
    width: "90px",
    height: "90px",
    objectFit: "cover", // یا "contain"
    borderRadius: "8px" // اگر خواستی گرد باشه
  }}
/>

                  <Title font={language === 'fa'}>{tilte}</Title>
                  <Link 
                    href={`/projects/${projectCat}/${item._id}?lang=${language}`} 
                    passHref
                    legacyBehavior
                  >
                    <ShowMore>
                      {language === 'en' ? 'More details' : 'توضیحات بیشتر'}
                    </ShowMore>
                  </Link>
                </ProjectMajor>
              );
            })
          )}
        </Content>
      </Main>
      <Footer />
    </ProjectsContainer>
  );
};

export default Project_titles;