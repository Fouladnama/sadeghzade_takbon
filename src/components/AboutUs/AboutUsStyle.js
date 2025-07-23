import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const AboutUsContainer = styled.div`
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
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 10rem 0;
    transition: all ease .2s;

    @media screen and (max-width: 1395px) {
        padding: 10rem 0 5rem;
    }

    @media screen and (max-width: 1150px) {
        flex-direction: column;
    }
`;

export const RightDiv = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    transition: all ease .2s;

    @media screen and (max-width: 1150px) {
        width: 100%;
    }
`;

export const Intro = styled.div`
    width: 100%;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1rem 0.8rem 0.4rem -4px rgb(0 0 0 / 30%);
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(3px);
    margin: 20px;
    transition: all 0.2s ease;
    animation: rotateIn 1s linear;

    @keyframes rotateIn {
        from {transform: perspective(2500px) rotateY(-100deg)}
        to {transform: perspective(2500px) rotateY(0deg)}
    }

    div {
        font-size: 15px;
        font-family: ${props => (props.font) ? `"Yekan", sans-serif` : `"IRANSansWeb", sans-serif`};
        line-height: 1.7;
        margin-top: 5px;
        transition: all 0.2s ease;
        
        @media screen and (max-width: 450px) {
            font-size: 14px;
        }
    }

    .title {
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }

    .highlight {
        color: #001a9e;
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
`;

export const History = styled.div`
    width: 100%;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1rem 0.8rem 0.4rem -4px rgb(0 0 0 / 30%);
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(3px);
    margin: 20px;
    transition: all 0.2s ease;
    animation: rotateIn3 1s linear;

    @keyframes rotateIn3 {
        from {transform: perspective(2500px) rotateY(-100deg)}
        to {transform: perspective(2500px) rotateY(0deg)}
    }

    div {
        font-size: 15px;
        font-family: "Yekan", sans-serif;
        line-height: 1.7;
        margin-top: 5px;
        transition: all 0.2s ease;
        
        @media screen and (max-width: 450px) {
            font-size: 14px;
        }
    }

    .title {
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }

    .highlight {
        color: #001a9e;
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }

    .number {
        font-family: "IRANSansWeb", sans-serif;
    }
`;

export const LeftDiv = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    transition: all ease .2s;

    @media screen and (max-width: 1150px) {
        width: 100%;
    }
`;

export const Pic = styled.div`
    width: 375px;
    height: 320px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1rem 0.8rem 0.4rem -4px rgb(0 0 0 / 30%);
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(3px);
    margin: 20px;
    transition: all 0.2s ease;
    animation: rotateIn4 1s linear;

    @keyframes rotateIn4 {
        from {transform: perspective(2500px) rotateY(100deg)}
        to {transform: perspective(2500px) rotateY(0deg)}
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

    @media screen and (max-width: 450px) {
        width: 100%;
    }
`;

export const Decision = styled.div`
    width: 100%;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1rem 0.8rem 0.4rem -4px rgb(0 0 0 / 30%);
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(3px);
    margin: 20px;
    transition: all 0.2s ease;
    animation: rotateIn5 1s linear;

    @keyframes rotateIn5 {
        from {transform: perspective(2500px) rotateY(100deg)}
        to {transform: perspective(2500px) rotateY(0deg)}
    }

    div {
        font-size: 15px;
        font-family: "Yekan", sans-serif;
        line-height: 1.7;
        margin-top: 5px;
        transition: all 0.2s ease;
        
        @media screen and (max-width: 450px) {
            font-size: 14px;
        }
    }

    .title {
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }

    .highlight {
        color: #001a9e;
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
`;

export const Staff = styled.div`
    width: 100%;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 1rem 0.8rem 0.4rem -4px rgb(0 0 0 / 30%);
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(3px);
    margin: 20px;
    transition: all 0.2s ease;
    animation: rotateIn6 1s linear;

    @keyframes rotateIn6 {
        from {transform: perspective(2500px) rotateY(100deg)}
        to {transform: perspective(2500px) rotateY(0deg)}
    }

    div {
        font-size: 15px;
        font-family: "Yekan", sans-serif;
        line-height: 1.7;
        margin-top: 5px;
        transition: all 0.2s ease;
        
        @media screen and (max-width: 450px) {
            font-size: 14px;
        }
    }

    .title {
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }

    .highlight {
        color: #001a9e;
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }

    .highlight2 {
        color: #9e0025;
        font-size: 17px;
        font-weight: bold;
        border-bottom: 1px solid #9e0025;
        transition: all 0.2s ease;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
`;
