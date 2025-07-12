"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Navbar from "../../app/Navbar/Navbar.js";
import Footer from "../Footer/Footer";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import contact from "../../../public/Assests/Contact/contact.jpg";
import building from "../../../public/Assests/Contact/building.jpeg";
import linkedInLogo from "../../../public/Assests/Contact/linkedin.svg";
import linkedInLogoHover from "../../../public/Assests/Contact/linkedin-hover.svg";
import instagramLogo from "../../../public/Assests/Contact/instagram.svg";
import instagramLogoHover from "../../../public/Assests/Contact/instagram-hover.svg";
import emailLogo from "../../../public/Assests/Contact/email.svg";
import emailLogoHover from "../../../public/Assests/Contact/email-hover.svg";
import {
    ContactContainer,
    Main,
    Heading,
    Logo,
    Content,
    Info,
    CommunicationTitle,
    CommunicationBody,
    CommunicationLinks,
    LinkedIn,
    Instagram,
    Email,
    Pic,
    Location,
    MapSelect
} from "./ContactStyle.js";
import Image from 'next/image';

const Contact = () => {
    const searchParams = useSearchParams();
    const [language, setLanguage] = useState(null);
    const [selectedMap, setSelectedMap] = useState("google");

    useEffect(() => {
        if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
            setLanguage(searchParams.get("lang"));
        else {
            window.location.href = '/contact-us?lang=fa';
        }
    }, [searchParams]);

    return (
        <>
            {
                language == 'fa' &&
                <ContactContainer>
                    <Navbar />
                    <Main image={contact} direction={"rtl"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                            <Info>
                                <CommunicationTitle>تماس  با ما:</CommunicationTitle>
                                <CommunicationBody font={language == 'fa'} >
                                    <div>نشانی:</div>
                                    <p>اصفهان، خیابان سهروردی، ساختمان کاژه، طبقه سه، واحد B، شرکت تاک بن</p>
                                    <div>تلفن:</div>
                                    <p>031-37782005</p>
                                    <p>031-37780350</p>
                                    <div>پست الکترونیک:</div>
                                    <p>Takbon.estekhdam@gmail.com</p>
                                </CommunicationBody>
                                <CommunicationLinks>
                                    <LinkedIn href={"https://www.linkedin.com/company/9397336"} image={linkedInLogo} hover={linkedInLogoHover} target="_blank" />
                                    <Instagram href={"https://www.instagram.com/taakbon/"} image={instagramLogo} hover={instagramLogoHover} target="_blank" />
                                    <Email href={"mailto:Takbon.estekhdam@gmail.com"} image={emailLogo} hover={emailLogoHover} target="_blank" rel="noopener" />
                                </CommunicationLinks>
                            </Info>
                            <Pic>
                                <Image src={building.src} alt={"building"} />
                            </Pic>
                            <Location selected={selectedMap} >
                                <MapSelect>
                                    <div onClick={() => {setSelectedMap("google")}} >مسیریابی از طریق گوگل مپ</div>
                                    <div onClick={() => {setSelectedMap("neshan")}} >مسیریابی از طریق نشان</div>
                                </MapSelect>
                                <iframe
                                    className="google"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210.01231909876776!2d51.6260774!3d32.6275741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc37e7a51fc98d%3A0xfadaf8e7d32de045!2z2LTYsdqp2Kog2YXZh9mG2K_Ys9uMINiz2KfZhdin2YbZh-KAjNmH2KfbjCDZvti02KrbjNio2KfZhiDYqti12YXbjNmFLSDYqtin2qnYqNmG!5e0!3m2!1sen!2s!4v1688906547840!5m2!1sen!2s"
                                ></iframe>
                                <iframe
                                    className="neshan"
                                    src="https://nshn.ir/54_bZaV-pxlfN2"
                                ></iframe>
                            </Location>
                        </Content>
                    </Main>
                    <Footer />
                </ContactContainer>
            }
            {
                language == 'en' &&
                <ContactContainer>
                    <Navbar />
                    <Main image={contact} direction={"ltr"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                            <Info>
                                <CommunicationTitle>Contact Us:</CommunicationTitle>
                                <CommunicationBody font={language == 'fa'} >
                                    <div>Address:</div>
                                    <p>Isfahan, Sohrab Street, Kāže Building, 3rd Floor, Unit B, Takbon Company</p>
                                    <div>Phone:</div>
                                    <p>031-37782005</p>
                                    <p>031-37780350</p>
                                    <div>Email:</div>
                                    <p>Takbon.estekhdam@gmail.com</p>
                                </CommunicationBody>
                                <CommunicationLinks>
                                    <LinkedIn href={"https://www.linkedin.com/company/9397336"} image={linkedInLogo} hover={linkedInLogoHover} target="_blank" />
                                    <Instagram href={"https://www.instagram.com/taakbon/"} image={instagramLogo} hover={instagramLogoHover} target="_blank" />
                                    <Email href={"mailto:Takbon.estekhdam@gmail.com"} image={emailLogo} hover={emailLogoHover} target="_blank" rel="noopener" />
                                </CommunicationLinks>
                            </Info>
                            <Pic>
                                <Image src={building.src} alt={"building"} />
                            </Pic>
                            <Location selected={selectedMap} >
                                <MapSelect>
                                    <div onClick={() => {setSelectedMap("google")}} >Navigation through Google Maps</div>
                                    <div onClick={() => {setSelectedMap("neshan")}} >Navigation through Neshan</div>
                                </MapSelect>
                                <iframe
                                    className="google"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210.01231909876776!2d51.6260774!3d32.6275741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc37e7a51fc98d%3A0xfadaf8e7d32de045!2z2LTYsdqp2Kog2YXZh9mG2K_Ys9uMINiz2KfZhdin2YbZh-KAjNmH2KfbjCDZvti02KrbjNio2KfZhiDYqti12YXbjNmFLSDYqtin2qnYqNmG!5e0!3m2!1sen!2s!4v1688906547840!5m2!1sen!2s"
                                ></iframe>
                                <iframe
                                    className="neshan"
                                    src="https://nshn.ir/54_bZaV-pxlfN2"
                                ></iframe>
                            </Location>
                        </Content>
                    </Main>
                    <Footer />
                </ContactContainer>
            }
        </>
    )
}

export default Contact;