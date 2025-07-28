"use client";
import {useEffect, useState, useRef} from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import {TypeAnimation} from "react-type-animation";
import {Circles} from 'react-loader-spinner';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";
import Footer from "../Footer/Footer.js";
import Navbar from "../Navbar/Navbar.js";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import hero from "../../../public/Assests/Landing/hero_text.svg";
import decision from "../../../public/Assests/Landing/arrow.jpg";
import rocket from "../../../public/Assests/Landing/rocket.svg";
import graduation_cap from "../../../public/Assests/Landing/graduation_cap.svg";
import random from "../../../public/Assests/Landing/random.svg";
import descriptionImage from "../../../public/Assests/Landing/decision03.jpg";
import starIcon from "../../../public/Assests/Landing/star.svg";
import chainImage from "../../../public/Assests/Landing/scm.jpg";
import calendarIcon from "../../../public/Assests/Landing/calendar.svg";
import {
    Loader,
    LandingContainer,
    Main,
    Heading,
    LogoContainer,
    Logo,
    Video,
    HeroImage,
    Typewriter,
    NewsMag,
    NewsTitle,
    NewsSection,
    RightSec,
    LeftSec,
    NewsItem,
    Image,
    Text,
    Date,
    Calendar,
    ArchiveButton,
    News,
    NewsImage,
    NewsText,
    ModalButton,
    DecisionImage,
    DecisionText,
    DecisionImageEN,
    DecisionTextEN,
    Properties,
    Property,
    PropertyTitleContainer,
    PropertyIcon,
    PropertyTitle,
    PropertyText,
    PropertyDescription,
    DescriptionImage,
    ImageText,
    DescriptionText,
    DescriptionTitle,
    DescriptionPart,
    DescriptionItem,
    Chain,
    ChainImage,
    ChainText,
    ChainTitle,
    ChainPart,
    ChainItem,
    Trust,
    TrustTitle,
    TrustLogos,
    TrustLogo,
    ExceptionLogo
} from "./LandingStyle.js";

