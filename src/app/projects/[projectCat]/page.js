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
import Image from 'next/image';

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
      if (typeof window !== "undefined") {
        window.location.href = `${current_path}?lang=fa`;
      }
    }
  }, [searchParams, current_path]);

  useEffect(() => {
    if (!language || !projectCat) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://takbon.biz:3402/get_projects_name/?id=${projectCat}`);
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

  if (!language || !projectCat) return null;
  if (loading) return <div style={{ textAlign: "center", padding: "2rem" }}>در حال بارگذاری...</div>;
  if (error) return <div style={{ textAlign: "center", padding: "2rem" }}>{error}</div>;

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
              if (!item || !item._id) {
                console.warn("Project item missing _id, skipping:", item);
                return null;
              }

              const imageUrl = item.image
                ? item.image.startsWith('http')
                  ? item.image
                  : `https://takbon.biz/images/${item.image}`
                : '/fallback-image.jpg';

              const title = language === 'en' ? item.tilte_en : item.tilte;
              const href = `/projects/${projectCat}/${item._id}?lang=${language}`;

              return (
                <ProjectMajor key={item._id}>
                  <Image
                    src={imageUrl}
                    alt={title || "project image"}
                    width={90}
                    height={90}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />
                  <Title $font={language === 'fa'}>{title || "بدون عنوان"}</Title>

                  {projectCat && item._id && language ? (
                    <Link href={href}>
    <ShowMore as="div">
                        {language === 'en' ? 'More details' : 'توضیحات بیشتر'}
                      </ShowMore>
                    </Link>
                  ) : (
  <ShowMore as="div" style={{ cursor: "not-allowed", opacity: 0.5 }}>
                      {language === 'en' ? 'More details' : 'توضیحات بیشتر'}
                    </ShowMore>
                  )}
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
