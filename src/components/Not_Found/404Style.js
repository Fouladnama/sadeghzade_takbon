import styled from "styled-components";

export const NotFoundContainer = styled.div`
    font-family: ${props => (props.language == "fa") ? `"IRANSansWeb", sans-serif` : `"WhyteInktrap", sans-serif`};

    pre, p, h3 {
        font-family: ${props => (props.language == "fa") ? `"IRANSansWeb", sans-serif` : `"WhyteInktrap", sans-serif`};
    }

    .flex-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: white;
        animation: colorSlide 15s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;

        .text-center {
            text-align: center;
            
            h1,h3 {
                margin: 10px;
                cursor: default;
                .fade-in {
                    animation: fadeIn 2s ease infinite;
                }
            }

            h1 {
                font-size: 8em;
                transition: font-size 200ms ease-in-out;
                border-bottom: 1px dashed white;

                span#digit1 { animation-delay: 200ms; }
                span#digit2 { animation-delay: 300ms; }
                span#digit3 { animation-delay: 400ms; }
            }

            button {
                border: 1px solid white;
                border-radius: 10px;
                background: transparent;
                outline: none;
                padding: 10px 20px;
                font-size: 1.1rem;
                font-weight: bold;
                color: white;
                text-transform: uppercase;
                transition: all 200ms ease-in;
                margin: 20px 0;
                
                &:hover {
                    background-color: white;
                    color: #555;
                    border-radius: 25px;
                    cursor: pointer;
                }
            }
        }
    }

    @keyframes colorSlide {
        0% { background-color: #152a68; }
        25% { background-color: royalblue; }
        50% { background-color: seagreen; }
        75% { background-color: tomato; }
        100% { background-color: #152a68; }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

export const Header = styled.div`
    width: 100%;
    height: 30px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-family: "IRANSansWeb", sans-serif;
    position: absolute;
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

    & > div {
        color: #fff;
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