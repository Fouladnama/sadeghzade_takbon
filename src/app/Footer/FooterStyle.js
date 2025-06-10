import styled from "styled-components";
import Link from "next/link";

export const FooterContainer = styled.div`
    direction: ${props => (props.direction)};
    font-family: "IRANSansWeb", sans-serif;
    transition: all 0.2s ease;

    pre, p, h3 {
        font-family: "IRANSansWeb", sans-serif;
    }
`;

export const Foot = styled.div`
    width: 100%;
    height: fit-content;
    background-color: #232323;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-evenly;
    transition: all 0.2s ease;

    @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const RightSec = styled.div`
    width: 47%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    margin: 2rem 0 1rem;
    transition: all 0.2s ease;

    @media (max-width: 1200px) {
        width: 90%;
    }

    @media (max-width: 800px) {
        display: block;
        margin: 0;
    }

    @media (max-width: 400px) {
        width: 85%;
    }
`;

export const Overview = styled.div`
    text-align: justify;
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    transition: all 0.2s ease;

    @media (max-width: 800px) {
        width: 90%;
        margin: 1rem 0;
    }
`;

export const OverviewTitle = styled.h3`
    font-size: 16px;
    color: #999;
    font-weight: bold;
`;

export const OverviewBody = styled.pre`
    font-size: 14px;
    color: #999;
    white-space: break-spaces;
`;

export const Provide = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    transition: all 0.2s ease;
    
    @media (max-width: 800px) {
        width: 90%;
    }
`;

export const ProvideTitle = styled.h3`
    font-size: 16px;
    color: #999;
    font-weight: bold;
`;

export const ProvideList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
`;

export const ProvideItem = styled.li`
    font-size: 14px;
    color: #999;
    white-space: break-spaces;
    margin: 5px 0;
    list-style-type: disc;
    list-style-position: inside;
`;

export const LeftSec = styled.div`
    width: 47%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    margin: 2rem 0 1rem;
    transition: all 0.2s ease;

    @media (max-width: 1200px) {
        width: 90%;
    }

    @media (max-width: 800px) {
        display: block;
        margin: 0;
        margin-bottom: 1rem;
    }

    @media (max-width: 400px) {
        width: 85%;
    }
`;

export const Ability = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    transition: all 0.2s ease;

    @media (max-width: 800px) {
        width: 90%;
        margin: 1rem 0;
    }
`;

export const AbilityTitle = styled.h3`
    font-size: 16px;
    color: #999;
    font-weight: bold;
`;

export const AbilityList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
`;

export const AbilityItem = styled.li`
    font-size: 14px;
    color: #999;
    white-space: break-spaces;
    margin: 5px 0;
    list-style-type: disc;
    list-style-position: inside;
`;

export const Communication = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    transition: all 0.2s ease;

    @media (max-width: 800px) {
        width: 90%;
    }
`;

export const CommunicationTitle = styled.h3`
    font-size: 16px;
    color: #999;
    font-weight: bold;
`;

export const CommunicationBody = styled.pre`
    font-size: 14px;
    color: #999;
    white-space: break-spaces;
    
    p {
        font-family: ${props => (props.font ? `"IRANSansWeb", sans-serif` : `"WhyteInktrap", sans-serif`)} !important;
    }

    .bold {
        font-weight: bold;
    }
`;

export const CommunicationLinks = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
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

export const Header = styled.div`
    width: 100%;
    height: 30px;
    background-color: #232323;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-family: "IRANSansWeb", sans-serif;
    bottom: 0;
    overflow: hidden;
    transition: all ease 0.5s;

    .headerContainer {
        width: 96%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        transition: all ease 0.5s;
        
        @media screen and (max-width: 1200px){
            width: 90%;
        }

        @media screen and (max-width: 400px){
            width: 85%;
        }
    }
`;

export const RightDiv = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;

    &:hover > div:first-child {
        background-image: ${props => `url(${props.hover.src})`};
    }

    & > div {
        color: #999;
    }

    &:hover > div {
        color: #52a3f4;
    }
`;

export const Icon = styled.div`
    width: 20px;
    height: 20px;
    background-image: ${props => `url(${props.image.src})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-transition: background-image 0.2s ease-in-out;
    transition: background-image 0.2s ease-in-out;

    & + div {
        transform: translateY(2px);
        transition: all 0.2s ease-in-out;
    }
`;
