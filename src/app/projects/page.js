"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import axios from "axios";
import Link from 'next/link.js';
import Navbar from "../Navbar/Navbar.js";
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
  Image,
  RightText,
  LeftText
} from "./ProjectsStyle.js";
const Project = () => {
  const current_path = usePathname();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [ProjectsData, setProjectsData] = useState([]);

  useEffect(() => {
    setIsClient(true); // مهم!
  }, []);

  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang === "fa" || lang === "en") {
      setLanguage(lang);
    } else {
      window.location.href = current_path + "/" + `?lang=fa`;
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      axios
        .get("https://takbon.biz:3402/get_projects")
        .then((response) => {
          console.log("DATA:", response.data); 
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
  }, [isClient]);

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
                
                console.log(`تصویر ${index}:`, imageUrl);

                return (
                  <Link 
                    key={index} 
                    href={`/projects/${item._id}?lang=${language}`}
                                        passHref
                  >
                    <Container >
                      {index % 2 === 0 ? (
                        <>
                          <div style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            <div style={{
                              width: '200px',
                              height: '200px',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              border: '3px solid #your-color',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                              <img
                                src={imageUrl}
                                alt={language === 'en' ? item.en_name : item.fa_name}
                                style={{
                                  width: '100%',
                                  height: '100%',

                                }}
                                onError={(e) => {
                                  console.error('خطا در بارگذاری تصویر:', e.target.src);
                                  e.target.onerror = null;
                                  e.target.src = '/fallback-image.jpg';
                                }}
                              />
                            </div>
                          </div>
                          <RightText style={{ flex: 1}}>
                            {language === 'en' ? item.en_name : item.fa_name}
                          </RightText>
                        </>
                      ) : (
                        <>
                          <LeftText style={{flex: 1}}>
                            {language === 'en' ? item.en_name : item.fa_name}
                          </LeftText>
                          <div style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            <div style={{
                              width: '200px',
                              height: '200px',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              border: '3px solid #your-color',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                              <img
                                src={imageUrl}
                                alt={language === 'en' ? item.en_name : item.fa_name}
                                style={{
                                  width: '100%',
                                  height: '100%',

                                }}
                                onError={(e) => {
                                  console.error('خطا در بارگذاری تصویر:', e.target.src);
                                  e.target.onerror = null;
                                  e.target.src = '/fallback-image.jpg';
                                }}
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
