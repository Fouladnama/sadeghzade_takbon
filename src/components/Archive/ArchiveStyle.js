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

export const ArchiveContainer = styled.div`
    font-family: "IRANSansWeb", sans-serif;

    pre, p, h3, .Toastify__toast-body > div:last-child {
        font-family: "IRANSansWeb", sans-serif;
    }
`;

export const Main = styled.div`
    width: 100%;
    min-height: 100vh;
    /* background-color: #c9c9c9; */
    background-image: url(${props => props.image.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
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
    height: fit-content;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 10rem 0 5rem;
    transition: all ease .2s;

    li {
        padding: 6px 8px;
        min-width: 32px;
        min-height: 32px;
        border-radius: 10px;
        user-select: none;
        margin-left: 0;
        margin-right: 8px;
        font-size: 16px;
        font-weight: bold;
        color: #7c869c;
        display: inline-block;
        text-align: center;
        cursor: pointer;
    }

    .disabled-page {
        a {
            cursor: not-allowed;
        }

        background-color: #F6F7FB;
        color: #a3aab8;
        cursor: not-allowed;
    }

    .Paginate {
        width: 100%;
        display: flex;
        direction: ${props => (props.direction == "fa" ? "rtl" : "ltr")};
        font-family: ${props => (props.direction == "fa" ? `"IRANSansWeb", sans-serif` : `"WhyteInktrap", sans-serif`)};
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 40px 0 0;
    }

    .page {
        width: 30px;
        height: 30px;
        color: #fff;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background-color: #ebf2fd;
            color: #5a8dee;
        }
    }

    .active {
        border-color: #0074bd;
        background-color: #0074bd;
        color: #fff;

        &:hover {
            background-color: #0074bd;
            border-color: #000;
            color: #fff;
        }
    }

    .next, .previous {
        background-color: #F6F7FB;
    }

    @media screen and (max-width: 1400px) {
        width: 100%;
    }

    @media screen and (max-width: 850px) {
        padding-top: 7rem;
    }
`;

export const Title = styled.h3`
    width: 100%;
    text-align: ${props => (props.direction == "fa" ? "right" : "left")};
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 3rem;
    transition: all ease .2s;

    @media screen and (max-width: 1400px) {
        width: 90%;
    }

    @media screen and (max-width: 450px) {
        font-size: 28px;
    }
`;

export const ItemContainer = styled.div`
    width: 90%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
    row-gap: 4rem;
    column-gap: 20px;
`;

export const Item = styled.div`
    max-width: 25%;
    flex: 0 0 25%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 2rem;
    transition: all ease .2s;
    cursor: pointer;

    &:hover {
        button {
            color: #C8242F;
            border-color: #C8242F;
        }
    }

    @media screen and (max-width: 1200px) {
        max-width: 45%;
        flex: 0 0 45%;
    }

    @media screen and (max-width: 700px) {
        max-width: 100%;
        flex: 0 0 100%;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px 10px 0 0;
    pointer-events: none;
    transition: all 0.2s ease;

    @media screen and (max-width: 700px) {
        height: 350px;
    }

    @media screen and (max-width: 500px) {
        height: 250px;
    }
`;

export const Date = styled.div`
    width: fit-content;
    height: fit-content;
    display:  flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
    margin-top: 10px;
    padding: 0 20px;
    font-size: 15px;
    pointer-events: none;
    gap: 5px;

    @media screen and (max-width: 400px) {    
        p {
            font-size: 12px;
        }
    }
`;

export const Calendar = styled.img`
    width: 18px;
    height: 18px;
`;

export const ItemTitle = styled.h3`
    width: 100%;
    text-align: right;
    color: #000;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 20px;
    pointer-events: none;
    transition: all ease .2s;

    @media screen and (max-width: 450px) {
        font-size: 15px;
    }
`;

export const ArchiveButton = styled.button`
    border-bottom: 1px solid #000;
    font-size: 14px;
    margin: 0 20px;
    color: #000;
    background: transparent;
    cursor: pointer;
    user-select: none;
    align-self: flex-start;
    transition: all ease .2s;
`;
