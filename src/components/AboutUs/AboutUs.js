"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link.js";
import Navbar from "../../app/Navbar/Navbar";
import Footer from "../Footer/Footer.js";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import building from "../../../public/Assests/Contact/building.jpeg";
import building2 from "../../../public/Assests/Contact/building.jpeg";
import {
    AboutUsContainer,
    Main,
    Heading,
    Logo,
    Content,
    RightDiv,
    Intro,
    History,
    LeftDiv,
    Pic,
    Decision,
    Staff
} from "./AboutUsStyle.js";
import Image from 'next/image';

const AboutUs = () => {
    const searchParams = useSearchParams();
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
            setLanguage(searchParams.get("lang"));
        else {
            window.location.href = '/about-us?lang=fa';
        }
    }, [searchParams]);

    return (
        <>
            {
                language == 'fa' &&
                <AboutUsContainer>
                    <Navbar />
                    <Main image={building2} direction={"rtl"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                            <RightDiv>
                                <Intro>
                                    <div className="title">مقدمه :</div>
                                    <div>امروزه دنياي مديريت با انبوهي از مباحث و واژه هاي مرتبط با تصميم گيري مواجه است. عمل تصميم گيري در اداره امور سازمان ها به قدري مهم است که برخي نويسندگان، سازمان را "شبکه تصميم ها" و مديريت را عمل "تصميم گيري" تعريف کرده اند. از طرفي پيچيدگي فزاينده دنياي كسب و كار، هزينه هاي بالاي عمليات و وسعت تشکيلات سازماني، ريسك اتخاذ تصميمات غلط يا حتي غيربهينه را به شدت بالا برده است.</div>
                                    <div>در دنياي امروز سازمان ها بخوبي دريافته اند كه در تصميم گيري ها، ديگر نمي توانند صرفاً بر نبوغ و قضاوت شخصي افراد متکي باشند، بلکه تصميمات بايستي حتي الامکان بر پايه بررسي هاي علمي، آمار و اطلاعات دقيق و به موقع، و نيز بر طبق اصول و روش هاي مستدل صورت پذيرد.
                                        در اين شرايط آنچه مديران بيش از هر چيز به آن نيازمندند،
                                    </div>
                                    <div>
                                        <div className="highlight">ابزارهايي راحت،</div>
                                        <div className="highlight">مطمئن</div>
                                        <div className="highlight">و مبتني بر اصول علمی</div>
                                        براي ياري آنان در اتخاذ تصميماتي است که بعضاً به صورت پيوسته و بعضاً به صورت مقطعي با آن ها مواجه مي شوند.
                                    </div>
                                </Intro>
                                <History>
                                    <div className="title">حیات تاک بُن:</div>
                                    <div>در راستاي پاسخگويي به اين نياز روزافزون، هسته اوليه <span className="highlight">شرکت مهندسي سامانه هاي پشتيبان تصميم- تاک بُن</span> در مرداد ماه سال <span className="number">1387</span> در قالب انجام پروژه هايي با موضوع برنامه ريزي و زمان-بندي توليد در صنعت فولاد شکل گرفت.</div>
                                    <div>در تير ماه <span className="number">1388</span> اين تيم با ترکيب کامل تري بعنوان يک هسته تحقيقاتي در شهرک علمي تحقيقاتي اصفهان آغاز به کار کرد.</div>
                                    <div>در سال <span className="number">1389</span> شرکت به ثبت رسيد و پس از آن دوره هاي رشد و پارک علم و فناوري را نيز در اين شهرک با موفقيت سپري نمود. در اين مدت شرکت تاک بُن موفق شد پروژه هاي مختلفي را در زمينه طراحي و توسعه سيستم هاي پشتيبان تصميم در ابعاد بزرگ سازماني، بويژه در صنعت فولاد کشور به انجام رساند.  </div>
                                    <div>با انجام اين پروژه ها شرکت تاک بُن توانسته است تسلط مطلوبي بر روي <span className="highlight">فرايندهاي صنعت فولاد و سيستم هاي اطلاعاتي متناظر آن ها</span> داشته باشد.</div>
                                    <div>تجميع اين دانش ها کمک نموده تا کارشناسان اين شرکت توانايي مناسبي در ارائه خدمات مناسب به صنعت فولاد و به طور خاص فولاد مبارکه داشته باشند.</div>
                                </History>
                            </RightDiv>
                            <LeftDiv>
                                <Pic>
                                    <Image  src={building.src} alt={"building"} />
                                </Pic>
                                <Decision>
                                    <div className="title">سیستم های پشتیبان تصمیم</div>
                                    <div>پيچيدگي مسائل تصميم گيري به ويژه زماني كه بايد، حجم بالايي از اطلاعات مورد پردازش و تحليل قرار گيرند، عرصه مناسبي را براي ورود كامپيوتر به مقوله تصميم گيري فراهم نموده است.</div>
                                    <div>به طوريكه در دو دهه اخير مقوله:</div>
                                    <div className="highlight" >" تصميم گيري به كمك كامپيوتر "</div>
                                    <div>در قالب توسعه:</div>
                                    <div className="highlight" >" سيستم هاي پشتيبان تصميم "</div>
                                    <div>رشد خيره كننده اي را نشان داده است. كامپيوترها با سرعت بالاي خود مي توانند فعاليت هاي ذهني بشر را به كمك خود او، شبيه سازي كرده و از آنجا كه از خطاهاي عددي مبرا هستند، سرعت و كيفيت تصميمات را به طور قابل توجهي افزايش مي دهند.</div>
                                </Decision>
                                <Staff>
                                    <div className="title">تیم فنی و سرمایه های انسانی:</div>
                                    <div>شرکت تاک بُن هم اکنون با تکيه بر <span className="highlight" >تيم فني جوان، خلاق و مجهز به آخرين روش ها و ابزارهاي تصميم گيري،</span> که عمدتاً متشکل از فارغ التحصيلان رشته مهندسي صنايع در مقاطع تحصيلات تکميلي و از بهترين دانشگاه هاي کشور هستند، و همچنین با بهره گیری <span className="highlight" >از اساتید و مشاوران صاحب نظر</span> در داخل و خارج از ایران در زمينه <span className="highlight" >طراحي و مدل سازي انواع سامانه هاي پشتيبان تصميم</span> به ويژه سيستم هاي مورد نياز در صنايع بزرگ فعاليت مي کند.</div>
                                    <div>اين شرکت در راستاي توسعه سيستم ها همکاري گسترده اي با <Link href={"https://www.irisaco.com/fa"} target="_blank" className="highlight2" >شرکت بين المللي مهندسي سيستم ها و اتوماسيون (ايريسا)</Link> دارد. تلفيق دانش و تجربه شرکت ايريسا در زمينه توسعه سيستم هاي اطلاعاتي جامع و يکپارچه و دانش و توانمندي شرکت تاکبُن در زمينه طراحي مدل هاي تصميم گيري، توانمندي اين دو شرکت را در زمينه توسعه سيستم هاي پشتيبان تصميم کارا، در مقايسه با شرکت هاي مشابه، در سطح مطلوبي قرار داده است.</div>
                                </Staff>
                            </LeftDiv>
                        </Content>
                    </Main>
                    <Footer />
                </AboutUsContainer>
            }
            {
                language == 'en' &&
                <AboutUsContainer>
                    <Navbar />
                    <Main image={building2} direction={"ltr"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                            <RightDiv>
                                <Intro>
                                    <div className="title">Introduction :</div>
                                    <div>Today, the world of management is confronted with a plethora of concepts and terms related to decision-making. The act of decision-making in the administration of organizational affairs is so crucial that some authors define an organization as a 'decision network' and management as the act of 'decision-making.' On the other hand, the increasing complexity of the business world, high operational costs, and the expansiveness of organizational structures have significantly elevated the risk of making incorrect or suboptimal decisions.</div>
                                    <div>
                                        In today's world, organizations have well understood that in decision-making, they can no longer rely solely on the expertise and personal judgment of individuals. Instead, decisions must be based, as much as possible, on scientific investigations, accurate and timely data, and according to principles and reasoned methods. In these circumstances, what managers need more than anything else is
                                    </div>
                                    <div>
                                        <div className="highlight">Convenient tools,</div>
                                        <div className="highlight">Assured</div>
                                        <div className="highlight">And based on scientific principles</div>
                                        To assist them in making decisions that they sometimes encounter continuously and sometimes intermittently.
                                    </div>
                                </Intro>
                                <History>
                                    <div className="title">History of Takbon:</div>
                                    <div>In response to the increasing demand, the initial core of the <span className="highlight">Decision Support Systems Engineering Company - Takbon</span> was formed in August 2008 through the execution of projects related to production planning and scheduling in the steel industry.</div>
                                    <div>In July 2009, this team, with a more complete composition, commenced its activities as a research core in the Isfahan Science and Research Town.</div>
                                    <div>In the year 2010, the company was officially registered, and thereafter, it successfully completed growth phases and established itself in the Science and Technology Park of the Isfahan Science and Research Town. During this period, Takbon Company achieved success in executing various projects in the design and development of decision support systems on a large organizational scale, especially in the steel industry of the country.</div>
                                    <div>By undertaking these projects, Takbon Company has been able to achieve a desirable mastery over the <span className="highlight">processes of the steel industry and their corresponding information systems</span>.</div>
                                    <div>The consolidation of this knowledge has helped the experts of this company to possess suitable capabilities in providing appropriate services to the steel industry, particularly to Foolad Mobarakeh.</div>
                                </History>
                            </RightDiv>
                            <LeftDiv>
                                <Pic>
                                    <Image  src={building.src} alt={"building"} />
                                </Pic>
                                <Decision>
                                    <div className="title">Decision Support Systems</div>
                                    <div>The complexity of decision-making problems, especially when a large volume of information needs to be processed and analyzed, has provided a suitable domain for the entry of computers into the realm of decision-making.</div>
                                    <div>In such a way that in the past two decades, the concept:</div>
                                    <div className="highlight" >"Computer-Aided Decision Making"</div>
                                    <div>As part of developing:</div>
                                    <div className="highlight" >"Decision Support Systems"</div>
                                    <div>has demonstrated remarkable growth. Computers, with their high speed, can simulate human mental activities, and since they are immune to numerical errors, they significantly enhance the speed and quality of decision-making.</div>
                                </Decision>
                                <Staff>
                                    <div className="title">Technical Team and Human Capital:</div>
                                    <div>Takbon Company, <span className="highlight" >relying on a young, creative technical team equipped with the latest decision-making methods and tools</span>, primarily consisting of graduates in industrial engineering at postgraduate levels from the country's top universities. Additionally, by utilizing the <span className="highlight" >expertise of professors and consultants</span> both domestically and internationally, the company specializes in <span className="highlight" >designing and modeling various decision support systems</span>, especially those required in large industries.</div>
                                    <div>This company collaborates extensively with the <Link href={"https://www.irisaco.com/en"} target="_blank" className="highlight2" >international company for Systems and Automation Engineering (IRISA)</Link> in the development of systems. The combination of IRISA's knowledge and experience in the development of comprehensive and integrated information systems, along with Takbon's expertise in designing decision-making models, positions these two companies at a satisfactory level in the development of efficient decision support systems, compared to similar companies.</div>
                                </Staff>
                            </LeftDiv>
                        </Content>
                    </Main>
                    <Footer />
                </AboutUsContainer>
            }
        </>
    );
}

export default AboutUs;