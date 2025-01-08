"use client";
import {useState, useEffect} from "react";
import {usePathname, useSearchParams} from 'next/navigation';
import earthIcon from "../../../public/Assests/Navbar/earth.svg";
import earthIconHover from "../../../public/Assests/Navbar/earth-hover.svg";
import linkedInLogo from "../../../public/Assests/Footer/linkedin.svg";
import linkedInLogoHover from "../../../public/Assests/Footer/linkedin-hover.svg";
import instagramLogo from "../../../public/Assests/Footer/instagram.svg";
import instagramLogoHover from "../../../public/Assests/Footer/instagram-hover.svg";
import emailLogo from "../../../public/Assests/Footer/email.svg";
import emailLogoHover from "../../../public/Assests/Footer/email-hover.svg";
import {
    FooterContainer,
    Foot,
    RightSec,
    Overview,
    OverviewTitle,
    OverviewBody,
    Provide,
    ProvideTitle,
    ProvideList,
    ProvideItem,
    LeftSec,
    Ability,
    AbilityTitle,
    AbilityList,
    AbilityItem,
    Communication,
    CommunicationTitle,
    CommunicationBody,
    CommunicationLinks,
    LinkedIn,
    Instagram,
    Email,
    Header,
    RightDiv,
    Icon
} from "./FooterStyle.js";

