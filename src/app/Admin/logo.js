import styled from 'styled-components'; // اضافه کردن import
import Link from 'next/link';

export const Logo = styled(Link)`
    width: 120px;
    height: 120px;
    background-image: url(${props => props.hover ? props.hover.src : 'default-image-url'});
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
