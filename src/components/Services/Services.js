"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import LazyLoad, { lazyload } from 'react-lazyload';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.js";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import background from "../../../public/Assests/Services/background.jpg";
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
      <ServicesContainer>
        <Navbar />
        <Main image={background} direction={language === 'fa' ? "rtl" : "ltr"}>
          <Heading>
            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
          </Heading>
          <Content>
            <Tabs>
              <LazyLoad className="lazy" height={100} offset={200}>
                {ServicesData.map((item, index) => (
                  <Tab key={item._id} onClick={() => handleTabClick(index)}>
                    <TabDetail image={`https://takbon.biz/${item.image}`} />
                    <p>
                      {language === 'fa'
                        ? item.title_fa?.trim()
                        : item.title_en?.trim()}
                    </p>
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
                      ? ServicesData[selectedTab].title_fa?.trim()
                      : ServicesData[selectedTab].title_en?.trim()}
                  </ProjectTitle>

                  <ul>
                    {(language === 'fa'
                      ? ServicesData[selectedTab].items_fa
                      : ServicesData[selectedTab].items_en
                    )?.map((item, idx) => (
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
  </>
);

}

export default Services;
