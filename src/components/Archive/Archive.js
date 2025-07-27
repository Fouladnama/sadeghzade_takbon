"use client";
import {useState, useEffect } from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import {Circles} from 'react-loader-spinner';
import ApiConfig from "../../Api";
import ReactPaginate from 'react-paginate';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.js";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import calendarIcon from "../../../public/Assests/Landing/calendar.svg";
import wallpaper from "../../../public/Assests/News/background2.jpg";
import {
    Loader,
    ArchiveContainer,
    Main,
    Heading,
    Logo,
    Content,
    Title,
    ItemContainer,
    Item,
    Image,
    Date,
    Calendar,
    ItemTitle,
    ArchiveButton
} from "./ArchiveStyle.js";

const Archive = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [language, setLanguage] = useState(null);
    const [pageisChanging, setPageisChanging] = useState(false);

    useEffect(() => {
        if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
            setLanguage(searchParams.get("lang"));
        else if (typeof window !== "undefined") {
            window.location.href = '/news-archive?lang=fa';
        }
    },  [searchParams, language]);

    // pagination
    const [itemOffset, setItemOffset] = useState(0);
    const [news, setNews] = useState(null);
    const endOffset = itemOffset + 6;
    const currentItems = news?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(news?.length / 6);

    const handlePageClick = (event) => {
        setPageisChanging(true);
        const newOffset = (event.selected * 6) % news?.length;
        setItemOffset(newOffset);
        setPageisChanging(false);
    };

useEffect(() => {
    if (!pageisChanging) {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}, [itemOffset, pageisChanging]);

    useEffect(() => {
        ApiConfig.get('https://takbon.biz:3402/news?page=1&size=3')
            .then(response => {
                setNews(response.data.value);
            })
            .catch(error => {
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

    return (
        <>
            {
                news &&
                <ArchiveContainer>
                    <Navbar/>
                    <Main image={wallpaper} direction={"rtl"}>
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif}/>
                        </Heading>
                        <Content direction={language}>
                            <Title direction={language}>{language == 'fa' ? " اخبار شرکت" : "Company News"}</Title>
                            <ItemContainer>
                                {
                                    currentItems.map((item, index) => {
                                        return (
                                            <Item key={index} onClick={() => {
                                                window.location.href = ("/news" + "/" + `?lang=fa` + "&data=" + news.findIndex((newItem) => {
                                                    return newItem.title == item.title
                                                }))
                                            }}>
                                                <Image src={'https://takbon.biz/' + item.image} alt={item.title}/>
                                                <Date>
                                                    <Calendar src={calendarIcon.src} alt={"calendarIcon"}/>
                                                    <p>{Persianize_Numbers(parseInt(item.publish.split("/")[2], 10))} {Persian_month[parseInt(item.publish.split("/")[1]) - 1]} {Persianize_Numbers(item.publish.split("/")[0])}</p>
                                                </Date>
                                                <ItemTitle>{item.title}</ItemTitle>
                                                <ArchiveButton>ادامه مطلب</ArchiveButton>
                                            </Item>
                                        );
                                    })
                                }
                            </ItemContainer>
                            <ReactPaginate
                                className="Paginate"
                                breakLabel="..."
                                nextLabel={language == 'fa' ? "بعدی" : "Next"}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                pageCount={pageCount}
                                previousLabel={language == 'fa' ? "قبلی" : "Prev"}
                                renderOnZeroPageCount={null}
                                activeClassName={'active'}
                                pageClassName={"page"}
                                disabledClassName={'disabled-page'}
                                marginPagesDisplayed={2}
                                nextClassName={"next"}
                                previousClassName={"previous"}
                            />
                        </Content>
                    </Main>
                    <Footer/>
                </ArchiveContainer>
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
    );
}

export default Archive;
