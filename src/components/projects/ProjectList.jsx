"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link.js';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.js";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import contact from "../../../public/Assests/Projects/decision.jpg";
import {
  ProjectContainer,
  Main,
  Heading,
  Logo,
  Content,
  RightDiv,
  Container,
  RightText,
  LeftText
} from "./ProjectsStyle.js";
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const Project = () => {
  const [language, setLanguage] = useState('fa');
  const [ProjectsData, setProjectsData] = useState([]);
  const searchParams = useSearchParams();

  // حفظ scroll position
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('projectsScroll');
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll));
    }
    return () => {
      sessionStorage.setItem('projectsScroll', window.scrollY);
    };
  }, []);

  // تنظیم زبان
  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang === "fa" || lang === "en") {
      setLanguage(lang);
    }
  }, [searchParams]);

  // fetch پروژه‌ها فقط یک بار
  useEffect(() => {
    if (ProjectsData.length === 0) { // جلوگیری از fetch دوباره هنگام برگشت
      axios.get("https://takbon.biz:3402/get_projects")
        .then((response) => {
          const validatedData = response.data.value.map((Projects) => ({
            ...Projects,
            content: Projects.content || "",
          }));
          setProjectsData(validatedData);
        })
        .catch((error) => {
          console.error("Error fetching Projects data:", error);
        });
    }
  }, [ProjectsData.length]);

  return (
    <>
      {ProjectsData.length > 0 && (
        <ProjectContainer>
          <Navbar />
          <Main image={contact}>
            <Heading>
              <Logo href={`/landing?lang=${language}`} hover={logoGif} />
            </Heading>
            <Content>
              <RightDiv>
                {ProjectsData.map((item, index) => {
                  const imageUrl = item.image 
                    ? item.image.startsWith('http')
                      ? item.image
                      : `https://takbon.biz/images/${item.image}`
                    : '/fallback-image.jpg';

                  return (
                    <Link 
                      key={index} 
                      href={`/projects/${item._id}?lang=${language}`}
                      passHref
                    >
                      <Container>
                        {index % 2 === 0 ? (
                          <>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-20px' }}>
                              <div style={{
                                width: '130px', height: '130px', border: '2px solid #fff', borderRadius: '100%', backgroundColor: '#fff',
                                backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', boxShadow: 'rgba(0,0,0,0.24) 0px 3px 8px', position: 'relative', overflow: 'hidden', zIndex: 1
                              }}>
                                <Image 
                                  src={imageUrl}
                                  alt={language === 'en' ? item.en_name : item.fa_name}
                                  width={130}
                                  height={130}
                                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                  onError={(e) => { e.target.onerror = null; e.target.src = '/fallback-image.jpg'; }}
                                />
                              </div>
                            </div>
                            <RightText style={{ flex: 1, marginLeft: '-20px' }}>
                              {language === 'en' ? item.en_name : item.fa_name}
                            </RightText>
                          </>
                        ) : (
                          <>
                            <LeftText style={{ flex: 1, marginLeft: '-20px' }}>
                              {language === 'en' ? item.en_name : item.fa_name}
                            </LeftText>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '-20px' }}>
                              <div style={{
                                width: '130px', height: '130px', border: '2px solid #fff', borderRadius: '100%', backgroundColor: '#fff',
                                backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', boxShadow: 'rgba(0,0,0,0.24) 0px 3px 8px', position: 'relative', overflow: 'hidden', zIndex: 1
                              }}>
                                <img
                                  src={imageUrl}
                                  alt={language === 'en' ? item.en_name : item.fa_name}
                                  style={{ width: '100%', height: '100%' }}
                                  onError={(e) => { e.target.onerror = null; e.target.src = '/fallback-image.jpg'; }}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </Container>
                    </Link>
                  );
                })}
              </RightDiv>
            </Content>
          </Main>
          <Footer />
        </ProjectContainer>
      )}
    </>
  );
};

export default Project;
