"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import earthIcon from "../../../public/Assests/Navbar/earth-nav.svg";
import earthIconHover from "../../../public/Assests/Navbar/earth-hover-nav.svg";
import {
    Nav,
    NavItem,
    NavLink,
    PhoneNav,
    Burger,
    Menu,
    MenuItems,
    MenuItem,
    MenuLink,
    LanguageSection,
    Lang,
    Icon
} from "./NavbarStyle";

const Navbar = () => {
    const [showPhoneNav, setShowPhoneNav] = useState(false);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [language, setLanguage] = useState(searchParams.get("lang"));

    useEffect(() => {
        setLanguage(searchParams.get("lang"));
    }, []);

    const handleShowPhoneNav = () => {
        setShowPhoneNav(!showPhoneNav);

        document.querySelectorAll(".strip").forEach((item) => {
            item.classList.toggle("active");
        });
    }

    function handleReloadPage(event) {
        event.preventDefault();
        if (searchParams.get('data') != null)
            window.location.replace(`${pathname}?lang=${language == "fa" ? "en" : "fa"}&data=${searchParams.get('data')}`);
        else
            window.location.replace(`${pathname}?lang=${language == "fa" ? "en" : "fa"}`);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition >= 0 && !isNavbarFixed)
                setIsNavbarFixed(true);
            else if (scrollPosition < 0 && isNavbarFixed)
                setIsNavbarFixed(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleScrollTop = () => {
            const scrollPosition = window.scrollY;
        
            if (scrollPosition === 0 && isNavbarFixed) {
                setIsNavbarFixed(false);
            }
        };
    
        window.addEventListener('scroll', handleScrollTop);
    
        return () => {
            window.removeEventListener('scroll', handleScrollTop);
        };
    }, [isNavbarFixed]);

    return (
        <>
            {
                language == 'fa' &&
                <>
                    <LanguageSection display={isNavbarFixed} direction={"rtl"} >
                        <div className="headerContainer">
                            <Lang
                                onClick={handleReloadPage}
                                hover={earthIconHover} >
                                <Icon image={earthIcon}/>
                                <div>{language == "fa" ? "EN" : "FA"}</div>
                            </Lang>
                        </div>
                    </LanguageSection>
                    <Nav>
                        <NavItem adjust={language == 'fa'} href={`/landing/?lang=${language}`} >
                            <NavLink>خانه</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/services/?lang=${language}`} >
                            <NavLink>خدمات قابل ارائه</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/projects/?lang=${language}`} >
                            <NavLink>لیست پروژه ها</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/news-archive/?lang=${language}`} >
                            <NavLink>اخبار شرکت</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/about-us/?lang=${language}`} >
                            <NavLink>درباره ما</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/contact-us/?lang=${language}`} >
                            <NavLink>تماس با ما</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/collaboration/?lang=${language}`} >
                            <NavLink>همکاری با ما</NavLink>
                        </NavItem>
                    </Nav>
                    <PhoneNav>
                        <Burger>
                            <div className="strip" onClick={handleShowPhoneNav} >
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </Burger>
                        <Menu isopen={showPhoneNav.toString()} >
                            <MenuItems>
                                <MenuItem href={`/landing/?lang=${language}`} >
                                    <MenuLink>خانه</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/services/?lang=${language}`} >
                                    <MenuLink>خدمات قابل ارائه</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/projects/?lang=${language}`} >
                                    <MenuLink>لیست پروژه ها</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/news-archive/?lang=${language}`} >
                                    <MenuLink>اخبار شرکت</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/about-us/?lang=${language}`} >
                                    <MenuLink>درباره ما</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/contact-us/?lang=${language}`} >
                                    <MenuLink>تماس با ما</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/collaboration/?lang=${language}`} >
                                    <MenuLink>همکاری با ما</MenuLink>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </PhoneNav>
                </>
            }
            {
                language == 'en' &&
                <>
                    <LanguageSection display={isNavbarFixed} direction={"ltr"} >
                        <div className="headerContainer">
                            <Lang
                                onClick={handleReloadPage}
                                hover={earthIconHover} >
                                <Icon image={earthIcon}/>
                                <div>{language == "fa" ? "EN" : "FA"}</div>
                            </Lang>
                        </div>
                    </LanguageSection>
                    <Nav>
                        <NavItem adjust={language == 'fa'} href={`/about-us/?lang=${language}`} >
                            <NavLink>About Us</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/contact-us/?lang=${language}`} >
                            <NavLink>Contact Us</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/collaboration/?lang=${language}`} >
                            <NavLink>Collaboration</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/news-archive/?lang=${language}`} >
                            <NavLink>News</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/projects/?lang=${language}`} >
                            <NavLink>Projects</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/services/?lang=${language}`} >
                            <NavLink>Services</NavLink>
                        </NavItem>
                        <NavItem adjust={language == 'fa'} href={`/landing/?lang=${language}`} >
                            <NavLink>Home</NavLink>
                        </NavItem>
                    </Nav>
                    <PhoneNav>
                        <Burger>
                            <div className="strip" onClick={handleShowPhoneNav} >
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </Burger>
                        <Menu isopen={showPhoneNav.toString()} >
                            <MenuItems>
                                <MenuItem href={`/landing/?lang=${language}`} >
                                    <MenuLink>Home</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/services/?lang=${language}`} >
                                    <MenuLink>Services</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/projects/?lang=${language}`} >
                                    <MenuLink>Projects</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/news-archive/?lang=${language}`} >
                                    <MenuLink>News</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/collaboration/?lang=${language}`} >
                                    <MenuLink>Collaboration</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/contact-us/?lang=${language}`} >
                                    <MenuLink>Contact Us</MenuLink>
                                </MenuItem>
                                <MenuItem href={`/about-us/?lang=${language}`} >
                                    <MenuLink>About Us</MenuLink>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </PhoneNav>
                </>
            }
        </>
    );
}

export default Navbar;