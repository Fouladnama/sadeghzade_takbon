"use client";
import {useState, useEffect} from "react";
import {usePathname, useSearchParams} from "next/navigation.js";
import {Circles} from 'react-loader-spinner';
import axios from "axios";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import logo from "../../../public/Assests/Landing/takbon.gif";
import wallpaper from "../../../public/Assests/News/background2.jpg";
import {
    Loader,
    NewsContainer,
    Main,
    Heading,
    Logo,
    Content,
    Image,
    Date,
    Title,
    Report,
    Text,
    GalleryContainer,
    GalleryImage,
    GalleryTitle,
    LightboxOverlay,
    LightboxContent,
    LightboxImage,
    CloseButton,
    NavigationButton,
    PrevButton,
    NextButton
} from "./NewsStyle.js";

const News = () => {
    const searchParams = useSearchParams();
    const current_path = usePathname();
    const [language, setLanguage] = useState(null);
    const [news, setNews] = useState(null);
    const [newsIndex, setNewsIndex] = useState(null);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

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

    useEffect(() => {
        axios.get('https://takbon.biz:3402/news?page=1&size=3')
            .then(response => {
                setNews(response.data.value);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

  useEffect(() => {
    setNewsIndex(JSON.parse(searchParams.get('data')));

    if (news != null && searchParams.get("data") >= news.length) {
        window.location.href = `/news-archive?lang=${language}`;
    }
}, [searchParams, news, language]);


   useEffect(() => {
    if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
        setLanguage(searchParams.get("lang"));
    else if (typeof window !== "undefined") {
        window.location.href = current_path + "/" + `?lang=fa` + "&data=" + searchParams.get('data');
    }
}, [searchParams, current_path]);

    
    const openLightbox = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    const goToPrev = () => {
        setPhotoIndex((prevIndex) => 
            prevIndex === 0 ? news[newsIndex].gallery.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setPhotoIndex((prevIndex) => 
            prevIndex === news[newsIndex].gallery.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            {
                (news && newsIndex < news.length) &&
                <NewsContainer>
                    <Navbar/>
                    <Main image={wallpaper} direction={"rtl"}>
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logo}/>
                        </Heading>
                        <Content>
                            <Image 
                            src={'https://takbon.biz/' + news[newsIndex].image} 
                            alt={news[newsIndex].title}
                            />
                            <Date>{Persianize_Numbers(parseInt(news[newsIndex].publish.split("/")[2], 10))} {Persian_month[parseInt(news[newsIndex].publish.split("/")[1]) - 1]} {Persianize_Numbers(news[newsIndex].publish.split("/")[0])}</Date>
                            {
                                (news[newsIndex].source != undefined && news[newsIndex].source != '' ) &&
                                <Report>{news[newsIndex].source}:</Report>
                            }
                            <Title>{news[newsIndex].title}</Title>
                            <Text>{news[newsIndex].content}</Text>
                            
                            {news[newsIndex].gallery && news[newsIndex].gallery.length > 0 && (
                                <>
                                    <GalleryContainer>
                                        {news[newsIndex].gallery.map((imageUrl, index) => (
                                            <GalleryImage 
                                                key={index} 
                                                src={'https://takbon.biz/' + imageUrl} 
                                                alt={`Gallery image ${index + 1}`}
                                                onClick={() => openLightbox(index)}
                                            />
                                        ))}
                                    </GalleryContainer>
                                </>
                            )}
                        </Content>
                    </Main>
                    <Footer/>

                    {isOpen && (
                        <LightboxOverlay onClick={closeLightbox}>
                            <LightboxContent onClick={(e) => e.stopPropagation()}>
                                <CloseButton onClick={closeLightbox}>×</CloseButton>
                                <LightboxImage 
                                    src={'https://takbon.biz/' + news[newsIndex].gallery[photoIndex]} 
                                    alt={`Gallery image ${photoIndex + 1}`}
                                />
                                <NavigationButton>
                                    <PrevButton onClick={goToPrev}>&#10094;</PrevButton>
                                    <NextButton onClick={goToNext}>&#10095;</NextButton>
                                </NavigationButton>
                            </LightboxContent>
                        </LightboxOverlay>
                    )}
                </NewsContainer>
            }
            {
                !news &&
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
    )
}

export default News;