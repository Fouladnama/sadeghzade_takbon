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
export const GalleryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 30px;
    width: 100%;
`;

export const GalleryImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.03);
    }
`;

export const GalleryTitle = styled.h2`
    font-size: 24px;
    color: #333;
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: right;
`;
export const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LightboxContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

export const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  display: block;
  margin: 0 auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 35px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 15px;
  z-index: 1001;

  &:hover {
    color: #ccc;
  }
`;

export const NavigationButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 0 20px;
`;

export const PrevButton = styled.button`
  color: white;
  font-size: 50px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;

  &:hover {
    color: #ccc;
  }
`;

export const NextButton = styled.button`
  color: white;
  font-size: 50px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;

  &:hover {
    color: #ccc;
  }
`;
export const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
`;

export const SlideshowImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SlideshowControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const SlideshowButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#0089DE' : '#ccc'};
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0089DE;
  }
`;