import {createSelector} from 'reselect';
import { RootState } from '../store';
import { CartState } from './cart-reducer';

const extractCartReducer = (state: RootState): CartState => state.cart; //cartReducer

export const selectCartItems = createSelector([extractCartReducer], (cartSlice) => cartSlice.cartItems); // state.cart.cartItems i.e. result of selectCartItems is cartItems pulled from the cart reducer in redux store

export const selectIsCartOpen = createSelector([extractCartReducer], (cartSlice) => cartSlice.isCartOpen); // state.cart.isCartOpen i.e. result of selectIsCartOpen is isCartOpen pulled from the cart reducer in redux store

export const selectCartCount = createSelector([selectCartItems], (cartItems) => cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0));

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0));

