import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const ProjectsContainer = styled.div`
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
    transition: all .2s ease;
    display: flex;
    direction: ${props => (props.direction)};
    align-items: center;

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
    height: max-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 15rem 0 15rem;
    transition: all ease .2s;

    @media screen and (max-width: 1000px) {
        padding: 10rem 0 7rem;
    }
`;

export const ProjectMajor = styled.div`
    width: 300px;
    box-shadow: 10px 10px 25px -5px #000, 0 0px 10px -6px #000;
    background-color: #2A2E2F;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px 15px;
    padding: 30px;
    border-radius: 10px;
    position: relative;
    transition: all ease-in-out .2s;
`;

export const Icon = styled.img`
    width: 90px;
    height: 90px;
    margin: 10px 0;
    transition: all ease-in-out .2s;
`;

export const Title = styled.h3`
    width: 250px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin-top: 15px;
    transition: all ease-in-out .2s;
    text-align: center;
    font-family: ${props => (props.font) ? `"IRANSansWeb", sans-serif` : `"WhyteInktrap", sans-serif`} !important;

    @media screen and (max-width: 400px) {
        width: unset;
    }
`;

export const ShowMore = styled(Link)`
    width: fit-content;
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 5px 10px;
    margin-top: 20px;
    background-size: 200% 100%;
    background-image: linear-gradient(to right, transparent 50%, white 50%);
    -webkit-transition: background-position 0.2s ease;
    -moz-transition: background-position 0.2s ease;
    transition: background-position 0.2s ease;

    &:hover {
        background-position: -100% 0;
        color: #000;
    }
`;