import styled, { createGlobalStyle, keyframes } from "styled-components";
import Link from "next/link";

export const GlobalStyle = createGlobalStyle`
    body {
        .birthDateMenu {
            width: 300px;
            direction: ${props => (props.direction)};
            font-family: ${props => (props.direction == 'rtl') ? `"IRANSansWeb", sans-serif` : `"FontAwesome", sans-serif`};
            transform: translateX(15px);

            .item {
                width: 300px;
            }

            .zm-DaysButton {
                width: 38px;
            }

            @media screen and (max-width: 639px) {
                transform: translateX(0);
            }
        }

        .zm-IconNextButton {
            transform: ${props => (props.direction == 'rtl') ? 'scale(1)' : 'scale(-1)'};
        }

        .zm-IconPrevButton {
            transform: ${props => (props.direction == 'rtl') ? 'scale(1)' : 'scale(-1)'};
        }

        .zm-YearPickerButton {
            width: 88px;
            margin-bottom: 4px;
        }

        .zm-MonthPickerButton {
            width: 88px;
            margin-left: 4px;
        }

        .zm-Header + div {
            gap: 0;
        }

        .zm-Header + div + div {
            right: ${props => (props.direction == 'rtl') ? `4px` : `-6px`};
        }
    }
`;

export const CollaborateContainer = styled.div`
    font-family: "IRANSansWeb", sans-serif;
    scroll-behavior: smooth;

    pre, p, h3, .Toastify__toast-body > div:last-child {
        font-family: ${props => (props.direction == 'rtl') ? `"IRANSansWeb", sans-serif` : `"WhyteInktrap", sans-serif`};
    }

    .Toastify__toast-body > div:last-child {
        direction: ${props => (props.direction)};
    }

    @media screen and (max-width: 480px) {
        .Toastify__toast-container {
            right: 0;
        }
    }
`;

export const Main = styled.div`
    width: 100%;
    min-height: 100vh;
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
    height: fit-content;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 10rem 0 5rem;
    transition: all ease .2s;

    @media screen and (max-width: 1000px) {
        padding: 10rem 0 7rem;
    }
`;

export const Title = styled.h3`
    width: 100%;
    text-align: ${props => (props.adjust) ? "right" : "left"};
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 3rem;
    transition: all ease .2s;
`;

export const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    transition: all ease .2s;
`;

export const FieldTitle = styled.h3`
    width: 100%;
    text-align: ${props => (props.adjust) ? "right" : "left"};
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    transition: all 0.2s ease;
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    justify-content: space-evenly;
    transition: all 2s ease;

    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
`;

export const InputContainer = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: space-between;
    margin: 15px 0;
    transition: all ease .2s;

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(2rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(2rem);
        }
    }

    .menu {
        background-color: #333;
        animation: fadeIn 0.2s ease-in-out;
        border-radius: 10px;
        height: fit-content;
        overflow: hidden;

        #react-select-3-listbox {
            width: 100%;
            height: 100%;
        }
    }

    .menu--close {
        animation: fadeOut 0.2s ease-in-out;
    }

    .birthDate {
        width: 300px;
        height: 50px;
        border: 1px solid #adb1b8;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
        padding: 5px 10px;
        outline: none !important;
        font-family: ${props => (props.adjust) ? `"IRANSansWeb", sans-serif` : `"FontAwesome", sans-serif`};
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }

    .Grade, .EducationalStatus, .Gender, .Marrige, .Military {
        width: 300px;
        height: 50px;
    }

    .FavoriteFieldOfWork {
        width: 600px;
    }

    @media screen and (max-width: 900px) {
        margin: 15px 0;
        width: 100%;

        .Grade, .EducationalStatus, .FavoriteFieldOfWork, .Gender, .Marrige {
            width: 100%;
        }

        .birthDate {
            width: 100%;
        }
    }
`;

export const InputContainerSpecial = styled.div`
    width: fit-content;
    height: fit-content;
    display: ${props => (props.show) ? "flex" : "none"};
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: space-between;
    margin: 15px 0;
    transition: all 0.2s ease;
    
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(2rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(2rem);
        }
    }
    
    animation: fadeIn 0.2s ease-in-out;

    .menu {
        background-color: #333;
        animation: fadeIn 0.2s ease-in-out;
        border-radius: 10px;
        height: fit-content;
        overflow: hidden;

        #react-select-3-listbox {
            width: 100%;
            height: 100%;
        }
    }

    .menu--close {
        animation: fadeOut 0.2s ease-in-out;
    }

    .Military {
        width: 300px;
        height: 50px;
    }

    @media screen and (max-width: 900px) {
        margin: 15px 0;
        width: 100%;

        .Military {
            width: 100%;
        }
    }
`;

