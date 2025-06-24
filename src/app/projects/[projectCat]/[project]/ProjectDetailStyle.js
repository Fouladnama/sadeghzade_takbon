import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const ProjectContainer = styled.div`
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

    @media screen and (min-height: 900px){
        height: max-content;
    }

    @media screen and (min-height: 900px){
        height: 100vh;
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
    flex-direction: row;
    flex-wrap: wrap;
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
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    @media screen and (max-width: 700px) {
        width: 100%;
        flex-direction: row;
        justify-content: space-evenly;
        margin-bottom: 1rem;
    }
`;

export const TabDetail = styled.div`
    width: 100px;
    height: 100px;
    border: 2px solid #fff;
    border-radius: 100%;
    background-color: #fff;
    background-image: url(${props => props.image.src});
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: all ease .2s;

    &:hover {
        transform: scale(1.1);
    }

    @media screen and (max-width: 1000px) {
        width: 80px;
        height:80px;
    }

    @media screen and (max-width: 700px) {
        margin: 10px;
    }
`;

export const Line = styled.div`
    width: 3px;
    height: 50px;
    background-color: #fff;
    transition: all 0.2s ease;

    @media screen and (max-width: 700px) {
        display: none;
    }
`;

export const TabContent = styled.div`
    width: 60%;
    height: 500px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    transition: all ease .2s;

    @media screen and (max-width: 1600px) {
        width: 80%;
    }

    @media screen and (max-width: 700px) {
        width: 100%;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
        height: 350px;
    }
`;

export const TabContentContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: ${props => (props.adjust) ? "4rem 1rem 0 0" : "4rem 0 0 1rem"};
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
    color: #000;
    font-size: 2rem;
    position: absolute;
    top: 2rem;
    right: ${props => (props.adjust) ? "2rem" : "0"};
    left: ${props => (props.adjust) ? "0" : "2rem"};
    float: ${props => (props.adjust) ? "right" : "left"};
    padding: 0 1rem;
    text-align: center;
    line-height: 1.5;
    font-weight: bold;
    font-family: "ShabnamBold", sans-serif !important;
    animation: ${fadeIn} 0.5s ease-in-out;
    transition: opacity 0.5s ease-in-out;
    opacity: ${props => (props.selected ? '1' : '0')};
    pointer-events: ${props => (props.selected ? 'auto' : 'none')};

    & ~ h3, & ~ p, & ~ ul, & ~ div {
        width: 100%;
        height: 100%;
        margin: 0;
        position: relative;
        overflow: hidden auto;
        font-family: ${props => (props.adjust) ? `"Shabnam", sans-serif` : `"WhyteInktrap", sans-serif`} !important;
        font-size: 1.5rem;
        animation: ${fadeIn} 0.5s ease-in-out;
        transition: opacity 0.5s ease-in-out;
        opacity: ${props => (props.selected ? '1' : '0')};
        pointer-events: ${props => (props.selected ? 'auto' : 'none')};

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

        @media screen and (max-width: 800px) {
            font-size: 1.2rem;
        }
    }

    & ~ ul {
        list-style: decimal;
        list-style-position: inside;
    }

    @media screen and (max-width: 800px) {
        font-size: 1.7rem;
    }

    @media screen and (max-width: 500px) {
        font-size: 1.4rem;
    }
`;

export const Pics = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    align-items: center;
    justify-content: center;
`;

export const Pic = styled.div`
    width: 300px;
    height: 150px;
    background-image: url(${props => props.image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin: 1rem;
    transition: all ease .2s;

    &:hover {
        transform: scale(1.1);
    }

    @media screen and (max-width: 1050px) {
        width: 200px;
        height: 100px;
    }

    @media screen and (max-width: 600px) {
        width: 150px;
        height: 75px;
    }
`;
