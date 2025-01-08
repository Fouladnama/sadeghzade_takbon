"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from 'next/navigation';
import Link from "next/link.js";
import earthIcon from "../../../public/Assests/404/earth.svg";
import {
    NotFoundContainer,
    Header,
    RightDiv,
    Icon
} from "./404Style.js";

const NotFound = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [language, setLanguage] = useState(null);

    function handleReloadPage(event) {
        event.preventDefault();
        window.location.replace(`${pathname}?lang=${language === "fa" ? "en" : "fa"}`);
    };

    useEffect(() => {
        if (searchParams.get("lang") === "fa" || searchParams.get("lang") === "en")
            setLanguage(searchParams.get("lang"));
        else {
            setLanguage("fa");
        }
    }, []);

    return (
        <>
            {
                language === 'en' &&
                <NotFoundContainer language={language} >
                    <div class="flex-container">
                        <div class="text-center">
                            <h1>
                                <span class="fade-in" id="digit1">4</span>
                                <span class="fade-in" id="digit2">0</span>
                                <span class="fade-in" id="digit3">4</span>
                            </h1>
                            <h3 class="fadeIn">PAGE NOT FOUND</h3>
                            <Link href={`landing/?lang=${language}`} ><button type="button" name="button">Return To Home</button></Link>
                        </div>
                    </div>
                    <Header>
                        <div className="headerContainer" >
                            <RightDiv onClick={handleReloadPage} >
                                <Icon image={earthIcon} />
                                <div>{language == "fa" ? "EN" : "FA"}</div>
                            </RightDiv>
                        </div>
                    </Header>
                </NotFoundContainer>
            }
            {
                language === 'fa' &&
                <NotFoundContainer language={language} >
                    <div class="flex-container">
                        <div class="text-center">
                            <h1>
                                <span class="fade-in" id="digit1">4</span>
                                <span class="fade-in" id="digit2">0</span>
                                <span class="fade-in" id="digit3">4</span>
                            </h1>
                            <h3 class="fadeIn">صفحه مورد نظر یافت نشد</h3>
                            <Link href={`landing/?lang=${language}`} ><button type="button" name="button">بازگشت به صفحه اصلی</button></Link>
                        </div>
                    </div>
                    <Header>
                        <div className="headerContainer" >
                            <RightDiv onClick={handleReloadPage} >
                                <Icon image={earthIcon} />
                                <div>{language === "fa" ? "EN" : "FA"}</div>
                            </RightDiv>
                        </div>
                    </Header>
                </NotFoundContainer>
            }
        </>
    );
}

export default NotFound;