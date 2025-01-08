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
    transition: all .2s ease;

    @media screen and (min-height: 1200px){
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
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 10rem 0 10rem;
    transition: all ease .2s;
`;

export const RightDiv = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    a {
        width: fit-content;
        
        &:nth-child(odd) {
            align-self: flex-start;
        }

        &:nth-child(even) {
            align-self: flex-end;
        }
    }

    @media screen and (max-width: 1300px) {
        width: 100%;
    }
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
        .layer {
            transform: translateY(0);
        }
    }
`;

export const Image = styled.div`
    width: 130px;
    height: 130px;
    border: 2px solid #fff;
    border-radius: 100%;
    background-color: #fff;
    background-image: url(${props => props.image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    overflow: hidden;
    z-index: 1;

    .layer {
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        transform: translateY(100%);
        transition: all ease-in-out .2s;
    }

    @media screen and (max-width: 900px) {
        width: 100px;
        height: 100px;
    }
`;

export const RightText = styled.div`
    width: 300px;
    height: 70px;
    border-radius: 35px 0 0 35px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: #eee;
    margin-right: -20px;
    padding: 0 1rem;
    padding-right: 1.8rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;

    @media screen and (max-width: 430px){
        width: 210px;
        font-size: 17px;
    }
`;

export const LeftText = styled.div`
    width: 300px;
    height: 70px;
    border-radius: 0 35px 35px 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: #eee;
    margin-left: -20px;
    padding: 0 1rem;
    padding-left: 1.8rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;

    @media screen and (max-width: 430px){
        width: 210px;
        font-size: 17px;
    }
`;