const LandingPage = () => {
    // Trust:
    const [settings, setSettings] = useState({
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 0,
        pauseOnHover: true,
        pauseOnFocus: true,
        focusOnSelect: true,
        accessibility: false,
        cssEase: "linear"
    });
    useEffect(() => {
        const slidesToShow = window.innerWidth > 1000 ? 4 : window.innerWidth > 500 ? 2 : 1;

        setSettings({
            ...settings,
            slidesToShow: slidesToShow
        });
    }, []);
    // news:
    const [sliderData, setSliderData] = useState(null);
    const [selectedNews, setSelectedNews] = useState(0);
    const [companydata, setCompanyData] = useState([]);

    useEffect(() => {
        axios.get('https://takbon.biz:3402/news?page=1&size=3')
            .then(response => {
                setSliderData(response.data.value);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios.get("https://takbon.biz:3402/company")
            .then((response) => {
                setCompanyData(response.data.value || []);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const Persianize_Numbers = (str) => {
        str = str.toString();
        let persianized = "";
        for (let i = 0; i < str.length; i++) {
            switch (str[i]) {
                case "0":
                    persianized += "۰";
                    break;
                case "1":
                    persianized += "۱";
                    break;
                case "2":
                    persianized += "۲";
                    break;
                case "3":
                    persianized += "۳";
                    break;
                case "4":
                    persianized += "۴";
                    break;
                case "5":
                    persianized += "۵";
                    break;
                case "6":
                    persianized += "۶";
                    break;
                case "7":
                    persianized += "۷";
                    break;
                case "8":
                    persianized += "۸";
                    break;
                case "9":
                    persianized += "۹";
                    break;
                default:
                    persianized += str[i];
                    break;
            }
        }
        return persianized;
    }

    const Persian_month = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند"
    ];

    // retrieve language
    const searchParams = useSearchParams();
    const router = useRouter();
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (searchParams.get("lang") === "fa" || searchParams.get("lang") === "en") {
                setLanguage(searchParams.get("lang"));
            } else {
                window.location.href = '/landing?lang=fa';
            }
        }
    }, [searchParams]);

    // for decision image animation
    const [isIntersecting, setIsIntersecting] = useState(false);
    const decisionRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && language != null && sliderData != null) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    setIsIntersecting(entry.isIntersecting);
                },
                {rootMargin: window.innerWidth < 650 ? "-50px" : "-300px"}
            );
            observer.observe(decisionRef.current);
            return () => observer.disconnect();
        }
    }, [language, sliderData]);

    useEffect(() => {
        if (typeof window !== "undefined" && language != null && sliderData != null) {
            if (isIntersecting) {
                decisionRef.current.querySelectorAll(".choice").forEach((el) => {
                    el.classList.add("slide-in");
                });
            } else {
                decisionRef.current.querySelectorAll(".choice").forEach((el) => {
                    el.classList.remove("slide-in");
                });
            }
        }
    }, [isIntersecting, language, sliderData]);


    // for property animation
    const [isPropertyIntersecting, setIsPropertyIntersecting] = useState(false);
    const propertyRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && language != null && sliderData != null) {
            const observer = new IntersectionObserver(([entry]) => {
                    setIsPropertyIntersecting(entry.isIntersecting);
                },
                {rootMargin: window.innerWidth < 450 ? "-50px" : "-200px"}
            );
            observer.observe(propertyRef.current);
            return () => observer.disconnect();
        }
    }, [language, sliderData]);

    useEffect(() => {
        if (language != null && sliderData != null) {
            if (isPropertyIntersecting) {
                propertyRef.current.querySelectorAll(".random").forEach((el) => {
                    el.classList.add("slide-left");
                });
                propertyRef.current.querySelectorAll(".rocket").forEach((el) => {
                    el.classList.add("slide-in");
                });
                propertyRef.current.querySelectorAll(".graduation").forEach((el) => {
                    el.classList.add("slide-right");
                });
            } else {
                propertyRef.current.querySelectorAll(".random").forEach((el) => {
                    el.classList.remove("slide-left");
                });
                propertyRef.current.querySelectorAll(".rocket").forEach((el) => {
                    el.classList.remove("slide-in");
                });
                propertyRef.current.querySelectorAll(".graduation").forEach((el) => {
                    el.classList.remove("slide-right");
                });
            }
        }
    }, [isPropertyIntersecting, language, sliderData]);


    // for description animation
    const [isDescriptionIntersecting, setIsDescriptionIntersecting] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined", language != null && sliderData != null) {
            const observer = new IntersectionObserver(([entry]) => {
                    setIsDescriptionIntersecting(entry.isIntersecting);
                },
                {rootMargin: window.innerWidth < 450 ? "-50px" : "-200px"}
            );
            observer.observe(descriptionRef.current);
            return () => observer.disconnect();
        }
    }, [language, sliderData]);

    useEffect(() => {
        if (language != null && sliderData != null) {
            if (isDescriptionIntersecting) {
                descriptionRef.current.querySelectorAll(".image").forEach((el) => {
                    el.classList.add("slide-left");
                });
                descriptionRef.current.querySelectorAll(".text").forEach((el) => {
                    el.classList.add("slide-right");
                });
            } else {
                descriptionRef.current.querySelectorAll(".image").forEach((el) => {
                    el.classList.remove("slide-left");
                });
                descriptionRef.current.querySelectorAll(".text").forEach((el) => {
                    el.classList.remove("slide-right");
                });
            }
        }
    }, [isDescriptionIntersecting, language, sliderData]);


    // for description animation
    const [isChainIntersecting, setIsChainIntersecting] = useState(false);
    const chainRef = useRef(null);

    useEffect(() => {
        if (language != null && sliderData != null) {
            const observer = new IntersectionObserver(([entry]) => {
                    setIsChainIntersecting(entry.isIntersecting);
                },
                {rootMargin: "-100px"});
            observer.observe(chainRef.current);
            return () => observer.disconnect();
        }
    }, [language, sliderData]);

    useEffect(() => {
        if (language != null && sliderData != null) {
            if (isChainIntersecting) {
                chainRef.current.querySelectorAll(".text").forEach((el) => {
                    el.classList.add("slide-left");
                });
                chainRef.current.querySelectorAll(".image").forEach((el) => {
                    el.classList.add("slide-right");
                });
            } else {
                chainRef.current.querySelectorAll(".text").forEach((el) => {
                    el.classList.remove("slide-left");
                });
                chainRef.current.querySelectorAll(".image").forEach((el) => {
                    el.classList.remove("slide-right");
                });
            }
        }
    }, [isChainIntersecting, language, sliderData]);


    return (
        <>
            {
                sliderData &&
                <>
                    {
                        language == 'fa' &&
                        <LandingContainer>
                            <Navbar/>
                            <Main direction={"rtl"}>
                                <LogoContainer>
                                    <Logo href={`/landing?lang=${language}`} hover={logoGif}/>
                                </LogoContainer>
                                <Heading>
                                    <Video autoPlay loop muted>
                                        <source src={"/Assests/Landing/computer.mp4"} type="video/mp4"/>
                                    </Video>
                                    <div className="hero">
                                        <HeroImage image={hero}/>
                                    </div>
                                </Heading>

                                <Typewriter letterSpace={language == 'fa'}>
                                    <TypeAnimation
                                        cursor={false}
                                        className="typewriter"
                                        preRenderFirstString={false}
                                        sequence={[
                                            500,
                                            'شرکت مهندسی سامانه های پشتیبان تصمیم، تاک بن',
                                            2000,
                                            ''
                                        ]}
                                        speed={10}
                                        repeat={Infinity}
                                    />
                                </Typewriter>

                                {
                                    (sliderData.length > 0) &&
                                    <NewsMag>
                                        <NewsTitle>آخرین اخبار شرکت</NewsTitle>
                                        <NewsSection>
                                            <RightSec className='newsSection'>
                                                <News>
                                                    <NewsImage
                                                        src={'https://takbon.biz/' + sliderData[selectedNews].image}
                                                        alt={sliderData[selectedNews].title}/>
                                                    <NewsText>
                                                        <p>
                                                            <Calendar src={calendarIcon.src} alt={"calendarIcon"}/>
                                                            {Persianize_Numbers(sliderData[selectedNews].publish.split("/")[2])} {Persian_month[parseInt(sliderData[selectedNews].publish.split("/")[1]) - 1]} {Persianize_Numbers(sliderData[selectedNews].publish.split("/")[0])}
                                                        </p>
                                                        <h3>{sliderData[selectedNews].title}</h3>
                                                        <div>
                                                            <ModalButton onClick={() => {
                                                                router.push("/news" + "/" + `?lang=fa` + "&data=0")
                                                            }}>ادامه مطلب</ModalButton>
                                                        </div>
                                                    </NewsText>
                                                </News>
                                            </RightSec>
                                            <LeftSec>
                                                <div className='newsLeft'>
                                                    {
                                                        sliderData.slice(0, 6).map((slide, index) => {
                                                            return (
                                                                <NewsItem onClick={() => {
                                                                    router.push("/news" + "/" + `?lang=fa` + "&data=" + index)
                                                                }} key={index}>
                                                                    <Image src={'https://takbon.biz/' + slide.image}
                                                                           alt={slide.title}/>
                                                                    <Text>
                                                                        <h3>{slide.title}</h3>
                                                                        <Date>
                                                                            <Calendar src={calendarIcon.src}
                                                                                      alt={"calendarIcon"}/>
                                                                            <p>{Persianize_Numbers(parseInt(slide.publish.split("/")[2], 10))} {Persian_month[parseInt(slide.publish.split("/")[1]) - 1]} {Persianize_Numbers(slide.publish.split("/")[0])}</p>
                                                                        </Date>
                                                                    </Text>
                                                                </NewsItem>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <ArchiveButton onClick={() => {
                                                    router.push("/news-archive" + "/" + `?lang=${language}`)
                                                }}>آرشیو اخبار</ArchiveButton>
                                            </LeftSec>
                                        </NewsSection>
                                    </NewsMag>
                                }

                                <DecisionImage ref={decisionRef} image={decision}>
                                    <DecisionText className="choice">
                                        تصميم گيری دقيق، سريع، بهينه
                                    </DecisionText>
                                </DecisionImage>

                                <Properties ref={propertyRef}>
                                    <Property className="graduation">
                                        <PropertyIcon image={graduation_cap}/>
                                        <PropertyTitleContainer>
                                            <PropertyTitle adjust={language == 'fa'}>
                                                ارتباط با فضای آکادمیک
                                            </PropertyTitle>
                                            <PropertyText adjust={language == 'fa'}>
                                                <div>استفاده از فارغ التحصیلان دانشگاه های معتبر کشور در مقاطع تحصیلات
                                                    تکمیلی
                                                </div>
                                                <div>بهره گیری از برجسته ترین اساتید و مشاوران دانشکاهی در داخل و خارج
                                                    از کشور
                                                </div>
                                            </PropertyText>
                                        </PropertyTitleContainer>
                                    </Property>
                                    <Property className="rocket">
                                        <PropertyIcon image={rocket}/>
                                        <PropertyTitleContainer>
                                            <PropertyTitle adjust={language == 'fa'}>
                                                فناوری های جدید
                                            </PropertyTitle>
                                            <PropertyText adjust={language == 'fa'}>
                                                مجهز به آخرين روش ها، فناوری ها و بروز ترین ابزارهاي تصميم گيري
                                            </PropertyText>
                                        </PropertyTitleContainer>
                                    </Property>
                                    <Property className="random">
                                        <PropertyIcon image={random}/>
                                        <PropertyTitleContainer>
                                            <PropertyTitle adjust={language == 'fa'}>
                                                سامانه های پشتیبان تصمیم
                                            </PropertyTitle>
                                            <PropertyText adjust={language == 'fa'}>
                                                طراحي و مدل سازي انواع سامانه هاي پشتيبان تصميم به ويژه سيستم هاي مورد
                                                نياز در صنايع بزرگ
                                            </PropertyText>
                                        </PropertyTitleContainer>
                                    </Property>
                                </Properties>

                                <PropertyDescription ref={descriptionRef}>
                                    <DescriptionText className="text">
                                        <DescriptionTitle image={starIcon}>
                                            <div/>
                                            <div>ویژگی های سیستم های پشتیبان تصمیم :</div>
                                        </DescriptionTitle>
                                        <DescriptionPart>
                                            <DescriptionItem letterSpace={language == 'fa'}><span>يك سيستم بر پايه كامپيوتر است كه از تكنولوژي ها و متدولوژي هاي كامپيوتري استفاده مي كند.</span></DescriptionItem>
                                            <DescriptionItem letterSpace={language == 'fa'}><span>به تصميم گيري كمك مي كند ولي جايگزين فرد تصميم گير نمي شود.</span></DescriptionItem>
                                            <DescriptionItem letterSpace={language == 'fa'}><span>از پايگاه هاي داده، مدل هاي تحليلي و محاسباتي، سيستم هاي خبره و الگوريتم هاي بهينه يابي درحل مسائل استفاده مي كند.</span></DescriptionItem>
                                            <DescriptionItem letterSpace={language == 'fa'}><span>قابليت پشتيباني از تصميم گيري هاي فردي و گروهي را دارد.</span></DescriptionItem>
                                            <DescriptionItem letterSpace={language == 'fa'}><span>براي كليه سطوح مديريتي قابل استفاده است.</span></DescriptionItem>
                                            <DescriptionItem letterSpace={language == 'fa'}><span>دقت، سرعت و كيفيت تصميم گيري را بهبود مي بخشد.</span></DescriptionItem>
                                        </DescriptionPart>
                                    </DescriptionText>
                                    <DescriptionImage adjust={language == 'fa'} className="image"
                                                      image={descriptionImage}>
                                        <ImageText>
                                            <div>Enjoy your decisions</div>
                                            <div>We offer our decision support system (DSS) Services</div>
                                        </ImageText>
                                    </DescriptionImage>
                                </PropertyDescription>

                                <Chain ref={chainRef}>
                                    <ChainImage className="image" image={chainImage}/>
                                    <ChainText className="text">
                                        <ChainTitle image={starIcon}>
                                            <div/>
                                            <div>ویژگی های زنجیره تامین دیجیتال :</div>
                                        </ChainTitle>
                                        <ChainPart>
                                            <ChainItem letterSpace={language == 'fa'}><span>ابزاری:</span> اطلاعات موجود
                                                در زنجیره تامین نسل بعدی به طور عمده توسط ماشین تولید می‌شوند، به عنوان
                                                مثال توسط سنسورها، تگ‌های RFID، کنتورها و بسیاری دیگر.</ChainItem>
                                            <ChainItem letterSpace={language == 'fa'}><span>پیوستگی:</span> کل زنجیره
                                                تامین، شامل نهادها و دارایی‌هایی کسب‌و‌کار، سیستمهای IT، محصولات و سایر
                                                اشیا هوشمند همه در یک زنجیره تأمین هوشمند به هم متصل
                                                شده‌اند.</ChainItem>
                                            <ChainItem letterSpace={language == 'fa'}><span>هوشمند:</span> زنجیره‌های
                                                تامین هوشمند برای بهینه‌سازی عملکرد، تصمیمات بهینه در مقیاس بزرگ را
                                                اتخاذ می‌کنند.</ChainItem>
                                            <ChainItem letterSpace={language == 'fa'}><span>اتوماسیون:</span> زنجیره‌های
                                                تامین هوشمند با استفاده از ماشین‌آلات به عنوان جایگزین سایر منابع کم
                                                بازده از جمله نیروی کار، بیشتر فرآیندهای خود را به صورت خودکار انجام
                                                می‌دهند.</ChainItem>
                                            <ChainItem letterSpace={language == 'fa'}><span>یکپارچگی:</span> یکپارچگی
                                                فرآیندهای زنجیره تامین شامل همکاری در مراحل زنجیره تامین، تصمیم‌گیری‌های
                                                مشترک، سیستم‌های مشترک و به اشتراک‌گذاری اطلاعات است.</ChainItem>
                                            <ChainItem letterSpace={language == 'fa'}><span>نوآورانی:</span> نوآوری
                                                عبارت است از توسعه ارزش‌های جدید از طریق راه حل‌هایی که نیازهای جدید،
                                                نیازهای بزرگ و یا حتی نیازهای موجود را از راه‌های بهتر تأمین
                                                می‌کنند.</ChainItem>
                                        </ChainPart>
                                    </ChainText>
                                </Chain>
   <Trust>
            <TrustTitle>شرکت‌هایی که به تاک‌بن اعتماد کرده‌اند</TrustTitle>

            {companydata.length > 0 && (
                <TrustLogos>
                    <Slider {...settings}>
                        {companydata.map((item, index) => {
                            const imageUrl = item.image
                                ? item.image.startsWith("http")
                                    ? item.image
                                    : `https://takbon.biz/images/${item.image.replace(/^images\//, "")}`
                                : "/fallback-image.jpg";

                            // اگر بخوای مثلاً هر تصویر خاص با ExceptionLogo بیاد:
                            const isException = item.title.includes("هرمزگان");

                            return isException ? (
                                <ExceptionLogo key={index} src={imageUrl} alt={item.title} title={item.title} />
                            ) : (
                                <TrustLogo key={index} src={imageUrl} alt={item.title} title={item.title} />
                            );
                        })}
                    </Slider>
                </TrustLogos>
            )}
        </Trust>
                            </Main>
                            <Footer/>
                        </LandingContainer>
                    }
                  
                </>
            }
            {
                !sliderData &&
                <Loader>
                    <Circles
                        height="80"
                        width="80"
                        color="#0089DE"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </Loader>
            }
        </>
    );
}

export default LandingPage;