const Footer = () => {
    const [overviewText, setOverviewText] = useState(`تاكبـن به عنوان یک شرکت دانش بنیان، با تكيه بر تيم فني جوان، خلاق و مجهز به آخريـن روش ها و ابزارهاي تصميم گيري، در زمينه طراحـي انواع سامانه هاي پشتيبان تصميم بويژه سيستم هاي مورد نياز در صنايع فولاد فعاليت مي كند.
عمده فعالیت های این شرکت بر طراحی و توسعه سیستم های پیشرفته برنامه ریزی تولید، مدل های بهینه سازی، شبیه سازی و داده کاوی متمرکز است.`);

    const [overviewTextEN, setOverviewTextEN] = useState(`As a knowledge-based company, relying on a young, creative technical team equipped with the latest decision-making methods and tools, Takben works in the field of designing all kinds of decision support systems, especially the systems needed in the steel industry.
The main activities of this company are focused on the design and development of advanced production planning systems, optimization models, simulation and data mining.`);

    const [communicationBody, setCommunicationBody] = useState([
        <p className="bold">نشانی:</p>,
        <p>اصفهان، خیابان سهروردی، ساختمان کاژه، طبقه سه، واحد B، شرکت تاک بن</p>,
        <p className="bold">تلفن:</p>,
        <p>031-37782005</p>,
        <p>031-37780350</p>
    ]);

    const [communicationBodyEN, setCommunicationBodyEN] = useState([
        <span className="bold">Address:</span>,
        <p>Isfahan, Sohrab Street, Kāže Building, 3rd Floor, Unit B, Takbon Company</p>,
        <p className="bold">Phone:</p>,
        <p>031-37782005</p>,
        <p>031-37780350</p>
    ]);

    const [provideItem, setProvideItem] = useState([
        "عارضه یابی",
        "برنامه ریزی تولید",
        "مهندسی فرایندها",
        "شبیه سازی",
        "آموزش",
        "طراحی و استقرار سیستم های اطلاعاتی"
    ]);

    const [provideItemEN, setProvideItemEN] = useState([
        "Consumption forecasting",
        "Product categorization",
        "Customer data analysis",
        "Customer survey",
        "Demand prediction"
    ]);

    const [abilities, setAbilities] = useState([
        "طراحی و پیاده سازی سیستم های پشتیبان تصمیم",
        "برنامه ریزی و زمان بندی تولید",
        "مديريت زنجيره تأمين و لجستيک",
        "ارائه مدل های شبیه سازی گسسته و عامل بنیان فرایند",
        "ارائه راه حل هاي جامع برنامه ريزي در صنعت فولاد",
        "ارائه مدل های داده کاوی"
    ]);

    const [abilitiesEN, setAbilitiesEN] = useState([
        "Design and implementation of decision support systems",
        "Production planning and scheduling",
        "Supply chain management and logistics",
        "Presentation of discrete event and agent-based simulation models",
        "Providing comprehensive planning solutions in the steel industry",
        "Presentation of data mining models",
    ]);


    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [language, setLanguage] = useState(searchParams.get("lang"));

    function handleReloadPage(event) {
        event.preventDefault();
        if (searchParams.get('data') != null)
            window.location.replace(`${pathname}?lang=${language == "fa" ? "en" : "fa"}&data=${searchParams.get('data')}`);
        else
            window.location.replace(`${pathname}?lang=${language == "fa" ? "en" : "fa"}`);
    };

    useEffect(() => {
        setLanguage(searchParams.get("lang"));
    }, []);

    return (
        <>
            {
                language == 'fa' &&
                <FooterContainer direction={"rtl"}>
                    <Foot>
                        <RightSec>
                            <Overview>
                                <OverviewTitle>در یک نگاه</OverviewTitle>
                                <OverviewBody>
                                    {
                                        overviewText
                                    }
                                </OverviewBody>
                            </Overview>
                            <Provide>
                                <ProvideTitle>خدمات قابل ارائه</ProvideTitle>
                                <ProvideList>
                                    {
                                        provideItem.map((item, index) => {
                                            return (
                                                <ProvideItem letterSpace={language == 'fa'} key={index}>
                                                    <span>{item}</span>
                                                </ProvideItem>
                                            )
                                        })
                                    }
                                </ProvideList>
                            </Provide>
                        </RightSec>
                        <LeftSec>
                            <Ability>
                                <AbilityTitle>توانمندی های شرکت تاک بن</AbilityTitle>
                                <AbilityList>
                                    {
                                        abilities.map((ability, index) => {
                                            return (
                                                <AbilityItem letterSpace={language == 'fa'} key={index}>
                                                    <span>{ability}</span>
                                                </AbilityItem>
                                            )
                                        })
                                    }
                                </AbilityList>
                            </Ability>
                            <Communication>
                                <CommunicationTitle>راه های ارتباطی</CommunicationTitle>
                                <CommunicationBody font={language == 'fa'}>
                                    {
                                        communicationBody.map((item, index) => <span key={index}>{item}</span>)
                                    }
                                </CommunicationBody>
                                <CommunicationLinks>
                                    <LinkedIn href={"https://www.linkedin.com/company/9397336"} image={linkedInLogo} hover={linkedInLogoHover} target="_blank" />
                                    <Instagram href={"https://www.instagram.com/taakbon/"} image={instagramLogo} hover={instagramLogoHover} target="_blank" />
                                    <Email href={"mailto:Takbon.estekhdam@gmail.com"} image={emailLogo} hover={emailLogoHover} target="_blank" rel="noopener" />
                                </CommunicationLinks>
                            </Communication>
                        </LeftSec>
                    </Foot>
                    <Header>
                        <div className="headerContainer">
                            <RightDiv
                                onClick={handleReloadPage}
                                hover={earthIconHover}>
                                <Icon image={earthIcon}/>
                                <div>{language == "fa" ? "EN" : "FA"}</div>
                            </RightDiv>
                        </div>
                    </Header>
                </FooterContainer>
            }
            {
                language == 'en' &&
                <FooterContainer direction={"ltr"}>
                    <Foot>
                        <RightSec>
                            <Overview>
                                <OverviewTitle>At a glance</OverviewTitle>
                                <OverviewBody>
                                    {
                                        overviewTextEN
                                    }
                                </OverviewBody>
                            </Overview>
                            <Provide>
                                <ProvideTitle>Available services</ProvideTitle>
                                <ProvideList>
                                    {
                                        provideItemEN.map((item, index) => {
                                            return (
                                                <ProvideItem letterSpace={language == 'fa'} key={index}>
                                                    <span>{item}</span>
                                                </ProvideItem>
                                            )
                                        })
                                    }
                                </ProvideList>
                            </Provide>
                        </RightSec>
                        <LeftSec>
                            <Ability>
                                <AbilityTitle>The capabilities of Takbon company</AbilityTitle>
                                <AbilityList>
                                    {
                                        abilitiesEN.map((ability, index) => {
                                            return (
                                                <AbilityItem letterSpace={language == 'fa'} key={index}>
                                                    <span>{ability}</span>
                                                </AbilityItem>
                                            )
                                        })
                                    }
                                </AbilityList>
                            </Ability>
                            <Communication>
                                <CommunicationTitle>Communication channels</CommunicationTitle>
                                <CommunicationBody font={language == 'fa'}>
                                    {
                                        communicationBodyEN.map((item, index) => <span key={index}>{item}</span>)
                                    }
                                </CommunicationBody>
                                <CommunicationLinks>
                                    <LinkedIn href={"https://www.linkedin.com/company/9397336"} image={linkedInLogo} hover={linkedInLogoHover} target="_blank" />
                                    <Instagram href={"https://www.instagram.com/taakbon/"} image={instagramLogo} hover={instagramLogoHover} target="_blank" />
                                    <Email href={"mailto:Takbon.estekhdam@gmail.com"} image={emailLogo} hover={emailLogoHover} target="_blank" rel="noopener" />
                                </CommunicationLinks>
                            </Communication>
                        </LeftSec>
                    </Foot>
                    <Header>
                        <div className="headerContainer">
                            <RightDiv
                                onClick={handleReloadPage}
                                hover={earthIconHover}>
                                <Icon image={earthIcon}/>
                                <div>{language == "fa" ? "EN" : "FA"}</div>
                            </RightDiv>
                        </div>
                    </Header>
                </FooterContainer>
            }
        </>
    )
}

export default Footer;
