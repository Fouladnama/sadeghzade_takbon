"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import LazyLoad, { lazyload } from 'react-lazyload';
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import background from "../../../public/Assests/Services/background.jpg";
import diagnostics from "../../../public/Assests/Services/diagnosis.png";
import learning from "../../../public/Assests/Services/learning.jpg";
import processDesign from "../../../public/Assests/Services/process_design.png";
import simulation from "../../../public/Assests/Services/simulation.jpg";
import production_planning from "../../../public/Assests/Services/production-planning.jpg";
import informationSystem from "../../../public/Assests/Services/inf-system.jpg";
import data_analysis from "../../../public/Assests/Services/data-analysis.jpg";
import report from "../../../public/Assests/Services/report.jpg";
import {
    ServicesContainer,
    Main,
    Heading,
    Logo,
    Content,
    Tabs,
    Tab,
    TabDetail,
    TabContentContainer,
    TabContent,
    ProjectTitle,
} from "./ServicesStyle.js";

const Services = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const searchParams = useSearchParams();
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
            setLanguage(searchParams.get("lang"));
        else {
            window.location.href = '/services?lang=fa';
        }
    }, []);

    const handleTabClick = (index) => {
        setSelectedTab(index);
    }

    return (
        <>
            {
                language == 'fa' &&
                <ServicesContainer>
                    <Navbar />
                    <Main image={background} direction={"rtl"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                            <Tabs>
                                <LazyLoad className="lazy" height={100} offset={200}>
                                    <Tab onClick={() => {handleTabClick(0);}} >
                                        <TabDetail image={diagnostics} />
                                        <p>عارضه یابی</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(1);}} >
                                        <TabDetail image={production_planning} />
                                        <p>مدلسازی و بهینه سازی</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(2);}} >
                                        <TabDetail image={processDesign} />
                                        <p>تحلیل فرآیندها</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(3);}} >
                                        <TabDetail image={simulation} />
                                        <p>شبیه سازی</p>
                                    </Tab>
                                    
                                    {/* <Tab onClick={() => {handleTabClick(4);}} >
                                        <TabDetail image={learning} />
                                        <p>آموزش</p>
                                    </Tab> */}
                                    
                                    <Tab onClick={() => {handleTabClick(5);}} >
                                        <TabDetail image={informationSystem} />
                                        <p>طراحی و تحلیل سیستم های اطلاعاتی</p>
                                    </Tab>

                                    <Tab onClick={() => {handleTabClick(6);}} >
                                        <TabDetail image={data_analysis} />
                                        <p>تحلیل داده</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(7);}} >
                                        <TabDetail image={report} />
                                        <p>گزارشات هوش تجاری</p>
                                    </Tab>
                                </LazyLoad>
                            </Tabs>
                            <TabContent>
                                {
                                    selectedTab == 0 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 0} >عارضه یابی</ProjectTitle>
                                        <ul>
                                            <li>عارضه یابی سازمانی</li>
                                            <li>عارضه یابی هزینه ای</li>
                                        </ul>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 1 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 1} >مدلسازی و بهینه سازی</ProjectTitle>
                                        <p>
                                            <span>برنامه ریزی و تخصیص</span>
                                            <ul className="normal">
                                                <li>مواد اولیه</li>
                                                <li>کارگران</li>
                                                <li>ایستگاه های کاری</li>
                                            </ul>
                                            <span>برای انجام به موقع سفارشات</span>
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 2 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 2} >تحلیل فرآیندها</ProjectTitle>
                                        <p>
                                            فرایند مجموعه‌ای از وظایف مرتبط به هم است که ورودی‌ها را به یک خروجی معین تبدیل میکند.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 3 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 3} >شبیه سازی</ProjectTitle>
                                        <p>
                                            شبیه‌ سازی تقلید از عملکرد یک فرایند یا یک سیستم واقعی در طول زمان است.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 4 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 4} >آموزش</ProjectTitle>
                                        <p>
                                            <ul className="normal">
                                                <li>GAMS</li>
                                                <li>Anylogic</li>
                                                <li>Python</li>
                                                <li>#C</li>
                                                <li>SQL</li>
                                                <li>BPMN<span>2.0</span></li>
                                            </ul>
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 5 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 5} >طراحی و استقرار سیستم های اطلاعاتی</ProjectTitle>
                                        <p>
                                            <span>طراحی و استقرار سیستم</span>
                                            <ul className="normal" >
                                                <li>سیاست گذاری برنامه ریزی خرید</li>
                                                <li>وفاداری مشتریان</li>
                                                <li>مدل پایلوت برنامه ریزی هوشمند خرید</li>
                                            </ul>
                                            <span></span>
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 6 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 6} >تحلیل داده</ProjectTitle>
                                        <p>
                                            فرآیند فهمیدن، پاک‌سازی، آماده‌سازی و تحلیل داده‌ها که به منظور استخراج اطلاعات سودمند برای تصمیم‌گیری انجام می‌شود.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 7 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 7} >گزارشات هوش تجاری</ProjectTitle>
                                        <p>
                                            گزارشات مدیریتی هستند که داده‌ های خام و بدون معنا را به اطلاعاتی معنادار برای سود بخشیدن به امور تجاری، مالی و بازرگانی تبدیل می کنند.
                                        </p>
                                    </TabContentContainer>
                                }
                            </TabContent>
                        </Content>
                    </Main>
                    <Footer />
                </ServicesContainer>
            }
            {
                language == 'en' &&
                <ServicesContainer>
                    <Navbar />
                    <Main image={background} direction={"ltr"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                            <Tabs>
                                <LazyLoad className="lazy" height={100} offset={200}>
                                    <Tab onClick={() => {handleTabClick(0);}} >
                                        <TabDetail image={diagnostics} />
                                        <p>Troubleshooting</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(1);}} >
                                        <TabDetail image={production_planning} />
                                        <p>Modeling and Optimization</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(2);}} >
                                        <TabDetail image={processDesign} />
                                        <p>Process Analysis</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(3);}} >
                                        <TabDetail image={simulation} />
                                        <p>Simulation</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(4);}} >
                                        <TabDetail image={learning} />
                                        <p>Education</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(5);}} >
                                        <TabDetail image={informationSystem} />
                                        <p>Information Systems</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(6);}} >
                                        <TabDetail image={data_analysis} />
                                        <p>Data Analysis</p>
                                    </Tab>
                                    
                                    <Tab onClick={() => {handleTabClick(7);}} >
                                        <TabDetail image={report} />
                                        <p>Business Intelligence Reports</p>
                                    </Tab>
                                </LazyLoad>
                            </Tabs>
                            <TabContent>
                                {
                                    selectedTab == 0 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 0} >Troubleshooting</ProjectTitle>
                                        <ul>
                                            <li>Organizational troubleshooting</li>
                                            <li>Financial troubleshooting</li>
                                        </ul>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 1 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 1} >Modeling and Optimization</ProjectTitle>
                                        <p>
                                            <span>Planning and allocation of</span>
                                            <ul className="normal">
                                                <li>raw materials</li>
                                                <li>workers</li>
                                                <li>workstations</li>
                                            </ul>
                                            <span>to fulfill orders on time</span>
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 2 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 2} >Process Analysis</ProjectTitle>
                                        <p>
                                            A process is a set of related tasks that transforms inputs into a specific output.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 3 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 3} >Simulation</ProjectTitle>
                                        <p>
                                            Simulation is the imitation of the operation or performance of a real-world process or system over time.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 4 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 4} >Education</ProjectTitle>
                                        <p>
                                            <ul className="normal">
                                                <li>GAMS</li>
                                                <li>Anylogic</li>
                                                <li>Python</li>
                                                <li>C#</li>
                                                <li>SQL</li>
                                                <li>BPMN<span>2.0</span></li>
                                            </ul>
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 5 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 5} >Design and Implementation of Information Systems</ProjectTitle>
                                        <p>
                                            System design and deployment
                                            <ul className="normal" >
                                                <li>Policy-making for purchase planning</li>
                                                <li>Customer loyalty</li>
                                                <li>Pilot model for intelligent purchasing planning</li>
                                            </ul>
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 6 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 6} >Data Analysis</ProjectTitle>
                                        <p>
                                            The process of understanding, cleaning, preparing, and analyzing data that is done to extract useful information for decision-making.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 7 &&
                                    <TabContentContainer adjust={language == 'fa'} >
                                        <ProjectTitle adjust={language == 'fa'} selected={selectedTab == 7} >Business Intelligence Reports</ProjectTitle>
                                        <p>
                                            Management reports are those that transform raw and meaningless data into meaningful information to benefit business, financial, and commercial affairs.
                                        </p>
                                    </TabContentContainer>
                                }
                            </TabContent>
                        </Content>
                    </Main>
                    <Footer />
                </ServicesContainer>
            }
        </>
    );
}

export default Services;