export const Input = styled.input`
    width: 300px;
    height: 50px;
    border: 1px solid #adb1b8;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    padding: 5px 10px;
    outline: none !important;
    font-size: 16px;
    font-family: ${props => (props.font) ? `"IRANSansWeb", sans-serif` : `"FontAwesome", sans-serif`};
    color: #fff;
    transition: all .2s ease-in-out;

    &:hover, &:focus {
        border-color: #fff;
    }

    @media screen and (max-width: 900px) {
        width: 100%;
    }
`;

export const Label = styled.label`
    width: fit-content;
    align-self: flex-start;
    text-align: right;
    padding: 0 4px;
    height: 14px;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
    pointer-events: none;
    transition: all .2s ease;

    span {
        background-color: inherit;
        color: #ff577e;
        margin: 0 5px;
        font-size: 14px;
    }
    span:after {
        content: "*";
    }
`;

export const Textarea = styled.textarea.withConfig({
    shouldForwardProp: (prop) => !['show', '$font', 'font'].includes(prop),
})`
    width: 100%;
    height: ${props => (props.show ? "100px" : "0")};
    margin-top: ${props => (props.show ? "10px" : "0")};
    resize: none;
    border: ${props => (props.show ? "1px solid #adb1b8" : "0")};
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    padding: ${props => (props.show ? "5px 10px" : "0")};
    outline: none !important;
    font-size: 16px;
    font-family: ${props => (props.font ? `"IRANSansWeb", sans-serif` : `"FontAwesome", sans-serif`)};
    color: #fff;
    transition: all .2s ease-in-out;

    &:hover, &:focus {
        border-color: #fff;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        box-shadow: none; 
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: #999; 
        border-radius: 10px;
    }

    @media screen and (max-width: 900px) {
        width: 100%;
        height: ${props => (props.show ? "150px" : "0")};
    }
`;

export const Address = styled.input`
    width: 600px;
    height: 50px;
    border: 1px solid #adb1b8;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    padding: 5px 10px;
    outline: none !important;
    font-family: ${props => (props.font) ? `"IRANSansWeb", sans-serif` : `"FontAwesome", sans-serif`};
    font-size: 16px;
    color: #fff;
    transition: all .2s ease-in-out;

    &:hover, &:focus {
        border-color: #fff;
    }

    @media screen and (max-width: 900px) {
        width: 100%;
    }
`;

export const DropZone = styled.div`
    width: fit-content;
    height: fit-content;
    border: 1px solid #adb1b8;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 0.3s ease;

    aside {
        display: none;
    }

    .dropzone {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &:hover, &:focus {
        border-color: #fff;
    }

    @media screen and (max-width: 900px) {
        width: 100%;
    }
`;

export const ProgressBarContainer = styled.div`
    height: 20px;
    width: 430px;
    direction: ltr;
    background-color: whitesmoke;
    border-radius: 40px;
    margin: 15px;
    overflow: hidden;

    @media screen and (max-width: 900px) {
        width: 100%;
    }
`;

export const ProgressBar = styled.div`
    width: ${props => props.width}%;
    height: 100%;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    transition: all 0.3s ease;

    p {
        font-family: ${props => (props.adjust) ? `"IRANSansWeb", sans-serif` : `"FontAwesome", sans-serif`};
    }
`;

export const DeleteFile = styled.div`
    width: fit-content;
    height: 20px;
    cursor: pointer;
    margin: 0 10px;
    color: white;
    pointer-events: ${props => (props.show) ? "unset" : "none"};
    opacity: ${props => (props.show) ? "1" : "0"};
    user-select: none;
    transition: all 0.2s ease;
    transform: scale(1.2);
`;

export const Choose = styled.div`
    cursor: pointer;
    user-select: none;
    padding: 5px 10px;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    margin: 0 10px;
    margin-right: ${props => (props.adjust) ? "0" : "10px"};
    margin-left: ${props => (props.adjust) ? "10px" : "0"};
    transition: all 0.2s ease;
`;

export const DropInput = styled.input`
    width: 300px;
    height: 50px;
    background: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: "FontAwesome", sans-serif;
    padding: ${props => (props.adjust) ? "5px 10px 5px 2px" : "5px 2px 5px 10px"};
    outline: none !important;
    font-size: 16px;
    color: #fff;
    cursor: default;
    transition: all .2s ease-in-out;

    @media screen and (max-width: 900px) {
        width: calc(100% - 137px);
    }
`;

export const SubmitButton = styled.div`
    align-self: flex-start;
    border: 1px solid white;
    border-radius: 10px;
    background: transparent;
    outline: none;
    padding: 10px 20px;
    font-size: 1.1rem;
    font-weight: bold;
    color: white;
    margin: 20px 0;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: white;
        color: #555;
        border-radius: 25px;
        cursor: ${props => (props.isSubmitting) ? "not-allowed" : "pointer"};

        path {
            stroke: black !important;
        }
    }

    .spinner {
        width: 105px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation-name: spin;
        animation-duration: 500ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;

        path {
            stroke: white;
            width: 100%;
            height: 100%;
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
