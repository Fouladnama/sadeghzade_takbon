import styled from "styled-components";
import Link from "next/link";

export const Nav = styled.div`
    width: fit-content;
    height: 40px;
    background-color: #222;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 10px 0 0;
    border-radius: 5px;
    position: fixed;
    -family: "IRANSansWeb", sans-serif;
    z-index: 1000;
    transition: all ease 0.5s;

    @media screen and (max-width: 950px){
        display: none;
    }
`;

export const NavItem = styled(Link)`
    display: block;
    float: right;
    text-align: center;
    border:none;
    position: relative;
    transition: all ease-in-out .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;

    &::after{
        content: '';
        position: absolute;
        width: 0px;
        height: 2px;
        right: ${props => (props.adjust) ? "0" : "unset"};
        left: ${props => (props.adjust) ? "unset" : "0"};
        bottom: 0;
        background-color: white;
        transition: all ease-in-out .2s;
    }

    &:hover::after{
        width: 100%;
        right: ${props => (props.adjust) ? "0" : "unset"};
        left: ${props => (props.adjust) ? "unset" : "0"};
    }
`;

export const NavLink = styled.div`
    color: #fff;
    -size: 18px;
    text-decoration: none;
    text-align: center;
`;

export const PhoneNav = styled.div`
    display: none;

    @media screen and (max-width: 950px) {
        display: unset;
        position: fixed;
        z-index: 1000;
    }
`;

export const Burger = styled.div`
    width: 50px;
    height: 50px;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    transition: all .5s ease;
    margin: 15px;
    position: relative;
    z-index: 1000;

    /* &:hover {
        background: rgb(56 56 56);
        box-shadow: rgba(256, 256, 256, 0.2) 0px -3px 0px inset;
    }

    &:hover .strip div {
        background: white;
    } */

    .strip {
        transition: all .5s ease;
    }

    .strip div {
        height: 3px;
        border-radius: 10px;
        background: rgb(56 56 56);
        margin: 8px 10px 10px;
        transition: all .55s cubic-bezier(0.075, 0.82, 0.165, 1);
        width: 35px;
    }

    .strip div {
        transition: all .65s cubic-bezier(0.075, 0.82, 0.165, 1)
    }

    .active div:first-child {
        transform: translateY(13px) rotate(0deg) ;
    }
    .active div:nth-child(2) {
        opacity: 0;
    }
    .active div:last-child {
        transform: translateY(-13px) rotate(90deg) ;
    }
    .active {
        transform: scale(.7) rotate(45deg);
        transition: all .25s ease .05s;
    }
`;

export const Menu = styled.div`
    width: 200px;
    height: 100%;
    padding-top: 2vh;
    align-items: center;
    background: #555;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    -size: 1.2rem;
    left: 0;
    top: 0;
    opacity: ${props => (props.isopen != "false") ? "100%" : "0"};
    position: fixed;
    right: ${props => (props.isopen != "false") ?  "0" : "-100%"};
    transition: 0.3s ease-in-out;
    -family: "IRANSansWeb", sans-serif;
    border-left: 1px solid black;

    //can not select link
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;          /* Likely future */
`;

export const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    text-align: center;
    width: 100%;
    height: 80%;
`;

export const MenuItem = styled(Link)`
    display: block;
    float: right;
    text-align: center;
    border:none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
`;

export const MenuLink = styled.div`
    color: #fff;
    -size: 20px;
    -weight: bold;
    text-decoration: none;
    text-align: center;
`;

export const LanguageSection = styled.div`
    width: 100%;
    height: ${props => (props.display) ? "0" : "30px"};
    direction: ${props => (props.direction)};
    background-color: #EEEFF1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    -family: "IRANSansWeb", sans-serif;
    overflow: hidden;
    transition: all ease 0.2s;

    .headerContainer {
        width: 96%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        transition: all ease 0.2s;

        @media screen and (max-width: 950px){
            width: 90%;
        }
    }
`;

export const Lang = styled.div`
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
        color: #555;
    }

    &:hover > div {
        color: #0c63bb;
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
