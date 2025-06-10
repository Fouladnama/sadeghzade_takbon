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
          console.log("DATA:", response.data); // بررسی دیتا
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
          <Link href={current_path + "/data-analysis" + `?lang=${language}`} >
            <Container>
              <div className="layer" />
              <RightText>
                {language === 'en' ? ProjectsData[0]?.en_name : ProjectsData[0]?.fa_name}
              </RightText>
            </Container>
          </Link>

          <Link href={current_path + "/data-minning" + `?lang=${language}`} >
            <Container>
              <LeftText>
                {language === 'en' ? ProjectsData[1]?.en_name : ProjectsData[1]?.fa_name}
              </LeftText>
              <div className="layer" />
            </Container>
          </Link>

          <Link href={current_path + "/needs-assessment" + `?lang=${language}`} >
            <Container>
              <div className="layer" />
              <RightText>
                {language === 'en' ? ProjectsData[2]?.en_name : ProjectsData[2]?.fa_name}
              </RightText>
            </Container>
          </Link>

          <Link href={current_path + "/market-research" + `?lang=${language}`} >
            <Container>
              <LeftText>
                {language === 'en' ? ProjectsData[3]?.en_name : ProjectsData[3]?.fa_name}
              </LeftText>
              <div className="layer" />
            </Container>
          </Link>

          <Link href={current_path + "/simulation" + `?lang=${language}`} >
            <Container>
              <div className="layer" />
              <RightText>
                {language === 'en' ? ProjectsData[4]?.en_name : ProjectsData[4]?.fa_name}
              </RightText>
            </Container>
          </Link>

          <Link href={current_path + "/scheduling" + `?lang=${language}`} >
            <Container>
              <LeftText>
                {language === 'en' ? ProjectsData[5]?.en_name : ProjectsData[5]?.fa_name}
              </LeftText>
              <div className="layer" />
            </Container>
          </Link>
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
