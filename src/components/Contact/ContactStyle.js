import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const ContactContainer = styled.div`
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
    padding: 15rem 0 15rem;
    transition: all ease .2s;

    @media screen and (max-width: 1600px){
        width: 100%;
    }

    @media screen and (max-width: 1395px) {
        padding: 10rem 0 5rem;
    }

    @media screen and (max-width: 815px) {
        flex-direction: column;
        margin: 0 auto;
    }
`;

export const Info = styled.div`
    width: 350px;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1rem 0.8rem 0.4rem -4px rgb(0 0 0 / 30%);
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(3px);
    margin: 20px;
    animation: rotateIn 1s linear;

    @keyframes rotateIn {
        from {transform: perspective(2500px) rotateY(100deg)}
        to {transform: perspective(2500px) rotateY(0deg)}
    }

    @media screen and (max-width: 815px) {
        margin: 20px 0;
    }

    @media screen and (max-width: 460px) {
        width: 90%;
    }
`;

export const CommunicationTitle = styled.h3`
    font-size: 18px;
    color: #000;
    font-weight: bolder;
    margin-bottom: 5px;
`;

export const CommunicationBody = styled.pre`
    font-size: 16px;
    color: #000;
    white-space: break-spaces;
    
    div {
        font-weight: bold;
    }

    p {
        font-family: ${props => (props.font ? `"IRANSansWeb", sans-serif` : `"WhyteInktrap", sans-serif`)};
    }
`;

export const CommunicationLinks = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    gap: 10px;
`;

export const LinkedIn = styled(Link)`
    width: 25px;
    height: 25px;
    background-image: ${props => `url(${props.image.src})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-transition: background-image 0.2s ease-in-out;
    transition: background-image 0.2s ease-in-out;

    &:hover {
        background-image: ${props => `url(${props.hover.src})`};
    }
`;

export const Instagram = styled(Link)`
    width: 25px;
    height: 25px;
    background-image: ${props => `url(${props.image.src})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-transition: background-image 0.2s ease-in-out;
    transition: background-image 0.2s ease-in-out;

    &:hover {
        background-image: ${props => `url(${props.hover.src})`};
    }
`;

export const Email = styled(Link)`
    width: 25px;
    height: 25px;
    background-image: ${props => `url(${props.image.src})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-transition: background-image 0.2s ease-in-out;
    transition: background-image 0.2s ease-in-out;

    &:hover {
        background-image: ${props => `url(${props.hover.src})`};
    }
`;

export const Pic = styled.div`
    width: 375px;
    height: 315px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1rem 0.8rem 0.4rem -4px rgb(0 0 0 / 30%);
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(3px);
    margin: 20px;
    animation: rotateMiddle 1s linear;

    @keyframes rotateMiddle {
        from {transform: perspective(2500px) rotateX(-90deg)}
        to {transform: perspective(2500px) rotateX(0deg)}
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

    @media screen and (max-width: 815px) {
        margin: 20px 0;
    }

    @media screen and (max-width: 460px) {
        width: 90%;
    }
`;

export const Location = styled.div`
    width: 550px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1rem 0.8rem 0.4rem -4px rgb(0 0 0 / 30%);
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(3px);
    margin: 20px;
    animation: rotateLeft 1s linear;

    @keyframes rotateLeft {
        from {transform: perspective(2500px) rotateY(90deg)}
        to {transform: perspective(2500px) rotateY(0deg)}
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    iframe {
        width: 100%;
        border-radius: 10px;
        animation: fadeIn 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    .google {
        opacity: ${props => (props.selected == 'google' ? '1' : '0')};
        height: ${props => (props.selected == 'google' ? '400px' : '0')};
    }

    .neshan {
        opacity: ${props => (props.selected == 'neshan' ? '1' : '0')};
        height: ${props => (props.selected == 'neshan' ? '400px' : '0')};
    }

    @media screen and (max-width: 815px) {
        margin: 20px 0;
    }

    @media screen and (max-width: 615px) {
        width: 90%;
    }
`;

export const MapSelect = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    column-gap: 15px;
    row-gap: 5px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;

    div {
        cursor: pointer;
        user-select: none;
    }
`;
