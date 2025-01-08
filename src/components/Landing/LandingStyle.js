import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const Loader = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
`;

export const LandingContainer = styled.div`
    font-family: "IRANSansWeb", sans-serif;
    transition: all 0.2s ease;
`;

export const Main = styled.div`
    width: 100%;
    direction: ${props => (props.direction)};
    transition: all 0.2s ease;
`;

export const Heading = styled.div`
    width: 100%;
    height: 90vh;

    @media screen and (max-height: 650px) {
        height: 100vh;
    }

    .hero {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: absolute;

        @media screen and (min-height: 650px) {
            position: relative;
        }
    }
`;

export const LogoContainer = styled.div`
    width: 100%;
    position: absolute;
`;

export const Video = styled.video`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    position: absolute;
    z-index: 1;

    @media screen and (max-height: 650px) {
        height: 100vh;
    }
`;

export const Logo = styled(Link)`
    width: 120px;
    height: 120px;
    background-image: url(${props => props.hover.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: all ease-in-out .2s;
    z-index: 2;
    position: absolute;
    top: 10px;
    left: 10px;
    float: left;

    @media screen and (max-width: 1000px) {
        width: 100px;
        height: 100px;
    }
`;

export const HeroImage = styled.div`
    width: 800px;
    height: 100%;
    background-image: url(${props => props.image.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 2;
    position: relative;
    animation: rotateLogo 1s linear;

    @keyframes rotateLogo {
        from {transform: rotateX(90deg)}
        to {transform: rotateX(0deg)}
    }

    @media screen and (max-width: 950px) {
        width: 75%;
    }

    @media screen and (max-width: 800px) {
        width: 90%;
    }

    @media screen and (max-height: 650px) {
        height: 50%;
    }
    
    @media screen and (max-height: 365px) {
        transform: translateY(20px);
    }
`;

export const Typewriter = styled.div`
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #858585;
    margin: 20px;
    font-family: "Shabnam", sans-serif;
    font-size: 1.7rem;
    font-weight: 600;
    letter-spacing: ${props => (props.letterSpace ? "0.2em" : "0")};
    user-select: none;
    transition: all ease-in-out .2s;

    .typewriter::after {
        content: '|';
        color: #FFA500;
        animation: cursor 0.7s infinite step-start;
        
        @keyframes cursor {
            50% {
                opacity: 0;
            }
        }
    }

    @media screen and (max-width: 850px) {
        font-size: 1.4rem;
    }

    @media screen and (max-width: 650px) {
        font-size: 1.2rem;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const NewsMag = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 3rem;
    transition: all 0.2s ease;

    & .fadeIn {
        animation: ${fadeIn} 0.5s ease-in-out;
    }
`;

export const NewsTitle = styled.div`
    width: fit-content;
    height: fit-content;
    font-size: 30px;
    font-weight: 600;
    color: #858585;
    margin: 2rem;
    align-self: flex-start;
`;

export const NewsSection = styled.div`
    width: 80%;
    height: fit-content;
    direction: rtl;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    gap: 2rem;
    transition: all 0.3s ease;

    @media screen and (max-width: 1400px) {
        width: 90%;
    }

    @media screen and (max-width: 1200px) {
        flex-direction: column;
        width: 80%;
    }

    @media screen and (max-width: 900px) {
        width: 90%;
    }
`;

export const RightSec = styled.div`
    width: 58%;
    padding: 1rem;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
`;

export const News = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    transition: all ease-in-out .3s;
`;

export const NewsImage = styled.img`
    width: 100%;
    height: 450px;
    aspect-ratio: auto 100% / 450;
    object-fit: cover;
    border-radius: 10px;
    margin: 0 auto;
    margin-bottom: 1rem;
    transition: all ease-in-out .3s;

    @media screen and (max-width: 700px) {
        height: 300px;
        aspect-ratio: auto 100% / 300;
    }

    @media screen and (max-width: 550px) {
        height: 250px;
        aspect-ratio: auto 100% / 250;
    }

    @media screen and (max-width: 430px) {
        height: 200px;
        aspect-ratio: auto 100% / 200;
    }
`;

export const NewsText = styled.div`
    width: 90%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    margin: 0 auto;
    margin-top: -5rem;
    transition: all ease-in-out .3s;

    h3 {
        color: #171e2b;
        font-size: 20px;
        font-weight: bold;
        text-align: right;
        line-height: 27px;
        margin-bottom: 12px;
    }

    p {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        color: #59606c;
        font-size: 14px;
        font-weight: 400;
        text-align: right;
        margin-bottom: 16px;
    }

    div {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 10px;

        span {
            font-size: 14px;
        }
    }

    @media screen and (max-width: 700px) {
        h3 {
            font-size: 16px;
        }
    }
`;

export const ModalButton = styled.button`
    border-bottom: 1px solid #000;
    font-size: 14px;
    color: #000;
    background: transparent;
    cursor: pointer;
    user-select: none;
`;

export const LeftSec = styled.div`
    width: 40%;
    height: fit-content;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 1rem 1rem;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
    
    .newsLeft {
        width: 100%;
        max-height: 800px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden auto;
        gap: 25px;
        padding: 1rem 0;

        &::-webkit-scrollbar {
            width: 6px;
            background: transparent;
            border-radius: 30px;
        }
        
        &::-webkit-scrollbar-track {
            display: none;
        }

        &::-webkit-scrollbar-thumb {
            border: 2px solid transparent;
            background-color: #a3a3a3;
            border-radius: 30px;
            transition: all 0.3s ease;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: #808080;
        }
    }
`;

export const NewsItem = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;

    &:hover {
        h3 {
            color: #c20000;
        }
    }
`;

export const Image = styled.img`
    width: 150px;
    height: 75px;
    border-radius: 10px;
    aspect-ratio: 150 / 75;
    object-fit: cover;
    pointer-events: none;
    user-select: none;

    @media screen and (max-width: 600px) {
        width: 100px;
        height: 50px;
        aspect-ratio: 100 / 50;
    }
`;

export const Text = styled.div`
    width: calc(100% - 150px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5px;
    background: #fff;
    border-radius: 4px;
    padding: 0 10px;
    pointer-events: none;
    user-select: none;
    transition: all 0.3s ease;

    h3 {
        width: 100%;
        font-weight: bold;
        transition: all 0.3s ease;
    }

    @media screen and (max-width: 600px) {
        width: calc(100% - 90px);
        padding: 0 5px;

        h3 {
            font-size: 15px;
        }
    }

    @media screen and (max-width: 400px) {    
        h3 {
            font-size: 13px;
        }
    }
`;

export const Date = styled.div`
    width: fit-content;
    height: fit-content;
    display:  flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    @media screen and (max-width: 400px) {    
        p {
            font-size: 12px;
        }
    }
`;

export const Calendar = styled.img`
    width: 22px;
    height: 22px;
`;

export const ArchiveButton = styled.div`
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    color: #000;
    cursor: pointer;
    outline: 0;
    border: 1.5px solid #000;
    border-radius: 10px;
    padding: 5px 10px;
    margin-top: 20px;
    background-size: 200% 100%;
    background-image: linear-gradient(to right, transparent 50%, black 50%);
    -webkit-transition: background-position 0.2s ease;
    -moz-transition: background-position 0.2s ease;
    transition: background-position 0.2s ease;

    &:hover {
        background-position: -100% 0;
        color: #fff;
    }
`;

export const DecisionImage = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${props => props.image.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: all ease .3s;

    @media screen and (max-width: 650px) {
        height: 70vh;
    }

    @media screen and (max-width: 550px) {
        height: 50vh;
    }
`;

export const DecisionText = styled.div`
    width: fit-content;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1rem 18px 0px rgb(0 0 0);
    border-radius: 1rem;
    backdrop-filter: blur(2px);
    padding: 0.3rem 4rem;
    font-size: 3rem;
    color: whitesmoke;
    opacity: 0;
    transform: translateY(500%);
    transition: all ease-in-out .5s;
    user-select: none;

    &.slide-in {
        opacity: 1;
        transform: translateY(0%);
    }

    @media screen and (max-width: 850px) {
        font-size: 2rem;
        padding: 0.3rem 2rem;
        transform: translateY(100%);
    }

    @media screen and (max-width: 550px) {
        width: 90%;
        font-size: 1.2rem;
        text-align: center;
    }
`;

export const DecisionImageEN = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${props => props.image.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: all ease .3s;

    @media screen and (max-width: 650px) {
        height: 70vh;
    }

    @media screen and (max-width: 550px) {
        height: 50vh;
    }
`;

export const DecisionTextEN = styled.div`
    width: fit-content;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1rem 18px 0px rgb(0 0 0);
    border-radius: 1rem;
    backdrop-filter: blur(2px);
    padding: 0.3rem 4rem;
    font-size: 2.5rem;
    color: whitesmoke;
    opacity: 0;
    transform: translateY(500%);
    transition: all ease-in-out .5s;
    user-select: none;

    &.slide-in {
        opacity: 1;
        transform: translateY(0%);
    }

    @media screen and (max-width: 950px) {
        font-size: 2rem;
        padding: 0.3rem 2rem;
        transform: translateY(100%);
    }

    @media screen and (max-width: 750px) {
        width: 90%;
        font-size: 1.7rem;
        text-align: center;
    }

    @media screen and (max-width: 550px) {
        font-size: 1.2rem;
    }
`;

export const Properties = styled.div`
    width: 100%;
    height: fit-content;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 1rem 0;
    transform: translateY(-30%);

    @media screen and (max-width: 1250px) {
        transform: translateY(0%);
        flex-direction: column;
    }
`;

export const Property = styled.div`
    width: 25%;
    height: 15rem;
    background-color: white;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px, rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 10px;
    transition: all ease-in-out .5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    opacity: 0;

    &.graduation {
        transform: translateX(10%);
    }

    &.rocket {
        transform: translateY(-50%);
    }

    &.random {
        transform: translateX(-10%);
    }

    &.slide-in {
        opacity: 1;
        transform: translateY(-20%);
    }

    &.slide-left {
        opacity: 1;
        transform: translateX(0%);
    }

    &.slide-right {
        opacity: 1;
        transform: translateX(0%);
    }

    @media screen and (max-width: 1250px) {
        width: 550px;
        height: fit-content;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        margin-bottom: 2rem;

        &.graduation {
            transform: translateX(15%);
        }

        &.rocket {
            transform: translateY(0) translateX(-0%);
        }

        &.random {
            transform: translateX(15%);
        }

        &.slide-in {
            opacity: 1;
            transform: translateX(-20%);
        }

        &.slide-left {
            opacity: 1;
            transform: translateX(20%);
        }

        &.slide-right {
            opacity: 1;
            transform: translateX(20%);
        }
    }

    @media screen and (max-width: 900px) {
        width: 85%;
        height: fit-content;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 2rem;

        &.graduation {
            transform: translateX(5%);
        }

        &.rocket {
            transform: translateY(0) translateX(-5%);
        }

        &.random {
            transform: translateX(5%);
        }

        &.slide-in {
            opacity: 1;
            transform: translateX(0%);
        }

        &.slide-left {
            opacity: 1;
            transform: translateX(0%);
        }

        &.slide-right {
            opacity: 1;
            transform: translateX(0%);
        }
    }
`;

export const PropertyTitleContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    @media screen and (max-width: 1250px) {
        flex-direction: column;
        align-items: flex-start;
        margin-top: 0;
    }
`;

export const PropertyIcon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #208793;
    background-image: url(${props => props.image.src});
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    transition: background-color 0.2s ease-out;
    flex: 0 0 auto;

    &:hover {
        background-color: #C30000;
    }

    @media screen and (max-width: 550px) {
        width: 40px;
        height: 40px;
    }
`;

export const PropertyTitle = styled.div`
    height: fit-content;
    font-size: 1.3rem;
    font-weight: 600;
    color:  #777;
    text-align: center;
    margin-bottom: 5px;

    @media screen and (max-width: 1250px) {
        text-align: ${props => (props.adjust ? "right" : "left")};
    }

    @media screen and (max-width: 550px) {
        font-size: 1rem;
    }
`;

export const PropertyText = styled.div`
    width: 100%;
    height: fit-content;
    font-size: 0.8rem;
    font-weight: 400;
    color: #858585;
    text-align: center;

    @media screen and (max-width: 1250px) {
        text-align: ${props => (props.adjust ? "right" : "left")};
    }
`;

export const PropertyDescription = styled.div`
    width: 100%;
    height: fit-content;
    margin: 0 auto 3rem auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;

    @media screen and (max-width: 900px) {
        flex-direction: column-reverse;
    }
`;

export const DescriptionImage = styled.div`
    width: 350px;
    height: 500px;
    margin: 0 auto;
    border-radius: 10px;
    background-image: url(${props => props.image.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18), 0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 8px 8px rgba(0,0,0,0.11), 0 16px 16px rgba(0,0,0,0.11), 0 32px 32px rgba(0,0,0,0.11), 5px 7px 14px rgb(0 0 0 / 50%);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    opacity: 0;
    transform: translateX(-10%);
    transition: all ease-in-out .5s;

    &.slide-left {
        opacity: 1;
        transform: translateX(0%);
    }

    @media screen and (max-width: 900px) {
        transform: translateX(10%);
        margin: ${props => (props.adjust ? "0 0 2rem 2rem" : "0 2rem 2rem 0")};
        align-self: flex-end;
    }

    @media screen and (max-width: 600px) {
        transform: translateX(-5%);
        margin: 0 auto 2rem;
    }

    @media screen and (max-width: 420px) {
        width: 90%;
    }

    @media screen and (max-width: 420px) {
        width: 90%;
        height: 400px;
    }
`;

export const ImageText = styled.div`
    color: white;
    width: 100%;
    text-align: center;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 51%, rgba(250,250,250,0.00043767507002800965) 100%);
    padding: 1rem 1rem;
    backdrop-filter: blur(2px);
    user-select: none;
    transition: all 0.3s ease;

    & > div:nth-child(1) {
        font-size: 1.2rem;
        font-weight: 600;
    }

    & > div:nth-child(2) {
        font-size: 0.8rem;
        font-weight: 400;
    }
`;

export const DescriptionText = styled.div`
    width: 40%;
    height: fit-content;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    opacity: 0;
    transform: translateX(10%);
    transition: all ease-in-out .5s;
    user-select: none;

    &.slide-right {
        opacity: 1;
        transform: translateX(0%);
    }

    @media screen and (max-width: 900px) {
        width: 90%;
    }
`;

export const DescriptionTitle = styled.div`
    width: fit-content;
    height: fit-content;
    font-size: 1.3rem;
    font-weight: 600;
    color:  #000;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    & > div:nth-child(1) {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-color: #F0F0F0;
        background-image: url(${props => props.image.src});
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: center;
        transition: background-color 0.2s linear;
        flex: 0 0 auto;

        &:hover {
            background-color: #E0E0E0;
        }
    }

    @media screen and (max-width: 550px) {
        font-size: 1rem;

        & > div:nth-child(1) {
            width: 40px;
            height: 40px;
            background-size: 20px;
        }
    }
`;

export const DescriptionPart = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    margin-top: 1rem;
`;

export const DescriptionItem = styled.li`
    font-size: 14px;
    color: #666;
    white-space: break-spaces;
    margin: 5px 0;
    list-style-type: disc;
    list-style-position: inside;

    & > span {
        margin-left: ${props=> (props.letterSpace ? "0" : "-10px")};
        margin-right: ${props=> (props.letterSpace ? "-10px" : "0")};
    }
`;

export const Chain = styled.div`
    width: 100%;
    height: fit-content;
    margin: 0 auto 3rem auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;

    @media screen and (max-width: 1250px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const ChainImage = styled.div`
    width: 650px;
    height: 370px;
    margin: 0 auto;
    border-radius: 10px;
    background-image: url(${props => props.image.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18), 0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 8px 8px rgba(0,0,0,0.11), 0 16px 16px rgba(0,0,0,0.11), 0 32px 32px rgba(0,0,0,0.11), 5px 7px 14px rgb(0 0 0 / 50%);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    opacity: 0;
    transform: translateX(10%);
    transition: all ease-in-out .5s;

    &.slide-right {
        opacity: 1;
        transform: translateX(0%);
    }

    @media screen and (max-width: 1250px) {
        margin-bottom: 20px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px, rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }

    @media screen and (max-width: 730px) {
        width: 90%;
    }

    @media screen and (max-width: 600px) {
        height: 270px;
    }

    @media screen and (max-width: 450px) {
        height: 230px;
    }
`;

export const ChainText = styled.div`
    width: 40%;
    height: fit-content;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    opacity: 0;
    transform: translateY(10%);
    transition: all ease-in-out .5s;
    user-select: none;

    &.slide-left {
        opacity: 1;
        transform: translateY(0%);
    }

    @media screen and (max-width: 1250px) {
        width: 90%;
        align-self: flex-start;
    }
`;

export const ChainTitle = styled.div`
    width: 100%;
    height: fit-content;
    font-size: 1.3rem;
    font-weight: 600;
    color:  #000;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    & > div:nth-child(1) {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-color: #F0F0F0;
        background-image: url(${props => props.image.src});
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: center;
        transition: background-color 0.2s linear;
        flex: 0 0 auto;

        &:hover {
            background-color: #E0E0E0;
        }
    }

    @media screen and (max-width: 550px) {
        font-size: 1rem;

        & > div:nth-child(1) {
            width: 40px;
            height: 40px;
            background-size: 20px;
        }
    }
`;

export const ChainPart = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    margin-top: 1rem;
`;

export const ChainItem = styled.li`
    font-size: 14px;
    color: #666;
    white-space: break-spaces;
    margin: 5px 0;
    list-style-type: disc;
    list-style-position: inside;

    & > span {
        font-weight: 600;
        margin-left: ${props=> (props.letterSpace ? "0" : "-10px")};
        margin-right: ${props=> (props.letterSpace ? "-10px" : "0")};
        color: #000;
    }
`;

export const Trust = styled.div`
    width: 100%;
    height: fit-content;
    margin: 0 auto 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;

export const TrustTitle = styled.h3`
    width: fit-content;
    height: fit-content;
    font-size: 28px;
    font-weight: 600;
    color: #858585;
    margin: 2rem;
    margin-bottom: 0;
    align-self: flex-start;
    transition: all 0.2s ease;

    @media screen and (max-width: 700px) {
        font-size: 21px;
    }

    @media screen and (max-width: 400px) {
        font-size: 18px;
    }
`;

export const TrustLogos = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    .slick-slider {
        width: 100%;
    }

    .slick-arrow {
        display: none !important;
    }

    .slick-track {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }
`;

export const TrustLogo = styled.img`
    width: 100%;
    height: 150px;
    object-fit: contain;

    @media screen and (max-width: 500px) {
        height: 90px;
    }
`;

export const ExceptionLogo = styled.img`
    width: 100%;
    height: 300px;
    object-fit: contain;

    @media screen and (max-width: 500px) {
        height: 180px;
    }
`;
