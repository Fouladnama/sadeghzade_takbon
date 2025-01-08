import styled from "styled-components";
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

export const NewsContainer = styled.div`
    font-family: "IRANSansWeb", sans-serif;
    color: #fff;

    pre, p, h3, .Toastify__toast-body > div:last-child {
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
    width: 800px;
    min-height: 100vh;
    height: fit-content;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 10rem 0 6rem;
    transition: all ease .2s;

    @media screen and (max-width: 1000px) {
        padding: 10rem 0 4rem;
    }

    @media screen and (max-width: 900px) {
        width: 90%;
    }

    @media screen and (max-width: 850px) {
        padding-top: 8rem;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: fit-content;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: all ease .2s;
`;

export const Date = styled.p`
    width: fit-content;
    height: fit-content;
    font-size: 18px;
    background-color: #3f3f3f;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: -50px;
    margin-right: 10px;
    margin-bottom: 30px;
    user-select: none;

    @media screen and (max-width: 500px) {
        font-size: 16px;
    }
`;

export const Title = styled.h1`
    width: fit-content;
    height: fit-content;
    font-size: 25px;
    font-weight: bold;
    margin-top: 10px;
    
    @media screen and (max-width: 600px) {
        font-size: 20px;
    }

    @media screen and (max-width: 430px) {
        font-size: 18px;
    }
`;

export const Report = styled.h3`
    width: fit-content;
    height: fit-content;
    font-size: 18px;
    user-select: none;
    text-align: right;
    
    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

export const Text = styled.p`
    width: 100%;
    height: fit-content;
    font-size: 18px;
    text-align: right;
    margin-top: 10px;
    line-height: 2;
    user-select: none;
    white-space: pre-line;

    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
`;
