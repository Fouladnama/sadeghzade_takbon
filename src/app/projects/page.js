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
{
  ProjectsData.length > 0 &&
   <ProjectContainer>
    <Navbar />
    <Main image={contact} >
      <Heading>
        <Logo href={`/landing?lang=${language}`} hover={logoGif} />
      </Heading>
      <Content>
    <RightDiv>
  {ProjectsData.map((item, index) => (
    <Link 
      key={index} 
      href={`${current_path}/${item.route}?lang=${language}`} // فرض: از بک‌اند `route` میاد یا خودت تنظیمش می‌کنی
    >
      <Container>
        {/* اگر ایندکس زوجه، متن راست و عکس چپ؛ اگر فرده، متن چپ و عکس راست */}
        {index % 2 === 0 ? (
          <>
            <Image><div className="layer" /></Image>
            <RightText>
              {language === 'en' ? item.en_name : item.fa_name}
            </RightText>
          </>
        ) : (
          <>
            <LeftText>
              {language === 'en' ? item.en_name : item.fa_name}
            </LeftText>
            <Image><div className="layer" /></Image>
          </>
        )}
      </Container>
    </Link>
  ))}
</RightDiv>

      </Content>
    </Main>
    <Footer />
  </ProjectContainer>
}


    </>
  );
};

export default Project;
