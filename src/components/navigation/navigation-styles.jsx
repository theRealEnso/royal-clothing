import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    width: 100%;
    height: 70px;
`

export const CrownLogoContainer = styled.div`
    padding: 25px;
    height: 100%;
    width: 100px;
`

export const NavLinksContainer = styled.div`
    width: 50%; // 50% of parent div
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end; // move elements inside this container to the end of container
`

export const NavLinks = styled(Link)`
    padding: 15px 15px;
    cursor: pointer;
    &:hover {
    color: rgb(35,245,241);
    }
`

// $hoverColor: rgb(35,245,241);

// .navigation-container {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 25px;
//     width: 100%;
//     height: 70px;

//     .crown-logo-container {
//         padding: 25px;
//         height: 100%;
//         width: 100px;
//     };

//     .nav-links-container {
//         width: 50%; // 50% of parent div
//         height: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: flex-end; // move elements inside this container to the end of container

//         .nav-link {
//             padding: 15px 15px;
//             cursor: pointer;
//             &:hover {
//             color: $hoverColor;
//             };
//         };
//     };
// };