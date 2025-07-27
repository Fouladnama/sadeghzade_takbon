"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import LazyLoad, { lazyload } from 'react-lazyload';
import Navbar from "../Navbar/Navbar";
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
import axios from "axios";

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
    const [ServicesData, setServicesData] = useState([]);
useEffect(() => {
  axios
    .get("https://takbon.biz:3402/services_available")
    .then((response) => {
      const validatedData = response.data.value.map((Services) => ({
        ...Services,
        content: Services.content || "",
      }));
      setServicesData(validatedData);
    })
    .catch((error) => {
      console.error("Error fetching Services data:", error);
    });
    
}, []);
    useEffect(() => {
        if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
            setLanguage(searchParams.get("lang"));
        else {
            window.location.href = '/services?lang=fa';
        }
    },  [searchParams, language]);

    const handleTabClick = (index) => {
        setSelectedTab(index);
    }

    return (
        <>
            {ServicesData.length > 0 && (
                // language == 'fa' &&
                <ServicesContainer>
                    <Navbar />
                    <Main image={background} direction={"rtl"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                         <Tabs>
  <LazyLoad className="lazy" height={100} offset={200}>
    {ServicesData.map((item, index) => (
      <Tab key={item._id} onClick={() => handleTabClick(index)}>
        <TabDetail image={`https://takbon.biz/${item.image}`} />
        <p>{language === 'fa' ? item.title_fa.trim() : item.title_en.trim()}</p>
      </Tab>
    ))}
  </LazyLoad>
</Tabs>
                      <TabContent>
  {ServicesData[selectedTab] && (
    <TabContentContainer $adjust={language === 'fa'}>
      <ProjectTitle
        $adjust={language === 'fa'}
        selected={true}
      >
        {language === 'fa'
          ? ServicesData[selectedTab].title_fa.trim()
          : ServicesData[selectedTab].title_en.trim()}
      </ProjectTitle>

      <ul>
        {(language === 'fa'
          ? ServicesData[selectedTab].items_fa
          : ServicesData[selectedTab].items_en
        ).map((item, idx) => (
          <li key={idx}>{item.trim()}</li>
        ))}
      </ul>
    </TabContentContainer>
  )}
</TabContent>

                        </Content>
                    </Main>
                    <Footer />
                </ServicesContainer>
            )}
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
                                    <TabContentContainer $adjust={language == 'fa'} >
                                        <ProjectTitle $adjust={language == 'fa'} selected={selectedTab == 0} >Troubleshooting</ProjectTitle>
                                        <ul>
                                            <li>Organizational troubleshooting</li>
                                            <li>Financial troubleshooting</li>
                                        </ul>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 1 &&
                                    <TabContentContainer $adjust={language == 'fa'} >
                                        <ProjectTitle $adjust={language == 'fa'} selected={selectedTab == 1} >Modeling and Optimization</ProjectTitle>
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
                                    <TabContentContainer $adjust={language == 'fa'} >
                                        <ProjectTitle $adjust={language == 'fa'} selected={selectedTab == 2} >Process Analysis</ProjectTitle>
                                        <p>
                                            A process is a set of related tasks that transforms inputs into a specific output.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 3 &&
                                    <TabContentContainer $adjust={language == 'fa'} >
                                        <ProjectTitle $adjust={language == 'fa'} selected={selectedTab == 3} >Simulation</ProjectTitle>
                                        <p>
                                            Simulation is the imitation of the operation or performance of a real-world process or system over time.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 4 &&
                                    <TabContentContainer $adjust={language == 'fa'} >
                                        <ProjectTitle $adjust={language == 'fa'} selected={selectedTab == 4} >Education</ProjectTitle>
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
                                    <TabContentContainer $adjust={language == 'fa'} >
                                        <ProjectTitle $adjust={language == 'fa'} selected={selectedTab == 5} >Design and Implementation of Information Systems</ProjectTitle>
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
                                    <TabContentContainer $adjust={language == 'fa'} >
                                        <ProjectTitle $adjust={language == 'fa'} selected={selectedTab == 6} >Data Analysis</ProjectTitle>
                                        <p>
                                            The process of understanding, cleaning, preparing, and analyzing data that is done to extract useful information for decision-making.
                                        </p>
                                    </TabContentContainer>
                                }
                                {
                                    selectedTab == 7 &&
                                    <TabContentContainer $adjust={language == 'fa'} >
                                        <ProjectTitle $adjust={language == 'fa'} selected={selectedTab == 7} >Business Intelligence Reports</ProjectTitle>
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
