import styled from 'styled-components';

import DeleteIcon from '@mui/icons-material/Delete';

const removeColor = 'rgb(202,52,52)';
const addColor = 'rgb(86, 246, 86)';

export const RemoveIcon = styled(DeleteIcon)`
    font-size: 40px;
    cursor: pointer;
    width: 5%;
    &:hover {
        color: ${removeColor};
    }
`

export const CheckoutCardContainer = styled.div`
    width: 100%;
    min-height: 100px;
    display: flex;
    border-bottom: 1px solid grey;
    align-items: center;
    font-size: 20px;
    padding: 15px 0;
`

export const CheckoutImageContainer = styled.div`
    width: 16%;
    img {
        width: 100%;
        height:  100%;
    }
`

export const CheckoutItemName = styled.span`
    width: 20%;
    padding-left: 20px;
    font-size: 25px;
`
export const CheckoutItemQuantity = styled.div`
    display: flex;
    flex-direction: row;
    width: 20%;
    margin-left: 15px;
`

export const LeftArrow = styled.div`
    cursor: pointer;
    font-size: 25px;
    &:hover {
        color: ${removeColor};
    }
`

export const RightArrow = styled.div`
    cursor: pointer;
    font-size: 25px;
    &:hover {
        color: ${addColor};
    }
`

export const Value = styled.span`
    margin: 0 20px;
    font-size: 25px;
`

export const Price = styled.span`
    font-size: 25px;
    width: 18%;
    
`
export const ItemTotal = styled.span`
    font-size: 25px;
    width: 20%;

`
// .checkout-card-container {
//     width: 100%;
//     min-height: 100px;
//     display: flex;
//     border-bottom: 1px solid grey;
//     align-items: center;
//     font-size: 20px;
//     padding: 15px 0;

//     .checkout-image-container {
//         width: 16%;

//         img {
//             width: 100%;
//             height:  100%;
//         }
//     }

//     .checkout-item-name {
//         width: 20%;
//         padding-left: 20px;
//         font-size: 25px;
//     }

//     .checkout-item-quantity {
//         display: flex;
//         flex-direction: row;
//         width: 20%;
//         margin-left: 15px;

//         .value {
//             margin: 0 20px;
//             font-size: 25px;
//         }
//     }

//     .arrow {
//         cursor: pointer;
//     }

//     .left {
//         font-size: 25px;
//         &:hover {
//             color: rgb(202, 52, 52);
//         }
//     }

//     .right {
//         font-size: 25px;
//         &:hover {
//             color: rgb(86, 246, 86);
//         }
//     }

//     .price, .item-total {
//         font-size: 25px;
//     }

//     .price {
//         width: 18%;
//     }

//     .item-total {
//         width: 20%;
//     }

//     .deleteIcon{
//         font-size: 40px;
//         cursor: pointer;
//         width: 5%;
//         &:hover{
//             color: rgb(202,52,52);
//         }
//     }

// };