"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from 'next/navigation';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import wallpaper from "../../../public/Assests/Projects/project.jpg";
import titleWallpaper from "../../../public/Assests/Projects/title.png";
import problemDetailWallpaper from "../../../public/Assests/Projects/problem-detail.png";
import projectDetailWallpaper from "../../../public/Assests/Projects/project-detail.png";
import goalsWallpaper from "../../../public/Assests/Projects/goals.png";
import toolsWallpaper from "../../../public/Assests/Projects/tools.png";
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
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
            setLanguage(searchParams.get("lang"));
        else {
            window.location.href = current_path + "/" + `?lang=fa`;
        }
    }, []);

    const handleTabClick = (index) => {
        setSelectedTab(index);
    }

    return (
        <>
            {
                language == 'fa' &&
                <ProjectContainer>
                    <Navbar />
                    <Heading>
                        <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                    </Heading>
                    <Main image={wallpaper} direction={"rtl"} >
                        <Content>
                            <Tabs>
                                <TabDetail onClick={() => {handleTabClick(0);}} image={titleWallpaper} />
                                {
                                    details.problemDetail != "" &&
                                    <>
                                        <Line />
                                        <TabDetail onClick={() => {handleTabClick(1);}} image={problemDetailWallpaper} />
                                    </>
                                }
                                {
                                    details.projectDetail != "" &&
                                    <>
                                        <Line />
                                        <TabDetail onClick={() => {handleTabClick(2);}} image={projectDetailWallpaper} />
                                    </>
                                }
                                {
                                    details.goals.length != 0 &&
                                    <>
                                        <Line />
                                        <TabDetail onClick={() => {handleTabClick(3);}} image={goalsWallpaper} />
                                    </>
                                }
                                {
                                    details.toolsImage.length != 0 &&
                                    <>
                                        <Line />
                                        <TabDetail onClick={() => {handleTabClick(4);}} image={toolsWallpaper} />
                                    </>
                                }
                            </Tabs>
                            <TabContent>
                                {
                                    selectedTab == 0 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 0} >عنوان پروژه</ProjectTitle>
                                        <h3>{details.title}</h3>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 1 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 1} >شرح مسئله</ProjectTitle>
                                        <p>{details.problemDetail}</p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 2 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 2} >شرح پروژه</ProjectTitle>
                                        <p>{details.projectDetail}</p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 3 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 3} >اهداف پروژه</ProjectTitle>
                                        <ul>
                                            {
                                                details.goals.map((goal, index) => {
                                                    return (
                                                        <li key={index}>{goal}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 4 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 4} >ابزارهای مورد استفاده</ProjectTitle>
                                        <Pics>
                                            {
                                                details.toolsImage.map((tool, index) => {
                                                    return (
                                                        <Pic key={index} image={tool} />
                                                    )
                                                })
                                            }
                                        </Pics>
                                    </TabContentContainer>
                                }
                            </TabContent>
                        </Content>
                    </Main>
                    <Footer />
                </ProjectContainer>
            }
            {
                language == 'en' &&
                <ProjectContainer>
                    <Navbar />
                    <Heading>
                        <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                    </Heading>
                    <Main image={wallpaper} direction={"ltr"} >
                        <Content>
                            <Tabs>
                                <TabDetail onClick={() => {handleTabClick(0);}} image={titleWallpaper} />
                                {
                                    detailsEN.problemDetail != "" &&
                                    <>
                                        <Line />
                                        <TabDetail onClick={() => {handleTabClick(1);}} image={problemDetailWallpaper} />
                                    </>
                                }
                                {
                                    detailsEN.projectDetail != "" &&
                                    <>
                                        <Line />
                                        <TabDetail onClick={() => {handleTabClick(2);}} image={projectDetailWallpaper} />
                                    </>
                                }
                                {
                                    detailsEN.goals.length != 0 &&
                                    <>
                                        <Line />
                                        <TabDetail onClick={() => {handleTabClick(3);}} image={goalsWallpaper} />
                                    </>
                                }
                                {
                                    detailsEN.toolsImage.length != 0 &&
                                    <>
                                        <Line />
                                        <TabDetail onClick={() => {handleTabClick(4);}} image={toolsWallpaper} />
                                    </>
                                }
                            </Tabs>
                            <TabContent>
                                {
                                    selectedTab == 0 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 0} >Project Title</ProjectTitle>
                                        <h3>{detailsEN.title}</h3>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 1 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 1} >Problem Description</ProjectTitle>
                                        <p>{detailsEN.problemDetail}</p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 2 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 2} >Project Description</ProjectTitle>
                                        <p>{detailsEN.projectDetail}</p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 3 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 3} >Project Objectives</ProjectTitle>
                                        <ul>
                                            {
                                                detailsEN.goals.map((goal, index) => {
                                                    return (
                                                        <li key={index}>{goal}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 4 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 4} >Utilized Tools</ProjectTitle>
                                        <Pics>
                                            {
                                                detailsEN.toolsImage.map((tool, index) => {
                                                    return (
                                                        <Pic key={index} image={tool} />
                                                    )
                                                })
                                            }
                                        </Pics>
                                    </TabContentContainer>
                                }
                            </TabContent>
                        </Content>
                    </Main>
                    <Footer />
                </ProjectContainer>
            }
        </>
    )
}

export default ProjectDetail;
