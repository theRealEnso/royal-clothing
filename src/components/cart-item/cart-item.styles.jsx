import styled from 'styled-components';

import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const hoverColor = 'rgb(35,245,241)';
const removeColor = 'rgb(193, 47, 47)';

export const CheckBoxIcon = styled(IndeterminateCheckBoxIcon)`
  &:hover {
    color: ${hoverColor};
  }
`

export const AddIcon = styled(AddBoxIcon)`
  &:hover {
    color: ${hoverColor};
  }
`

export const DeleteIcon = styled(DeleteForeverIcon)`
  &:hover {
    color: ${removeColor}
  }
`

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
  border-bottom: 1px solid grey;

  img {
    width: 30%;
    margin-bottom: 5px;;
  }
`

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 30px;
`

export const Name = styled.span`
  font-size: 18px;
`

export const QuantityPrice = styled.span`
  padding-left: 10px;
  margin-top: 5px;
`

export const IconContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
  margin-top: 5px;
`

// $hoverColor: rgb(35,245,241);

// $removeColor: rgb(193, 47, 47);

// .cart-item-container {
//     width: 100%;
//     display: flex;
//     height: 80px;
//     margin-bottom: 15px;
//     border-bottom: 1px solid grey;
  
//     img {
//       width: 30%;
//       margin-bottom: 5px;;
//     }
  
//     .item-details {
//       width: 70%;
//       display: flex;
//       flex-direction: column;
//       align-items: flex-start;
//       justify-content: center;
//       padding: 10px 30px;
  
//       .name {
//         font-size: 18px;
//       }

//       .quantityPrice {
//         padding-left: 10px;
//         margin-top: 5px;
//       }

//       .icon-container {
//         width: 100%;
//         display: flex;
//         flex-direction: row;
//         flex-wrap: wrap;
//         cursor: pointer;
//         margin-top: 5px;

//         .minusIcon, .addIcon {
//           &:hover {
//             color: $hoverColor
//           }
//         }

//         .trashIcon {
//           &:hover {
//             color: $removeColor
//           }
//         }
//       }
//     }
//   }