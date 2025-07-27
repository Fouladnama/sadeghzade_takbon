import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const ServicesContainer = styled.div`
    font-family: "IRANSansWeb", sans-serif;

    pre, p, h3 {
        font-family: "IRANSansWeb", sans-serif;
    }
`;

export const Main = styled.div`
    width: 100%;
    height: fit-content;
    background-image: url(${props => props.image.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    direction: ${props => (props.direction)};
    transition: all .2s ease;

    @media screen and (max-width: 1100px) {
        background-position: 40%;
    }
`;

export const Heading = styled.div`
    width: 100%;
    position: absolute;
`;

export const Logo = styled(Link)`
    width: 120px;
    height: 120px;
    background-image: url(${props => props.hover.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: all ease-in-out .2s;
    margin: 10px 15px;
    z-index: 2;
    position: relative;
    float: left;

    @media screen and (max-width: 850px) {
        width: 100px;
        height: 100px;
    }
`;

export const Content = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 11rem 0 10rem;
    transition: all ease .2s;

    @media screen and (max-width: 1000px) {
        padding: 10rem 0 7rem;
    }
`;

export const Tabs = styled.div`
    width: 100%;
    height: fit-content;
    margin-bottom: 2rem;
    transition: all 0.2s ease;

    .lazy {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 15px;
    }
`;

export const Tab = styled.div`
    width: 160px;
    height: fit-content;
    border-radius: 15px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ease .2s;

    p {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 5px;
        color: #000;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        pointer-events: none;
        user-select: none;
        transition: all ease .2s;
    }

    &:hover {
        transform: scale(1.1);
    }

    @media screen and (max-width: 500px) {
        width: 130px;

        p {
            font-size: 13px;
        }
    }
`;

export const TabDetail = styled.div`
    width: 150px;
    height: 100px;
    border-radius: 15px 15px 0 0;
    background-image: url(${props => props.image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    transition: all ease .2s;

    @media screen and (max-width: 500px) {
        width: 130px;
    }
`;

export const TabContent = styled.div`
    width: 60%;
    height: 500px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    transition: all ease .2s;

    @media screen and (max-width: 1600px) {
        width: 80%;
    }

    @media screen and (max-width: 700px) {
        width: 100%;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
        padding: 1rem 1.5rem;
        height: 350px;
    }
`;

export const TabContentContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: ${props => (props.adjust) ? "1rem 0 0 0" : "1rem 0 0 0"};
    overflow: hidden auto;

    &::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #999; 
        border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #808080;
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

export const ProjectTitle = styled.h3`
    width: fit-content;
    height: fit-content;
    color: #fff;
    font-size: 2rem;
    float: ${props => (props.adjust) ? "right" : "left"};
    margin-bottom: 1rem;
    line-height: 1.5;
    font-weight: bold;
    font-family: "ShabnamBold", sans-serif !important;
    animation: ${fadeIn} 0.5s ease-in-out;
    transition: opacity 0.5s ease-in-out;
    opacity: ${props => (props.selected ? '1' : '0')};
    pointer-events: ${props => (props.selected ? 'auto' : 'none')};

    & ~ h3, & ~ p, & ~ ul, & ~ div {
        width: 100%;
        margin: 0;
        position: relative;
        font-family: ${props => (props.adjust) ? `"Shabnam", sans-serif` : `"WhyteInktrap", sans-serif`} !important;
        font-size: 1.5rem;
        animation: ${fadeIn} 0.5s ease-in-out;
        transition: opacity 0.5s ease-in-out;
        opacity: ${props => (props.selected ? '1' : '0')};
        pointer-events: ${props => (props.selected ? 'auto' : 'none')};

        .normal {
            list-style-position: inside;

            span {
                font-family: "WhyteInktrap", sans-serif;
            }

            li::marker {
                content: "- ";
            }
        }

        @media screen and (max-width: 800px) {
            font-size: 1.2rem;
        }
    }

    & ~ ul {
        list-style: decimal;
        list-style-position: inside;
    }

    @media screen and (max-width: 1220px) {
        font-size: 1.7rem;
    }

    @media screen and (max-width: 500px) {
        font-size: 1.4rem;
    }
`;
