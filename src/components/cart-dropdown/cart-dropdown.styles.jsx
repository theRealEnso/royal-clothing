import styled from 'styled-components';

import { BaseButton, GoogleSignInButton, InvertedButton } from '../button/button-styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 340px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`

export const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`

export const Subtotal = styled.span`
  font-size: 25px;
  text-align: center;
  padding: 15px 0;
`

// .cart-dropdown-container {
//     position: absolute;
//     width: 340px;
//     height: 340px;
//     display: flex;
//     flex-direction: column;
//     padding: 20px;
//     border: 1px solid black;
//     background-color: white;
//     top: 90px;
//     right: 40px;
//     z-index: 5;
  
//     .empty-message {
//       font-size: 18px;
//       margin: 50px auto;
//     }
  
//     .cart-items-container {
//       height: 240px;
//       display: flex;
//       flex-direction: column;
//       overflow: scroll;
//     }

//     .sub-total {
//       font-size: 25px;
//       text-align: center;
//       padding: 15px 0;
//     }
  
//     button {
//       margin-top: auto;
//     }
//   }
  