import styled from 'styled-components';

// BackgroundImage and TextContainer must be defined first
export const BackgroundImage = styled.div`
    width: 100%; // image covers full width
    height: 100%; // image covers full height
    background-size: cover; // set size of background img--cover = scale size to fit container
    background-position: center; //set initial position
    //since BackgroundImage is a component now, we can pass props to this component. We are destructuring the imageURL prop that this component has, and then using this prop to set the background image in css
    background-image: ${({ imageURL }) => `url(${imageURL})`};
`

export const TextContainer = styled.div`
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column; // stack on top vertically
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    background-color: white;
    opacity: 0.7;
    position: absolute; // position relative to nearest ancestor/parent; otherwise it is positioned relative to the initial containing block-- aka directory-item-container. Removed from normal doc flow

    h2 {
        font-weight: bold;
        margin: 0 6px 0;
        font-size: 22px;
        color: #4a4a4a;
        text-transform: uppercase;
    }

    p {
        font-weight: lighter;
        font-size: 16px;
    }
`

export const DirectoryItemContainer = styled.div`
    display: flex;
    flex: 1 1 auto;
    align-items: center; // centers element in container on Y axis
    justify-content: center; //centers element on X axis
    border: 1px solid black;
    overflow: hidden; // what happens when element content is too big to fit in container
    min-width: 30%;
    height: 300px;
    margin: 0 7.5px 15px; // 3 values means top, left & right, and bottom

    &:first-child {
        margin-right: 7.5px;
    };

    &:last-child {
        margin-left: 7.5px;
    };

    &:hover {
        cursor: pointer;

        &{BackgroundImage} {
            transform: scale(1.1);
            transition: transform 5s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        };

        &{TextContainer} {
            opacity: 0.8;
        };
    }
`

// .directory-item-container {
//     display: flex;
//     flex: 1 1 auto;
//     align-items: center; // centers element in container on Y axis
//     justify-content: center; //centers element on X axis
//     border: 1px solid black;
//     overflow: hidden; // what happens when element content is too big to fit in container
//     min-width: 30%;
//     height: 300px;
//     margin: 0 7.5px 15px; // 3 values means top, left & right, and bottom

//     &:hover {
//         cursor: pointer;

//         & .background-image {
//             transform: scale(1.1);
//             transition: transform 5s cubic-bezier(0.25, 0.45, 0.45, 0.95);
//         };

//         & .text-container {
//             opacity: 0.8;
//         };
//     };

//     .background-image {
//         width: 100%; // image covers full width
//         height: 100%; // image covers full height
//         background-size: cover; // set size of background img--cover = scale size to fit container
//         background-position: center; //set initial position
//     };

//     .text-container {
//         height: 90px;
//         padding: 0 25px;
//         display: flex;
//         flex-direction: column; // stack on top vertically
//         justify-content: center;
//         align-items: center;
//         border: 1px solid black;
//         background-color: white;
//         opacity: 0.7;
//         position: absolute; // position relative to nearest ancestor/parent; otherwise it is positioned relative to the initial containing block-- aka directory-item-container. Removed from normal doc flow

//         h2 {
//             font-weight: bold;
//             margin: 0 6px 0;
//             font-size: 22px;
//             color: #4a4a4a;
//             text-transform: uppercase;
//         };

//         p {
//             font-weight: lighter;
//             font-size: 16px;
//         };
//     };

//     & .large {
//         height: 380px;
//     };

//     &:first-child {
//         margin-right: 7.5px;
//     };

//     &:last-child {
//         margin-left: 7.5px;
//     };
// }