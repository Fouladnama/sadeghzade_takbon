"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from 'next/navigation';
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import wallpaper from "../../../public/Assests/Projects/project.jpg";
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
} from "./Project_CatStyle.js";

const Project_titles = (props) => {
    const current_path = usePathname();
    const searchParams = useSearchParams();
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
            setLanguage(searchParams.get("lang"));
        else {
            window.location.href = current_path + "/" + `?lang=fa`;
        }
    }, []);

    return (
        <>
            {
                language == 'fa' &&
                <ProjectsContainer>
                    <Navbar />
                    <Heading>
                        <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                    </Heading>
                    <Main image={wallpaper} direction={"rtl"} >
                        <Content>
                            {
                                props.details.projects.map((project, index) => {
                                    return (
                                        <ProjectMajor key={index}>
                                            <Icon src={props.details.icon} alt="icon" />
                                            <Title font={language == 'fa'} >{project.title}</Title>
                                            <ShowMore href={current_path + "/" + (index + 1) + `?lang=${language}`} >توضیحات بیشتر</ShowMore>
                                        </ProjectMajor>
                                    );
                                })
                            }
                        </Content>
                    </Main>
                    <Footer />
                </ProjectsContainer>
            }
            {
                language == 'en' &&
                <ProjectsContainer>
                    <Navbar />
                    <Heading>
                        <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                    </Heading>
                    <Main image={wallpaper} direction={"ltr"} >
                        <Content>
                            {
                                props.detailsEN.projects.map((project, index) => {
                                    return (
                                        <ProjectMajor key={index}>
                                            <Icon src={props.details.icon} alt="icon" />
                                            <Title font={language == 'fa'} >{project.title}</Title>
                                            <ShowMore href={current_path + "/" + (index + 1) + `?lang=${language}`} >More Details</ShowMore>
                                        </ProjectMajor>
                                    );
                                })
                            }
                        </Content>
                    </Main>
                    <Footer />
                </ProjectsContainer>
            }
        </>
    );
}

export default Project_titles;
